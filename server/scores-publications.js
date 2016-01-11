Meteor.publish('userScores', function (userId) {
  return Scores.find({userId: userId});
});