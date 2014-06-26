// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);

// untrustedTestClient created
// - client_id: 5891Z520HG
// - client_secret: pq9IKM7sPSIu0yjhmlnrVvz6innDji
// - redirectURI: http://localhost:1339
// trustedTestClient created
// - client_id: L84D9CNTS2
// - client_secret: uXjTEOxAnYojwYS29cRZhVSVplhxlk
// - redirectURI: http://localhost:1338
// Default user created
// - username: me@gmail.com
// - password: password

//curl -XPOST "http://localhost:1337/oauth/token" -d "grant_type=password&client_id=L84D9CNTS2&client_secret=uXjTEOxAnYojwYS29cRZhVSVplhxlk&username=me@gmail.com&password=password"