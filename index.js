import {
  view,
  view_pt
} from './views/bootstrap5.js'
import {
  validate,
  validate_pt
} from 'https://cdn.jsdelivr.net/gh/marcodpt/validator/index.js'
import {
  component
} from 'https://cdn.jsdelivr.net/gh/marcodpt/component/index.js'
import axios from
  'https://cdn.jsdelivr.net/npm/redaxios@0.4.1/dist/redaxios.module.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'

const render = (template, data) =>
  mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  var val = validate
  var vw = view
  if (language == 'pt') {
    val = validate_pt
    vw = view_pt
  }

  return (e, params) => {
    const resolved = {}
    const init = {}
    const afterGet = params.afterGet || (X => X)

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

    const onAction = (init, state) => {
      if (init instanceof Array) {
        return ({
          ...state,
          pending: false,
          Data: init
        })
      } else {
        return setInit(init)
      }
    }

    const submiter = (schema, submit) => submit == null ? null : state => {
      if (state.pending) {
        return state
      }
      const D = []
      const P = schema.properties || {}
      state.Fields.forEach(F => {
        F.error = ""
      })
      const M = val({
        ...schema,
        properties: Object.keys(P).reduce((R, key) => {
          R[key] = resolved[key] == null ? P[key] : {
            ...P[key],
            enum: state.Fields
              .filter(F => F.name === key)
              .reduce((E, F) => E.concat((F.options || []).map(
                O => typeof O == 'object' ? O.value : O)
              ), [])
          }
          return R
        }, {})
      }, state.model, (key, message) => {
        console.log(`${key} ${message}`)
        state.Fields
          .filter(F => F.name === key && F.error === "")
          .forEach(F => {
            console.log(F)
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
              return submit(M, state.Data)
            }).then(init => {
              dispatch(state => onAction(init, state))
            })
          }
        ])
      }

      return [{...state}].concat(D)
    }

    const setInit = ({
      schema,
      alert,
      back,
      submit,
      watch,
      messages
    }) => {
      const S = schema || {}
      const P = S.properties || {}
      const B = S.default || {}

      return resolver({
        title: S.title,
        description: !S.description || alert ? null : S.description,
        Data: (!S.description || !alert ? [] : [{
          type: alert,
          data: S.description
        }]).concat(messages == null ? [] : messages.map(M => {
          if (M.close === true) {
            const X = {
              type: M.type || 'info',
              data: M.data
            }
            X.close = (state) => ({
              ...state,
              Data: Data.filter(d => d !== X)
            })
          } else {
            return M
          }
        })),
        back: back == null ? null : (state) =>
          onAction(back(state.Data), state),
        model: Object.keys(P).reduce((M, key) => {
          if (B[key] != null) {
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
            if (watch) {
              state = {
                ...state,
                Data: watch(state.model, state.Data)
              }
            }
            return resolver(state)
          }
        })),
        Actions: (S.links || []).map(link => ({
          href: link.href,
          icon: link.icon,
          type: link.type || 'light',
          title: link.title
        })),
        submit: submit ? submiter(S, submit) : watch ? true : null
      })
    }

    return component(e, vw, setInit(params), (state, model) => ({
      ...state,
      model: {
        ...state.model,
        ...model
      }
    }))
  }
}

const form = comp()
const form_pt = comp('pt')

export {form, form_pt}
