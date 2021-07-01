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
  comp: form
}
