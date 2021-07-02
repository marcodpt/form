import resolver from './resolver.js'

const submit = schema => M => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      schema: {
        title: 'You submit me!',
        description: JSON.stringify(M, undefined, 2)
      },
      alert: 'info',
      back: () => ({
        schema: schema,
        submit: submit,
        resolver: resolver
      })
    })
  }, 1000)
}) 

export default submit
