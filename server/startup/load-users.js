Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    var users = [
      {
        'email': 'pedro@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Pedro',
          estimateBornDate: new Date(2016, 02, 20),
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
          estimateBornDate: new Date(2016, 02, 20),
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
          estimateBornDate: new Date(2016, 02, 20),
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
          estimateBornDate: new Date(2016, 02, 20),
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