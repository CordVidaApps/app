
Meteor.methods({
  sendStatusChangedEmail: function (userId, oldStatus, newStatus) {
    var user = Meteor.users.findOne({_id: userId});
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }

    SSR.compileTemplate( 'htmlStatusChangedEmail', Assets.getText( 'status-changed-email-template.html' ) );

    if(oldStatus === 'attention') {
      oldStatus = 'atenção';
    } else if(oldStatus === 'urgency') {
      oldStatus = 'urgência';
    }

    if(newStatus === 'attention') {
      newStatus = 'atenção';
    } else if(newStatus === 'urgency') {
      newStatus = 'urgência';
    }

    var emailData = {
      oldStatus: oldStatus,
      newStatus: newStatus,
    }

    var res = Email.send({
      to: user.emails[0].address,
      from: Accounts.emailTemplates.from,
      subject:  "CordVida - Alerta de Mudança de Status",
      html: SSR.render( 'htmlStatusChangedEmail', emailData ),
    });
  },
});
