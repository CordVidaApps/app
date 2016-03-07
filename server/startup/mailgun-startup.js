Meteor.startup(function () {

  process.env.MAIL_URL = "smtp://postmaster@sandboxa6e66c4198ac49dfb01f50b5711287c2.mailgun.org:66b57b8ebd11cfc2c1d6466d9458cf6d@smtp.mailgun.org:587";

  console.log('instantianting mailgun credentials');
  var options = {
    apiKey: 'key-b2233da7ce29f81b1b04e2f981e6445c',
    domain: 'sandboxa6e66c4198ac49dfb01f50b5711287c2.mailgun.org'
  }
  CordvidaMailgun = new Mailgun(options);


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
});
