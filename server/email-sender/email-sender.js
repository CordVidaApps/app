Accounts.emailTemplates.siteName = "CordVida";
Accounts.emailTemplates.from = "Suporte CordVida <suporte@cordvida.com.br>";

Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Bem vindo à CordVida";
};
Accounts.emailTemplates.enrollAccount.html = function (user, url) {
  SSR.compileTemplate( 'htmlWelcomeEmail', Assets.getText( 'welcome-email-template2.html' ) );
  var emailData = {
    email: user.emails[0].address,
    url: url.replace( '#/', '' ),
  };
  return SSR.render( 'htmlWelcomeEmail', emailData );
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "CordVida - Solitação para trocar a senha";
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
  SSR.compileTemplate( 'htmlResetPasswordEmail', Assets.getText( 'reset-password-email-template.html' ) );
  var emailData = {
    email: user.emails[0].address,
    url: url.replace( '#/', '' ),
  };
  return SSR.render( 'htmlResetPasswordEmail', emailData );
};


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
    };

    console.log('----------------> sending email to: ', user.emails[0].address);

    process.env.MAIL_URL = "smtp://postmaster@app.cordvida.com.br:0c5d8205541df93e00a26ce04c2ec145@smtp.mailgun.org:587";

    var res = CordvidaMailgun.send({
      to: user.emails[0].address,
      from: Accounts.emailTemplates.from,
      subject:  "CordVida - Alerta de Mudança de Status",
      html: SSR.render( 'htmlStatusChangedEmail', emailData ),
    });

    console.log('EMAIL RESPONSE:', res);
  }
});
