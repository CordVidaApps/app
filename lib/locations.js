Locations = new Mongo.Collection('locations');

Meteor.methods({
  insertLocation: function (location) {
    console.log('INSERT LOCATION METHOD', location, 'userId', this.userId);
    location.userId = this.userId;
    location.date = new Date();
    location.center = {
      latitude: location.latitude,
      longitude: location.longitude,
    }
    var locationId = Locations.insert(location);
 
    return locationId;
  },
});

