
Locations.after.insert(function(userId, location) {
  console.log('%%%%%%%%%%%%%%% tracker analisys', location.userId, location.coords);
  let user = Meteor.users.findOne({_id: location.userId});
  if(!user) {
    throw new Meteor.Error(404, 'Error 404: User Not found');
  }
  //console.log('USER: ', user, user.profile.maternityLocation);

  let rightNow = moment();
  let birthDate = moment(user.profile.estimateBornDate);
  let remainingDays = birthDate.diff(rightNow, 'days');
  let exp = ((280 - remainingDays)/280 + 1);

  console.log('********* ABOUT TO CALCULATE DISTANCE');
  let dist = geolib.getDistance(user.profile.maternityLocation, location.center);
  let g_dist;
  if(dist > 1000) {
    g_dist = 0;
  } else {
    let K = 1000;
    g_dist = K*(1/dist);
  }
  let scoreValue = Math.pow(g_dist, exp);

  console.log('************ DIST:', dist, ' G_DIST:', g_dist, 'EXP:', exp, 'SCORE VALUE:', scoreValue);


  let score = {
    userId: location.userId,
    scoreValue: scoreValue,
    distance: dist,
    remainingDays: remainingDays,
    createdAt: moment().toDate()
  }

  return Scores.insert(score);
});
