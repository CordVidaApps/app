Meteor.startup(function () {

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
