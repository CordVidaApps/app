Meteor.methods({
  sendWelcomeEmail: function (userEmail) {
    var user = Accounts.findUserByEmail(userEmail);
    if(!user) {
      throw new Meteor.Error(404, 'user not found');
    }

    SSR.compileTemplate( 'htmlWelcomeEmail', Assets.getText( 'welcome-email-template.html' ) );

    var emailData = {
      email: user.emails[0].address,
      password: "teste",
    };

    console.log('sending email');

    CordvidaMailgun.send({
      to: user.emails[0].address,
      from: user.emails[0].address,
      subject:  "Seja Bem-Vindo à CordVida",
      html: SSR.render( 'htmlWelcomeEmail', emailData ),
    });
  }
});