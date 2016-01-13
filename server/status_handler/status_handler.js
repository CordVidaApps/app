Scores.after.insert(function(userId, score) {
  console.log('AFTER SCORE INSERT HOOK', userId, score);
  var user = Meteor.users.findOne({_id: userId});
  if(!user) {
    throw new Meteor.Error(404, 'User Not found');    
  }

  // calculate aggregated score
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

  // change status if aggregatedScore is bigger than thresholds
  var updateObj = {
    aggregatedScore: aggregatedScore
  }
  var ATTENTION_THRESHOLD = 1000;
  var URGENCY_THRESHOLD = 10000;

  if(aggregatedScore > ATTENTION_THRESHOLD && aggregatedScore < URGENCY_THRESHOLD) {
    console.log('******** ATTENTION STATUS');
    _.extend(updateObj, {
      status: 'attention',
      attentionTime: new Date()
    });
  }
  else if(aggregatedScore > URGENCY_THRESHOLD) {
    console.log('******** URGENCY STATUS');
    _.extend(updateObj, {
      status: 'urgency',
      urgencyTime: new Date()
    });
  }

  // update user
  Meteor.users.update({_id: userId}, {$set: updateObj}, 
    function(err, res){
    console.log('************ aggregatedScore updated', err, res);
  });
});


Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
  console.log('$$$$$$$$$$$$$ AFTER USER UPDATE HOOK', userId, fieldNames);
});