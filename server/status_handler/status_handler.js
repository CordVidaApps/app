Scores.after.insert(function(userId, score) {
  console.log('AFTER SCORE INSERT HOOK', score.userId, score);
  let user = Meteor.users.findOne({_id: score.userId});
  if(!user) {
    throw new Meteor.Error(404, 'User Not found');
  }

  // if status is 'urgency', nothing needs to be done
  if(user.profile.status === 'urgency') {
    return;
  }

  // if user signalled a recent false alarm, nothing needs to be done
  if(user.falseAlarmTime) {
    let diff = moment().diff(moment(user.falseAlarmTime), 'hours');
    if(diff <= 6) return;
  }

  // calculate aggregated score
  let aggregatedScore = 0;
  let timeThreshold = moment().subtract(3, 'hours').toDate();
  let scores = Scores.find(
    {
      userId: score.userId,
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
  console.log('######################################## aggregatedScore', aggregatedScore);
  console.log('#########################################################################');

  // change status if aggregatedScore is bigger than thresholds
  let updateObj = {
    aggregatedScore: aggregatedScore
  }
  let ATTENTION_THRESHOLD = 500;
  let URGENCY_THRESHOLD = 1500;

  if(aggregatedScore < ATTENTION_THRESHOLD) {
    _.extend(updateObj, {
      'profile.status': 'normal',
    });
  }

  if(aggregatedScore >= ATTENTION_THRESHOLD && aggregatedScore < URGENCY_THRESHOLD) {
    console.log('******** ATTENTION STATUS');
    _.extend(updateObj, {
      'profile.status': 'attention',
      'profile.attentionTime': new Date()
    });
  }
  else if(aggregatedScore > URGENCY_THRESHOLD) {
    console.log('******** URGENCY STATUS');
    _.extend(updateObj, {
      'profile.status': 'urgency',
      'profile.urgencyTime': new Date()
    });
  }

  // update user
  let updatedUser = Meteor.users.update({_id: score.userId}, {$set: updateObj});

  console.log('prev and next status ---->', user.profile.status, updateObj.profile.status);
  //Meteor.call('sendStatusChangedEmail', userId, user.profile.status, updateObj.profile.status);
});


Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
  console.log('$$$$$$$$$$$$$ AFTER USER UPDATE HOOK', userId, fieldNames, doc.status, this.previous.status);

  if(!_.contains(fieldNames, 'profile')) return;

  if(this.previous.profile.status === 'urgency') return;

  if(doc.profile.status === 'urgency') {
    console.log("%%%%%%%%%%%%%%%%%%%%%%% email");

    Meteor.call('sendStatusChangedEmail', doc._id, this.previous.profile.status, doc.profile.status);
  }

});
