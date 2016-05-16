Meteor.startup(function () {

  process.env.MAIL_URL = "smtp://admin@app.cordvida.com.br:supcord123@smtp.mailgun.org:587";

  console.log('instantianting mailgun credentials');
  var options = {
    apiKey: 'key-56dc5763b21c1e1393c8eed36eeaf935',
    domain: 'app.cordvida.com.br'
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
