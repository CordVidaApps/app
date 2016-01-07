Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var users = [
      {
        'email': 'pedro@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Pedro',
          maternityLocation: {
            latitude: 45,
            longitude: -73
          },
        },
      },
      {
        'email': 'pk@teste.com',
        'password': 'teste',
        'profile': {
          name: 'PK',
          maternityLocation: {
            latitude: 45,
            longitude: -73
          },
        },
      },
      {
        'email': 'max@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Max',
          maternityLocation: {
            latitude: 45,
            longitude: -73
          },
        },
      },
      {
        'email': 'bel@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Bel',
          maternityLocation: {
            latitude: 45,
            longitude: -73
          },
        },
      },
      
    ];

    for (var i = 0; i < users.length; i++) {
      Accounts.createUser(users[i]);
    }
  }
});