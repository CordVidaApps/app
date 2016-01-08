Scores.after.insert(function(userId, score) {
  console.log('AFTER SCORE INSERT HOOK', userId, score);
  var user = Meteor.users.findOne({_id: userId});
  if(!user) {
    throw new Meteor.Error(404, 'User Not found');    
  }

  var aggregatedScore = 0;
  var scores = Scores.find({userId: userId}, {
    sort: {createdAt: -1},
    limit: 20,
    fields: {
      userId: 1,
      scoreValue: 1,
    },
  }).fetch();

  console.log('******** last 20 scores', scores.length);

  scores.forEach(function(score){
    aggregatedScore += score.scoreValue;
  });

  console.log('******* aggregatedScore', aggregatedScore);

  Meteor.users.update({_id: userId}, 
    {$set: {
      aggregatedScore: aggregatedScore
    }}, 
    function(err, res){
    console.log('************ aggregatedScore updated', err, res);
  });
});