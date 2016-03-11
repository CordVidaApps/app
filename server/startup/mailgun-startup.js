Meteor.startup(function () {

  process.env.MAIL_URL = "smtp://postmaster@app.cordvida.com.br:0c5d8205541df93e00a26ce04c2ec145@smtp.mailgun.org:587";

  console.log('instantianting mailgun credentials');
  var options = {
    apiKey: 'key-28085066666d237635d3d1cefe098991',
    domain: 'postmaster@app.cordvida.com.br'
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
