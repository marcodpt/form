import {
  form,
  form_pt
} from 'https://cdn.jsdelivr.net/gh/marcodpt/views/index.js'
import {
  validate,
  validate_pt
} from 'https://cdn.jsdelivr.net/gh/marcodpt/validator/index.js'
import {app} from 'https://unpkg.com/hyperapp'
import axios from
  'https://cdn.jsdelivr.net/npm/redaxios@0.4.1/dist/redaxios.module.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'
import {
  createNanoEvents
} from 'https://cdn.jsdelivr.net/npm/nanoevents@6.0.0/index.js'

const render = (template, data) =>
  mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  var val = validate
  var view = form
  if (language == 'pt') {
    val = validate_pt
    view = form_pt
  }

  return (e, params) => {
    const resolved = {}
    const init = {}
    const afterGet = params.afterGet || X => X

    const resolver = state => {
      const D = []
      state.Fields.forEach((F, index) => {
        if (F.href) {
          const url = render(F.href, state.model)
          if (resolved[F.name] !== url) {
            if (resolved[F.name] != null) {
              state.model[F.name] = null
            }
            resolved[F.name] = url
            F.options = null
            D.push([
              dispatch => {
                axios.get(url).then(res => {
                  dispatch(state => {
                    if (resolved[F.name] === url) {
                      state.Fields[index].options = afterGet(res.data)
                    }
                    return {...state}
                  })
                })
              }
            ])
          }
        }
      })
      return [{...state}].concat(D)
    }

    const submiter = (schema, submit) => submit == null ? null : state => {
      const D = []
      const P = schema.properties
      state.Fields.forEach(F => {
        F.error = ""
      })
      const M = val({
        ...schema,
        properties: Object.keys(P).map(key => {
          return resolved[key] == null ? P[key] : {
            ...P[key],
            enum: state.Fields
              .filter(F => F.name === key)
              .reduce((E, F) => E.concat((F.options || []).map(
                O => typeof O == 'object' ? O.value : O)
              ), [])
          }
        })
      }, state.model, (key, message) => {
        state.Fields
          .filter(F => F.name === key && F.error === "")
          .forEach(F => {
            F.error = message
          })
      })

      if (M == null) {
        state.blur = state => ({
          ...state,
          blur: null
        })
      } else {
        state.pending = true
        D.push([
          dispatch => {
            Promise.resolve().then(() => {
              return submit(M)
            }).then(init => {
              dispatch(state => setInit(init))
            })
          }
        ])
      }

      return [{...state}].concat(D)
    }

    const getInit = ({
      schema,
      alert,
      back,
      submit,
      submitOnChange
    }) => {
      const S = schema || {}
      const P = S.properties || {}

      return resolver({
        title: S.title,
        description: !S.description || alert ? null : S.description,
        Data: !S.description || !alert ? null : {
          type: alert,
          data: S.description
        },
        back: back,
        model: Object.keys(P).reduce((M, key) => {
          if (S.default[key] != null) {
            M[key] = S.default[key]
          } else if (P[key].default != null) {
            M[key] = P[key].default
          } else {
            M[key] = null
          }
          return M
        }, {}),
        Fields: Object.keys(P).map(name => ({
          name: name,
          title: P[name].title,
          disabled: P[name].readOnly,
          options: P[name].href ? null : P[name].enum,
          href: P[name].href,
          type: P[name].format || P[name].type,
          min: P[name].minimum,
          max: P[name].maximum,
          step: P[name].multipleOf,
          change: (state, ev) => {
            state.model[name] = ev.target.value
            return submitOnChange ?
              submiter(S, submit)(state) :
              resolver(state)
          }
        })),
        Actions: (S.links || []).map(link => ({
          href: link.href,
          icon: link.icon,
          type: link.type || 'light',
          title: link.title
        })),
        submit: submitOnChange ? true : submiter(S, submit)
      })
    }

    const emitter = createNanoEvents()

    app({
      init: getInit(params),
      view: view,
      node: e,
      subscriptions: () => [[
        dispatch => {
          const unbind = emitter.on('update', model => {
            requestAnimationFrame(() => dispatch(state => ({
              ...state,
              model: model
            })))
          })
          return () => unbind()
        }
      ]]
    })

    return model => {
      emitter.emit('update', model)
    }
  }
}

const f = comp()
const f_pt = comp('pt')

export {
  f as form,
  f_pt as form_pt
}
