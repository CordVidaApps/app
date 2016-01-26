Meteor.methods({

  editUser: function (user) {
    console.log('edit user method', user);

    try {
      return Meteor.users.update({_id: user._id}, {
        $set: {
          'profile.name': user.profile.name,
          'profile.estimateBornDate': user.profile.estimateBornDate,
          'profile.maternityAddress': user.profile.maternityAddress,
          'profile.maternityLocation': user.profile.maternityLocation,
        }
      });
    } catch(error) {
      throw Meteor.Error(error);
    }

  },
  
  chanceToEmergencyStatus: function () {
    console.log('method chanceToEmergencyStatus');
    var user = Meteor.user();
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }  

    Meteor.users.update({_id: this.userId}, {
      $set: {
        status: 'urgency',
        urgencyTime: new Date(),
        falseAlarmTime: ''
      }
    });    
  },

  falseAlarm: function () {
    console.log('method falseAlarm');
    var user = Meteor.user();
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }    

    Meteor.users.update({_id: this.userId}, {
      $set: {
        status: 'normal',
        falseAlarmTime: new Date(),
        urgencyTime: ''
      }
    });
  }
});