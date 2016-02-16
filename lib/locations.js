Locations = new Mongo.Collection('locations');

Meteor.methods({
  insertLocation: function (location, userId) {
    console.log('INSERT LOCATION METHOD', location, 'userId', userId);

    location.userId = userId;
    location.date = new Date();
    location.center = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    var locationId = Locations.insert(location);
 
    Meteor.users.update({_id: userId}, {$set: {lastLocationTime: location.date}});

    return locationId;
    
    return true;
  },
});

