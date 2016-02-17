Meteor.startup(function () {

  process.env.MAIL_URL = "smtp://postmaster@sandboxa6e66c4198ac49dfb01f50b5711287c2.mailgun.org:66b57b8ebd11cfc2c1d6466d9458cf6d@smtp.mailgun.org:587";

  console.log('instantianting mailgun credentials');
  var options = {
    apiKey: 'key-b2233da7ce29f81b1b04e2f981e6445c',
    domain: 'sandboxa6e66c4198ac49dfb01f50b5711287c2.mailgun.org'
  }
  CordvidaMailgun = new Mailgun(options);
});
