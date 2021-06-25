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
      bio: {}
    },
    default: {
      id: 138,
      name: 'John',
      age: 35,
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
