Meteor.startup(function () {
  console.log('instantianting mailgun credentials');
  var options = {
    apiKey: 'key-b2233da7ce29f81b1b04e2f981e6445c',
    domain: 'sandboxa6e66c4198ac49dfb01f50b5711287c2.mailgun.org'
}
  CordvidaMailgun = new Mailgun(options);
});