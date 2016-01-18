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
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -25.431839, 
            longitude: -49.297747,
          },
        },
      },
      {
        'email': 'pk@klien.net',
        'password': 'teste',
        'profile': {
          name: 'Phillip',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -23.578771,
            longitude: -46.673612, 
          },
        },
      },
      {
        'email': 'max.assuncao@cordvida.com.br',
        'password': 'teste',
        'profile': {
          name: 'Max',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -23.551337, 
            longitude: -46.747190,
          },
        },
      },
      {
        'email': 'isabel.capistrano@gmail.com',
        'password': 'teste',
        'profile': {
          name: 'Bel',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -22.962367,
            longitude: -43.218280
          },
        },
      },
      {
        'email': 'gabrielhpugliese@gmail.com',
        'password': 'teste',
        'profile': {
          name: 'Gabriel',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -23.518090, 
            longitude: -46.614517
          },
        },
      },
      {
        'email': 'ursulacoelho@live.com',
        'password': 'teste',
        'profile': {
          name: 'Ursula',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -25.437796,
            longitude: -49.288808
          },
        },
      },
      {
        'email': 'apple@test.com',
        'password': 'test',
        'profile': {
          name: 'Apple',
          estimateBornDate: new Date(2016, 05, 25),
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
  },

  changeUserMaternityLocation: function(userId, lat, lng) {
    var user = Meteor.users.findOne({_id: userId});
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }
    Meteor.users.update({_id: userId}, 
      {$set: {
        'profile.maternityLocation.latitude': lat,
        'profile.maternityLocation.latitude': lng,
      }}
    );
  }
});