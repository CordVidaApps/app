Meteor.methods({
  clearData: function () {
    Meteor.users.remove({});
    Locations.remove({});
    Scores.remove({});
  },
  loadUsers: function(){
    var users = [
      {
        'email': 'pedro@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Pedro',
          estimateBornDate: new Date(2016, 02, 20),
          maternityLocation: {
            latitude: -25.4597917,
            longitude: -49.2895203
          },
          status: 'normal',
        },
      },
      {
        'email': 'pk@teste.com',
        'password': 'teste',
        'profile': {
          name: 'PK',
          estimateBornDate: new Date(2016, 02, 20),
          maternityLocation: {
            latitude: -23.5927582,
            longitude: -46.6822805,
          },
          status: 'normal',
        },
      },
      {
        'email': 'max@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Max',
          estimateBornDate: new Date(2016, 02, 20),
          maternityLocation: {
            latitude: -23.5621793,
            longitude: -46.7140245,
          },
          status: 'normal',
        },
      },
      {
        'email': 'bel@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Bel',
          estimateBornDate: new Date(2016, 02, 20),
          maternityLocation: {
            latitude: -22.9623821,
            longitude: -43.2204205
          },
          status: 'normal',
        },
      },
      {
        'email': 'gabriel@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Gabriel',
          estimateBornDate: new Date(2016, 02, 20),
          maternityLocation: {
            latitude: -23.5180136,
            longitude: -46.6146033
          },
          status: 'normal',
        },
      },
      {
        'email': 'ursula@teste.com',
        'password': 'teste',
        'profile': {
          name: 'Ursula',
          estimateBornDate: new Date(2016, 02, 20),
          maternityLocation: {
            latitude: -25.4379213,
            longitude: -49.2914821
          },
          status: 'normal',
        },
      },
      
    ];

    for (var i = 0; i < users.length; i++) {
      Accounts.createUser(users[i]);
    }
  }
});