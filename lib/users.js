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
  },















  sentTestEmail: function(type, emails) {
    var user = Meteor.users.findOne({_id: 'ALx8RJSubqRNMJioD'});
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }

    var emailData = {
      email: user.emails[0].address,
      url: 'urltoregisterpwd',
    };

    SSR.compileTemplate( 'htmlWelcomeEmail', Assets.getText( 'welcome-email-template2.html' ) );

    var res = CordvidaMailgun.send({
      to: emails[0],
      from: Accounts.emailTemplates.from,
      subject:  "CordVida - Alerta de Mudança de Status",
      html: SSR.render( 'htmlWelcomeEmail', emailData ),
    });

    console.log('EMAIL RESPONSE:', res);
  },

  sendSpamTestEmails: function(){
    var emailData = {
      email: 'teste@teste.com',
      url: 'urltoregisterpwd',
    };

    var emails = [
                    "barracuda@barracuda.emailtests.com", 
                    "mr@mr.emailtests.com", 
                    "previews_100@gmx.de", 
                    "litmuscheck02@gmail.com", 
                    "litmuscheck03@aol.com", 
                    "litmuscheck05@yahoo.com", 
                    "litmuscheck04@mail.com",
                    "litmuscheck05@outlook.com", 
                    "litmuscheck04@emailtests.onmicrosoft.com", 
                    "previews_98@web.de", 
                    "litmuscheck04@mail.ru", 
                    "litmuscheck06@gmail.com", 
                    "litmuscheck01@gapps.emailtests.com", 
                    "litmuscheck04@ms.emailtests.com", 
                    "litmustestprod01@gd-testing.com", 
                    "litmustestprod03@yandex.com", 
                    "739726696d@s.litmustest.com", 
                    "739726696d@sg3.emailtests.com", 
                    "739726696d@ml.emailtests.com"
                  ]

    SSR.compileTemplate( 'htmlWelcomeEmail', Assets.getText( 'welcome-email-template2.html' ) );

    _.map(emails, (email) => { 
      var res = CordvidaMailgun.send({
        to: email,
        from: Accounts.emailTemplates.from,
        subject:  "Bem vindo ao CordVida App",
        html: SSR.render( 'htmlWelcomeEmail', emailData ),
      });

      console.log('EMAIL RESPONSE:', res);
    });
  }
});