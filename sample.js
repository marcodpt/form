import {form} from './index.js'
import complete from './samples/complete.js'
import confirm from './samples/confirm.js'
import plain from './samples/plain.js'
import watch from './samples/watch.js'
import upload from './samples/upload.js'

export default {
  title: 'Form component',
  gh: 'https://github.com/marcodpt/form',
  samples: {
    complete,
    confirm,
    plain,
    watch,
    upload
  },
  comp: form,
  updates: {
    Brazil: {
      country: "br",
      city: 4,
      salary: 1000,
      name: "Dorival"
    },
    John: {
      role: "sysadmin",
      name: "John",
      country: "us"
    }
  }
}
