import submit from './submit.js'
import resolver from './resolver.js'

const schema = {
  type: 'object',
  title: 'Watch form',
  properties: {
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
    }
  },
  required: [
    'country',
    'city',
    'role'
  ]
}

export default {
  schema: schema,
  watch: (model) => {
    alert(JSON.stringify(model, undefined, 2))
  },
  resolver: resolver
}
