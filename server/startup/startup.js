Meteor.startup(function () {

  Modules = {};
  Modules.server = {};
  console.log('==== MODULES INITIATED');

  // CRON TO REMOVE OLD LOCATIONS AND SCORES
  SyncedCron.add({
    name: 'Remove locations after a day',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('at 04:15 am');
    },
    job: function() {
      var yesterday = moment().subtract(1,'day').toDate();
      console.log('CRON JOB  -  YESTERDAY', yesterday);
      Locations.remove({date: { $lte : yesterday }});
      Scores.remove({createdAt: { $lte : yesterday }});
    }
  });

  SyncedCron.start();


  /////////////////// EMAILS /////////////////////////////////////////////////
  // GLOBAL EMAIL TEMPLATES CONFIG
  Accounts.emailTemplates.siteName = "CordVida";
  Accounts.emailTemplates.from = "Suporte CordVida <suporte@cordvida.com.br>";

  // ENROLLMENT EMAIL CONFIG
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
      return "Bem-vindo à CordVida";
  };
  Accounts.emailTemplates.enrollAccount.html = function (user, url) {
    SSR.compileTemplate( 'htmlWelcomeEmail', Assets.getText( 'welcome-email-template2.html' ) );
    var emailData = {
      email: user.emails[0].address,
      url: url.replace( '#/', '' ),
    };
    return SSR.render( 'htmlWelcomeEmail', emailData );
  };

  // RESET PASSWORD EMAIL CONFIG
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
  ///////////////////////////////////////////////////////////////////////////////
});
