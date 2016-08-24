const horizon = require('@horizon/server');
var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/mainstream', function (req, res) {
/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library

var client_id = 'be8bd707aec74c629c6376144063f094'; // Your client id
var client_secret = 'd38796004a894a5593b9ee3b872ba48c'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {



    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/spotify/playlists/5zRlalcDw1qdHLc3lqfmHp/tracks?limit=1',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(token);
      console.log(body);
      res.json(body)
    });
  }
});

})

app.get('/underground', function (req, res) {
  // res.send('HEY HEY Underground!');
// Setup, please insert your data from your app at http://soundcloud.com/you/apps to make this example work
	var credentials = {
	     client_id : '9f5ea1e532c10e0356eb3a04ab196679',
	     client_secret : 'e6eef4050b5798d485dd9717e400dcc6',
	     username : 'tikishackfunhouse',
	     password : 'love13'
	    };

	SC = require('soundcloud-nodejs-api-wrapper');
	var sc = new SC(credentials);

	// this client object will be explained more later on
	var client = sc.client();

	client.exchange_token(function(err, result) {

	  var access_token = arguments[3].access_token;

	  console.log('Full API auth response was:');
	  console.log(arguments);

	  // we need to create a new client object which will use the access token now
	  var clientnew = sc.client({access_token : access_token});

	  clientnew.get('/me/activities/tracks/affiliated', {limit : 1}, function(err, result) {
	    if (err) console.error(err);
	    res.json(result) // should show a json object of your soundcloud user
	  });

	});



});

app.use(express.static('public'));

var httpServer = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const options = {
  auth: {
    token_secret: "dsMZF6eNr6WIC1Uhg0nNK56GFFaBo+XC43FtW5AlqKgYX0WCSderHiJmf84B78B9CopCp3qVR6n2p3dFOEuxlQ==",
    allow_anonymous: true, // harden, horizon
    allow_unauthenticated: true, // harden, horizon

  },
  auto_create_collection: true, // TODO: harden, dokku/rethink
  auto_create_index: true, // TODO: harden, dokku/rethink
  permissions: false,
  project_name: 'expresstester',
  // rdb_host: "0.0.0.0",
  rdb_port: 28015
};
console.log('starting horizon with ' + options);
const horizonServer = horizon(httpServer, options);