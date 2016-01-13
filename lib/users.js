Meteor.methods({
  
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