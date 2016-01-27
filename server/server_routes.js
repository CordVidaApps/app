Router.route( "/sendLocations", { where: "server" } )
  .get( function() {
    // If a GET request is made, return the user's profile.
  })
  .post( function() {
    // If a POST request is made, create the user's profile.
    console.log('SEND LOCATIONS POST FUNCTION ---------------');
    console.log('THIS.params ->', this.params);
    console.log('THIS.REQUEST.query ->', this.request.query);
    console.log('THIS.REQUEST.BODY ->', this.request.body);

    this.response.statusCode = 200;
    this.response.end();
  })
  .put( function() {
    // If a PUT request is made, either update the user's profile or
   // create it if it doesn't already exist.
  })
  .delete( function() {
   // If a DELETE request is made, delete the user's profile.
  }
);