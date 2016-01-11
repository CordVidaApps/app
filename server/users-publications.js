Meteor.publish('users', function () {
  return Meteor.users.find({}, {
    fields: {
      emails: 1,
      profile: 1,
      status: 1,
      lastLocationTime: 1,
    }
  });
});
