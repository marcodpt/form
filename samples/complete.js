import resolver from './resolver.js'

const schema = {
  type: "object",
  title: "Personal Info",
  properties: {
    name: {
      title: 'Name',
      type: 'string',
      minLength: 3,
      maxLength: 10
    },
    age: {
      title: 'Age',
      type: 'integer',
      minimum: 18,
      maximum: 99,
      format: 'number'
    },
    country: {
      type: 'string',
      title: 'Country',
      default: 'cn',
      href: 'countries'
    },
    city: {
      type: 'integer',
      title: 'City',
      href: 'cities_{country}',
      default: 8
    },
    role: {
      type: 'string',
      title: 'Role',
      href: 'roles'
    },
    salary: {
      type: 'number',
      title: 'Salary ($)',
      minimum: 0,
      maximum: 1000000,
      multipleOf: 0.01
    },
    bio: {
      type: 'string',
      format: 'textarea',
      minLength: 1,
      description: 'Talk a little about yourself...'
    }
  },
  required: [
    'name',
    'age',
    'country',
    'city',
    'role',
    'salary',
    'bio'
  ]
}

const submit = M => new Promise(resolve => {
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

export default {
  schema: schema,
  submit: submit,
  resolver: resolver
}
