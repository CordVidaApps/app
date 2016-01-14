Meteor.methods({
  clearData: function () {
    Meteor.users.remove({});
    Locations.remove({});
    Scores.remove({});
  },

  clearUserLocationsAndScores: function(userId){
    console.log("REMOVING LOCATIONS AND SCORES", userId);
    Locations.remove({userId: userId});
    Scores.remove({userId: userId});
    Meteor.users.update({_id: userId}, 
      {$set: {
        status: 'normal',
        aggregatedScore: 0,
      }, $unset: {
        falseTimeAlarm: '',
        attentionTime: '',
        urgencyTime: '',
        lastLocationTime: '',
      }}
    );
  },

  loadUsers: function(){
    var users = [
      {
        'email': 'pedroluis.raphael@gmail.com',
        'password': 'teste',
        'status': 'normal',
        'profile': {
          name: 'Pedro',
          estimateBornDate: new Date(2016, 0, 20),
          maternityLocation: {
            latitude: -25.4597917,
            longitude: -49.2895203
          },
        },
      },
      {
        'email': 'pk@klien.net',
        'password': 'teste',
        'profile': {
          name: 'Phillip',
          estimateBornDate: new Date(2016, 0, 20),
          maternityLocation: {
            latitude: -23.5927582,
            longitude: -46.6822805,
          },
        },
      },
      {
        'email': 'max.assuncao@cordvida.com.br',
        'password': 'teste',
        'profile': {
          name: 'Max',
          estimateBornDate: new Date(2016, 0, 20),
          maternityLocation: {
            latitude: -23.5621793,
            longitude: -46.7140245,
          },
        },
      },
      {
        'email': 'isabel.capistrano@gmail.com',
        'password': 'teste',
        'profile': {
          name: 'Bel',
          estimateBornDate: new Date(2016, 0, 20),
          maternityLocation: {
            latitude: -22.9623821,
            longitude: -43.2204205
          },
        },
      },
      {
        'email': 'gabrielhpugliese@gmail.com',
        'password': 'teste',
        'profile': {
          name: 'Gabriel',
          estimateBornDate: new Date(2016, 0, 20),
          maternityLocation: {
            latitude: -23.5180136,
            longitude: -46.6146033
          },
        },
      },
      {
        'email': 'ursulacoelho@live.com',
        'password': 'teste',
        'profile': {
          name: 'Ursula',
          estimateBornDate: new Date(2016, 0, 20),
          maternityLocation: {
            latitude: -25.4379213,
            longitude: -49.2914821
          },
        },
      },
      {
        'email': 'apple@test.com',
        'password': 'test',
        'profile': {
          name: 'Apple',
          estimateBornDate: new Date(2016, 05, 20),
          maternityLocation: {
            latitude: -25.4379213,
            longitude: -49.2914821
          },
        },
      },
      
    ];

    Accounts.onCreateUser(function(options, user) {
      user.status = 'normal';
      if (options.profile)
        user.profile = options.profile;
      return user;
    });
    
    for (var i = 0; i < users.length; i++) {
      Accounts.createUser(users[i]);
    }
  }
});