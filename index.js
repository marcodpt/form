import {
  view,
  view_pt
} from './views/bootstrap5.js'
import {
  loader,
  validate,
  validate_pt
} from 'https://cdn.jsdelivr.net/gh/marcodpt/validator@0.0.1/index.js'
import component from 
  'https://cdn.jsdelivr.net/gh/marcodpt/component@0.0.1/index.js'
import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'

const render = (template, data) =>
  template == null ? null : mustache.render('{{={ }=}}\n'+template, data)

const comp = language => {
  var val = validate
  var vw = view
  if (language == 'pt') {
    val = validate_pt
    vw = view_pt
  }

  return (e, params) => {
    const resolved = {}

    const resolver = state => {
      const D = []
      state.Fields.forEach((F, index) => {
        if (F.href && params.resolver) {
          const url = render(F.href, state.model)
          if (resolved[F.name] !== url) {
            if (resolved[F.name] != null) {
              state.model[F.name] = null
            }
            resolved[F.name] = url
            F.options = null
            D.push([
              dispatch => {
                Promise.resolve().then(() => {
                  return params.resolver(url)
                }).then(options => {
                  dispatch(state => {
                    if (resolved[F.name] === url) {
                      state.Fields[index].options = options
                    }
                    return {...state}
                  })
                })
              }
            ])
          }
        }
      })

      if (params.watch) {
        const M = validator(params.schema, state, true)
        if (M) {
          D.push([dispatch => {
            Promise.resolve().then(() => {
              return params.watch(M, state.Data)
            }).then(res => {
              dispatch(state => ({
                ...state,
                Data: res instanceof Array ?
                  onAction(res).Data : state.Data
              }))
            })
          }])
        }
      }
      return [{...state}].concat(D)
    }

    const onAction = (init, state) => {
      Object.keys(resolved).forEach(key => {
        delete resolved[key]
      })
      if (init instanceof Array) {
        return ({
          ...state,
          pending: false,
          Data: setData(init)
        })
      } else {
        return init != null && typeof init == 'object' ? setInit(init) : state
      }
    }

    const validator = (schema, state, ignore) => {
      const P = schema.properties || {}
      state.Fields.forEach(F => {
        F.error = ignore ? null : ""
      })
      return val({
        ...schema,
        properties: Object.keys(P).reduce((R, key) => {
          R[key] = resolved[key] == null ? P[key] : {
            ...P[key],
            enum: state.Fields
              .filter(F => F.name === key)
              .reduce((E, F) => E.concat((F.options || [])
                .map(O => typeof O == 'object' ? O.value : O)
              ), [])
          }
          return R
        }, {})
      }, state.model, (key, message) => {
        state.Fields
          .filter(F => F.name === key && !F.error)
          .forEach(F => {
            F.error = message
          })
      })
    }

    const submitter = (schema, submit) => submit == null ? null : state => {
      if (state.pending) {
        return state
      }
      const D = []
      const M = validator(schema, state)

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

    const setData = messages => messages == null ? [] : messages.map(M => {
      if (M.close === true) {
        const X = {
          type: M.alert || 'info',
          data: M.data
        }
        X.close = (state) => ({
          ...state,
          Data: state.Data.filter(d => d !== X)
        })
        return X
      } else {
        return M
      }
    })

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
      const getType = type => {
        if (type == 'text') {
          return 'textarea'
        } else if (type == 'integer') {
          return 'number'
        } else if (type == 'string') {
          return 'text'
        } else {
          return type
        }
      } 

      return resolver({
        title: S.title,
        description: !S.description || alert ? null : S.description,
        Data: (!S.description || !alert ? [] : [{
          type: alert,
          data: S.description
        }]).concat(setData(messages)),
        back: back == null ? null : (state) =>
          onAction(back(state.Data), state),
        model: loader(params.schema, S.default),
        Fields: Object.keys(P).map(name => ({
          name: name,
          title: P[name].title,
          disabled: P[name].readOnly,
          options: P[name].href ? null : P[name].enum,
          href: watch || submit ? P[name].href :
            render(P[name].href, S.default || {}),
          type: getType(P[name].format || P[name].type),
          min: P[name].minimum,
          max: P[name].maximum,
          step: P[name].multipleOf,
          change: (state, ev) => {
            const el = ev.target
            if (el.tagName == 'INPUT' && el.type == 'file') {
              state.model[name] = []
              for (var i = 0; i < el.files.length; i++) {
                state.model[name].push(el.files[i])
              }
              if (!state.model[name].length) {
                state.model[name] = null
              }
            } else {
              state.model[name] = el.value
            }
            const R = resolver(state)
            return R
          }
        })),
        Actions: (S.links || []).map(link => ({
          href: render(link.href, S.default || {}),
          icon: link.icon,
          type: link.type || 'light',
          title: link.title
        })),
        submit: submit ? submitter(S, submit) : watch ? true : null
      })
    }

    return component(e, vw, onAction(params), (state, model) => resolver({
      ...state,
      model: loader(params.schema, {...model})
    }))
  }
}

const form = comp()
const form_pt = comp('pt')

export {form, form_pt}
