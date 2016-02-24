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
        'profile.status': 'normal',    
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
        'profile': {
          name: 'Pedro',
          status: 'normal',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -25.431839, 
            longitude: -49.297747,
          },
          maternityAddress: 'Rua Professor Dário Veloso, 36 - Vila Izabel, Curitiba - PR, 80320-050, Brazil'
        },
      },
      {
        'email': 'pk@klien.net',
        'password': 'teste',
        'profile': {
          name: 'Phillip',
          status: 'normal',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -23.578771,
            longitude: -46.673612, 
          },
          maternityAddress: 'R. Japão, 110 - Itaim Bibi, São Paulo - State of São Paulo, Brazil'
        },
      },
      {
        'email': 'max.assuncao@cordvida.com.br',
        'password': 'teste',
        'profile': {
          name: 'Max',
          status: 'normal',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -23.551337, 
            longitude: -46.747190,
          },
          maternityAddress: 'Rua Alvarenga, 2226 - Butantã, São Paulo - State of São Paulo, Brazil'
        },
      },
      {
        'email': 'isabel.capistrano@gmail.com',
        'password': 'teste',
        'profile': {
          name: 'Bel',
          status: 'normal',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -22.962367,
            longitude: -43.218280
          },
          maternityAddress: 'Rua Itaipava, 18 - Jardim Botânico, Rio de Janeiro - State of Rio de Janeiro, Brazil'
        },
      },
      {
        'email': 'gabrielhpugliese@gmail.com',
        'password': 'teste',
        'profile': {
          name: 'Gabriel',
          status: 'normal',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -23.518090, 
            longitude: -46.614517
          },
          maternityAddress: 'a Miguel Mentem, 100 - Vila Guilherme, São Paulo - State of São Paulo, Brazil'
        },
      },
      {
        'email': 'ursulacoelho@live.com',
        'password': 'teste',
        'profile': {
          name: 'Ursula',
          status: 'normal',
          estimateBornDate: new Date(2016, 0, 25),
          maternityLocation: {
            latitude: -25.437796,
            longitude: -49.288808
          },
          maternityAddress: 'Av. Vicente Machado, 1280 - Centro, Curitiba - State of Paraná, Brazil'
        },
      },
      {
        'email': 'apple@test.com',
        'password': 'test',
        'profile': {
          name: 'Apple',
          status: 'normal',
          estimateBornDate: new Date(2016, 05, 25),
          maternityLocation: {
            latitude: -25.4379213,
            longitude: -49.2914821
          },
          maternityAddress: ''
        },
      },
      
    ];

    Accounts.onCreateUser(function(options, user) {
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

    console.log('CHANGING USER MATERNITY LOCATION', lat, lng);

    Meteor.users.update({_id: userId}, 
      {$set: {
        'profile.maternityLocation.latitude': lat,
        'profile.maternityLocation.longitude': lng,
      }}
    );
  },

  changeUserEstimateBirthDate: function(userId, day, month, year) {
    var user = Meteor.users.findOne({_id: userId});
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }

    var date = new Date(year, month, day);
    console.log('CHANGING USER BIRTH DATE', date);

    Meteor.users.update({_id: userId}, 
      {$set: {
        'profile.estimateBornDate': date,
      }}
    );
  }
});