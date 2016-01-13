Scores.after.insert(function(userId, score) {
  console.log('AFTER SCORE INSERT HOOK', userId, score);
  var user = Meteor.users.findOne({_id: userId});
  if(!user) {
    throw new Meteor.Error(404, 'User Not found');    
  }

  // if status is 'urgency', nothing needs to be done
  if(user.status === 'urgency') {
    return;
  }

  // if user signalled a recent false alarm, nothing needs to be done
  if(user.falseAlarmTime) {
    var diff = moment().diff(moment(user.falseAlarmTime), 'hours');
    if(diff <= 24) return;
  }

  // calculate aggregated score
  var aggregatedScore = 0;
  var timeThreshold = moment().subtract(3, 'hours').toDate();
  var scores = Scores.find(
    {
      userId: userId,
      createdAt: { $gt: timeThreshold }
    }, 
    {
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
  var ATTENTION_THRESHOLD = 500;
  var URGENCY_THRESHOLD = 3000;

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
    console.log('************ user updated', err, res);
  });
});


Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
  console.log('$$$$$$$$$$$$$ AFTER USER UPDATE HOOK', userId, fieldNames);
});