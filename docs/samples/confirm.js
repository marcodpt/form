export default {
  schema: {
    title: "Confirm",
    description: "Do you confirm that this is a test form?",
    alert: "info"
  },
  submit: data => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        schema: {
          title: "Confirm again!",
          description: "Are you really sure!?",
          alert: "warning"
        },
        submit: data => new Promise(resolve => {
          setTimeout(() => {
            resolve({
              schema: {
                title: "Done!",
                description: "You confirmed!",
                alert: "success"
              }
            })
          }, 1000)
        })
      })
    }, 1000)
  })
}
