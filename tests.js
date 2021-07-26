import {view, view_pt} from './views/bootstrap5.js'

const back = state => {
  return [state, [() => alert("back")]]
}

const submit = state => {
  return [state, [() => alert("submit")]]
}

const blur = state => {
  return [state, [() => alert("blur")]]
}

export default [
  [
    "form",
    view,
    [
      [
        {},
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-center">
                  <i class="fas fa-spinner fa-spin fa-5x"></i>
                </div>
              </div>
            </div>
          </div>
        `,
        "no params"
      ], [
        {
          title: "test form"
        },
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">test form</h5>
              </div>
              <div class="modal-body">
                <div class="text-center">
                  <i class="fas fa-spinner fa-spin fa-5x"></i>
                </div>
              </div>
            </div>
          </div>
        `,
        "simple title"
      ], [
        {
          back: back
        },
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-body">
                <div class="text-center">
                  <i class="fas fa-spinner fa-spin fa-5x"></i>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "back"
      ], [
        {
          title: "test form",
          back: back
        },
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">test form</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <div class="text-center">
                  <i class="fas fa-spinner fa-spin fa-5x"></i>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "back with title"
      ], [
        {
          title: "alert",
          back: back,
          Data: {
            type: 'danger',
            data: [
              'This is a very long message to test the size of the modal.',
              'Also I want to test the line break'
            ].join('\n')
          }
        },
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">alert</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <div class="alert alert-danger" role="alert">
                  <span
                    style="white-space:pre-wrap"
                  >This is a very long message to test the size of the modal.\nAlso I want to test the line break</span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "alert"
      ], [
        {
          title: "confirm",
          back: back,
          submit: submit,
          Data: {
            type: 'info',
            data: [
              'This is a very long message to test the size of the modal.',
              'Also I want to test the line break'
            ].join('\n')
          }
        },
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">confirm</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <div class="alert alert-info" role="alert">
                  <span
                    style="white-space:pre-wrap"
                  >This is a very long message to test the size of the modal.\nAlso I want to test the line break</span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
                <button
                  class="btn btn-primary"
                ><i class="fas fa-check"></i> Submit</button>
              </div>
            </div>
          </div>
        `,
        "confirm"
      ], [
        {
          title: "fields",
          back: back,
          submit: submit,
          model: {
            name: 'John',
            age: 3,
            country: 3,
            bio: ''
          },
          Fields: [
            {
              name: 'name',
              type: 'text',
              title: 'Your name: ',
              error: ''
            }, {
              name: 'age',
              type: 'number',
              step: 1,
              title: 'Your age: ',
              error: 'You must be at least 18'
            }, {
              title: 'Your country: ',
              name: 'country',
              options: [
                {value: 1, label: 'USA'},
                {value: 2, label: 'Mexico'},
                {value: 3, label: 'Canada'}
              ],
              href: '#countries'
            }, {
              name: 'bio',
              placeholder: 'Type something about yourself...',
              type: 'textarea',
              error: 'Is required!'
            }
          ]
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">fields</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <form>
                  <div class="row my-3">
                    <div class="col-md-3">
                      <label class="form-label">Your name: </label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="form-control is-valid"
                        type="text"
                        value="John"
                        name="name"
                      />
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-md-3">
                      <label class="form-label">Your age: </label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="form-control is-invalid"
                        type="number"
                        value="3"
                        name="age"
                        step="1"
                      />
                      <div
                        class="invalid-feedback"
                      >You must be at least 18</div>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-md-3">
                      <label class="form-label">Your country: </label>
                    </div>
                    <div class="col-md-9">
                      <select
                        class="form-control"
                        name="country"
                      >
                        <option
                          value="1"
                          label="USA"
                        ></option>
                        <option
                          value="2"
                          label="Mexico"
                        ></option>
                        <option
                          value="3"
                          label="Canada"
                          selected></option>
                      </select>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-md-12">
                      <textarea
                        class="form-control is-invalid"
                        name="bio"
                        placeholder="Type something about yourself..."
                        rows="6"
                        value=""
                      ></textarea>
                      <div
                        class="invalid-feedback"
                      >Is required!</div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
                <button
                  class="btn btn-primary"
                ><i class="fas fa-check"></i> Submit</button>
              </div>
            </div>
          </div>
        `,
        "fields"
      ], [
        {
          title: "watch",
          back: back,
          submit: true,
          model: {
            country: 3
          },
          Fields: [
            {
              title: 'Your country: ',
              name: 'country',
              options: [
                {value: 1, label: 'USA'},
                {value: 2, label: 'Mexico'},
                {value: 3, label: 'Canada'}
              ],
              href: '#countries'
            }
          ]
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">watch</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <form>
                  <div class="row my-3">
                    <div class="col-md-3">
                      <label class="form-label">Your country: </label>
                    </div>
                    <div class="col-md-9">
                      <select
                        class="form-control"
                        name="country"
                      >
                        <option
                          value="1"
                          label="USA"
                        ></option>
                        <option
                          value="2"
                          label="Mexico"
                        ></option>
                        <option
                          value="3"
                          label="Canada"
                          selected></option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "watch"
      ], [
        {
          title: "static",
          back: back,
          model: {
            name: 'John',
            age: 35,
            country: 'Canada',
            bio: 'Hello!\nMy name is John!\nI don\'t know what to say...'
          },
          Fields: [
            {
              name: 'name',
              type: 'text',
              title: 'Your name: ',
              error: ''
            }, {
              name: 'age',
              type: 'number',
              step: 1,
              title: 'Your age: ',
              error: 'You must be at least 18'
            }, {
              title: 'Your country: ',
              name: 'country',
              options: [
                {value: 1, label: 'USA'},
                {value: 2, label: 'Mexico'},
                {value: 3, label: 'Canada'}
              ],
              href: '#countries'
            }, {
              name: 'bio',
              placeholder: 'Type something about yourself...',
              type: 'textarea',
              error: 'Is required!'
            }
          ]
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">static</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <form>
                  <div class="row my-3">
                    <div class="col-3">
                      <label class="form-label">Your name: </label>
                    </div>
                    <div class="col-9">
                      <span
                        style="white-space:pre-wrap"
                      >John</span>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-3">
                      <label class="form-label">Your age: </label>
                    </div>
                    <div class="col-9">
                      <span
                        style="white-space:pre-wrap"
                      >35</span>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-3">
                      <label class="form-label">Your country: </label>
                    </div>
                    <div class="col-9">
                      <a
                        href="#countries"
                        style="white-space:pre-wrap"
                      >Canada</a>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-12">
                      <span
                        style="white-space:pre-wrap"
                      >Hello!\nMy name is John!\nI don&#39;t know what to say...</span>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "static"
      ], [
        {
          title: "static",
          back: back,
          model: null,
          Fields: [
            {
              name: 'name',
              type: 'text',
              title: 'Your name: ',
              error: ''
            }, {
              name: 'age',
              type: 'number',
              step: 1,
              title: 'Your age: ',
              error: 'You must be at least 18'
            }, {
              title: 'Your country: ',
              name: 'country',
              options: [
                {value: 1, label: 'USA'},
                {value: 2, label: 'Mexico'},
                {value: 3, label: 'Canada'}
              ],
              href: '#countries'
            }, {
              name: 'bio',
              placeholder: 'Type something about yourself...',
              type: 'textarea',
              error: 'Is required!'
            }
          ]
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">static</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <div class="text-center">
                  <i class="fas fa-spinner fa-spin fa-5x"></i>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "static pending"
      ], [
        {
          title: "File upload",
          description: "Quick file upload interface!",
          submit: true,
          back: state => {
            alert('back')
            return state
          },
          model: {},
          Fields: [
            {
              type: 'files',
              change: state => {
                alert('change')
                return state
              }
            }
          ],
          Data: [
            {
              type: 'success',
              data: 'sample.txt: SUCCESS!',
              close: state => {
                alert('success')
                return state
              }
            }, {
              type: 'warning',
              data: 'data.txt: UPDATED!',
              close: state => {
                alert('warning')
                return state
              }
            }, {
              type: 'danger',
              data: 'bills.txt: ERROR!',
              close: state => {
                alert('danger')
                return state
              }
            }
          ]
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">File upload</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <span
                  style="white-space:pre-wrap"
                >Quick file upload interface!</span>
                <form>
                  <div class="row my-3">
                    <div class="col-md-12">
                      <input
                        class="form-control"
                        type="file"
                        multiple/>
                    </div>
                  </div>
                </form>
                <div
                  class="alert alert-success alert-dismissible"
                  role="alert"
                >
                  <span
                    style="white-space:pre-wrap"
                  >sample.txt: SUCCESS!</span>
                  <button
                    class="btn-close"
                  ></button>
                </div>
                <div
                  class="alert alert-warning alert-dismissible"
                  role="alert"
                >
                  <span
                    style="white-space:pre-wrap"
                  >data.txt: UPDATED!</span>
                  <button
                    class="btn-close"
                  ></button>
                </div>
                <div
                  class="alert alert-danger alert-dismissible"
                  role="alert"
                >
                  <span
                    style="white-space:pre-wrap"
                  >bills.txt: ERROR!</span>
                  <button
                    class="btn-close"
                  ></button>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "File upload"
      ], [
        {
          back: back,
          Data: {
            title: 'sample.txt',
            mime: 'text/plain',
            data: [
              'This is a very long message to test the size of the modal.',
              'Also I want to test the line break'
            ].join('\n')
          }
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">sample.txt</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <span
                  title="sample.txt"
                  style="white-space:pre-wrap;word-break:break-all"
                >This is a very long message to test the size of the modal.\nAlso I want to test the line break</span>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "file"
      ], [
        {
          back: back,
          Data: {
            title: "Girl in a jacket",
            mime: 'image/jpeg',
            src: "https://www.w3schools.com/tags/img_girl.jpg"
          }
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Girl in a jacket</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <img
                  class="w-100"
                  src="https://www.w3schools.com/tags/img_girl.jpg"
                  alt="Girl in a jacket"
                  title="Girl in a jacket"
                />
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "image"
      ], [
        {
          back: back,
          Data: {
            src: "https://www.w3schools.com/tags/horse.ogg",
            mime: "audio/ogg",
            title: "audio sample"
          }
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">audio sample</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <audio
                  class="w-100"
                  controls
                  title="audio sample"
                ><source
                  src="https://www.w3schools.com/tags/horse.ogg"
                  type="audio/ogg"
                /></audio>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "audio"
      ], [
        {
          back: back,
          Data: {
            src: "https://www.w3schools.com/tags/movie.mp4",
            mime: "video/mp4",
            title: "video sample"
          }
        },
        `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">video sample</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <video
                  class="w-100"
                  controls
                  title="video sample"
                ><source
                  src="https://www.w3schools.com/tags/movie.mp4"
                  type="video/mp4"
                /></video>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        `,
        "video"
      ]
    ]
  ], [
    "form pt",
    view_pt,
    [
      [
        {
          title: "confirm",
          back: back,
          submit: submit,
          Data: {
            type: 'info',
            data: [
              'This is a very long message to test the size of the modal.',
              'Also I want to test the line break'
            ].join('\n')
          }
        },
        `
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">confirm</h5>
                <span
                  style="cursor:pointer"
                ><i class="fas fa-times"></i></span>
              </div>
              <div class="modal-body">
                <div class="alert alert-info" role="alert">
                  <span
                    style="white-space:pre-wrap"
                  >This is a very long message to test the size of the modal.\nAlso I want to test the line break</span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                ><i class="fas fa-times"></i> Fechar</button>
                <button
                  class="btn btn-primary"
                ><i class="fas fa-check"></i> Confirmar</button>
              </div>
            </div>
          </div>
        `,
        "confirm"
      ]
    ]
  ]
]
