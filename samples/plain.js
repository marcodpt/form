export default {
  schema: {
    type: "object",
    title: 'User Profile',
    properties: {
      name: {
        title: "Name",
        href: "#/profile/{id}"
      },
      age: {
        title: "Age"
      },
      registered: {
        type: "integer",
        format: "date",
        title: "Registered"
      },
      change: {
        type: "integer",
        format: "date",
        title: "Password Change"
      },
      auth: {
        type: "string",
        format: "date",
        title: "Auth"
      },
      bio: {}
    },
    default: {
      id: 138,
      name: 'John',
      age: 35,
      registered: 0,
      change: 1622505600,
      auth: '2021-06-13',
      bio: [
        'Hi! My name is John!',
        'I have an amazing twitter profile!',
        'Please feel free to make contact!!!'
      ].join('\n')
    },
    links: [
      {
        title: 'Delete',
        href: '#/delete/{id}',
        icon: 'trash',
        type: 'danger'
      }, {
        title: 'Edit',
        href: '#/put/{id}',
        icon: 'edit',
        type: 'warning'
      }
    ]
  }
}
