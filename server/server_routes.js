// Include the body-parser NPM package using the Meteor.npmRequire method we
// get from the meteorhacks:npm package.
var bodyParser = Meteor.npmRequire( 'body-parser' );

// Define our middleware using the Picker.middleware() method.
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route('/sendLocations', function(params, request, response, next) {
  
  var data = {
    params: params,
    query: params.query,
    body: request.body
  };

  console.log("SEND LOCATIONS DATA --->", data);

  var location = data.body.location;
  var userId = data.body.auth_token;

  Meteor.call('insertLocation', location, userId);

  response.setHeader( 'Content-Type', 'application/json' );
  response.statusCode = 200;
  response.end( "Hello!" );
});