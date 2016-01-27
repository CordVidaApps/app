Meteor.publish('userLocations', function (userId) {
  return Locations.find({userId: userId});
});