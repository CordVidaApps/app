
Locations.after.insert(function(userId, location) {
  console.log('%%%%%%%%%%%%%%% tracker analisys', location.userId, location);
  var user = Meteor.users.findOne({_id: location.userId});
  if(!user) {
    throw new Meteor.Error(404, 'Error 404: User Not found');
  }
  console.log('USER: ', user, user.profile.maternityLocation);

  var rightNow = moment();
  var birthDate = moment(user.profile.estimateBornDate);
  var remainingDays = birthDate.diff(rightNow, 'days');
  var exp = ((280 - remainingDays)/280 + 1);

  console.log('********* ABOUT TO CALCULATE DISTANCE');
  var dist = geolib.getDistance(user.profile.maternityLocation, location.center);
  var g_dist;
  if(dist > 1000) {
    g_dist = 0;
  } else {
    var K = 1000;
    g_dist = K*(1/dist);
  }
  var scoreValue = Math.pow(g_dist, exp);
    
  console.log('************ DIST:', dist, ' G_DIST:', g_dist, 'EXP:', exp, 'SCORE VALUE:', scoreValue);


  var score = {
    userId: location.userId,
    scoreValue: scoreValue,
    distance: dist,
    remainingDays: remainingDays,
    createdAt: moment().toDate()
  }

  return Scores.insert(score);
});
  
  

