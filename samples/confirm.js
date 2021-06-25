const Forms = [
  {
    schema: {
      title: "Error!",
      description: "You already was in the begining"
    },
    alert: "danger",
    back: 1
  }, {
    schema: {
      title: "Confirm",
      description: "Do you confirm that this is a test form?"
    },
    alert: "info",
    back: 0,
    submit: 2
  }, {
    schema: {
      title: "Confirm again!",
      description: "Are you really sure!?",
    },
    alert: "warning",
    back: 1,
    submit: 3
  }, {
    schema: {
      title: "Done!",
      description: "You confirmed!"
    },
    alert: "success",
    back: 2
  }
]

const genForm = (index, wait) => {
  if (wait) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(genForm(index))
      }, wait)
    })
  } else {
    const F = Forms[index]
    const R = {
      ...F,
      back: F.back == null ? null : () => genForm(F.back),
      submit: F.submit == null ? null : () => genForm(F.submit, 1000)
    }
    return R
  }
}

export default genForm(1)
