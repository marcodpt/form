import {h, text, app} from 'https://unpkg.com/hyperapp'
import {form} from './index.js'
import complete from './samples/complete.js'
import confirm from './samples/confirm.js'
import plain from './samples/plain.js'
import watch from './samples/watch.js'
import upload from './samples/upload.js'

const X = {
  complete,
  confirm,
  plain,
  watch,
  upload
}

window.setView = select => {
  const v = select.value
  const app = document.getElementById('app')
  const e = app.cloneNode(false)
  app.replaceWith(e)
  if (X[v]) {
    const update = form(e, X[v])
  }
}

window.addEventListener('load', () => {
  const s = document.body.querySelector('select')
  const o = s.querySelector('option')
  Object.keys(X).forEach(key => {
    const p = o.cloneNode(false)
    p.setAttribute('value', key)
    p.setAttribute('label', key)
    s.appendChild(p)
  })
})
