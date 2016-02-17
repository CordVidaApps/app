Meteor.methods({
  createNewUser: function(user) {
    var userId = Accounts.createUser(user);
    Accounts.sendEnrollmentEmail(userId);
  },

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

    return Meteor.users.update({_id: this.userId}, {
      $set: {
        'profile.status': 'urgency',
        'profile.urgencyTime': new Date(),
      },
      $unset: {
        'profile.falseAlarmTime': '',
      }
    });    
  },

  falseAlarm: function () {
    console.log('method falseAlarm');

    Meteor.users.update({_id: this.userId}, {
      $set: {
        'profile.status': 'normal',
        'profile.falseAlarmTime': new Date(),
      }, $unset: {
        'profile.urgencyTime': '',
        'profile.attentionTime': ''
      }
    });
  },

  confirmUrgency: function (userId) {
    console.log('method falseAlarm');
    var user = Meteor.users.findOne({_id: userId});
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }    

    Meteor.users.update({_id: userId}, {
      $set: {
        'profile.confirmationTime': new Date(),
      }, $unset: {
        'profile.falseAlarmTime': '',
      }
    });
  },

  cancelUrgencyConfirmation: function (userId) {
    console.log('method falseAlarm');
    var user = Meteor.users.findOne({_id: userId});
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }    

    Meteor.users.update({_id: userId}, {
      $unset: {
        'profile.confirmationTime': '',
      }
    });
  },

  resetUserPassword: function(userEmail) {
    if(this.isSimulation) return true;
    console.log('resetUserPassword method', userEmail);
    var user = Accounts.findUserByEmail(userEmail);
    Accounts.sendResetPasswordEmail(user._id);
    return true;
  }
});