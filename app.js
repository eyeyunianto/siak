// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);

//http://167.88.34.42:1337/oauth/authorize?client_id=W95ZYDDK3S&response_type=code&redirect_uri=http://167.88.34.42:1337/&scope=http://167.88.34.42:1337
// curl -XPOST -d 'client_id=W95ZYDDK3S&client_secret=AVnn5AVPEECHbp84FDStGuvleuuQ0X&grant_type=authorization_code&redirect_uri=http://167.88.34.42:1337&code=CODE' http://167.88.34.42:1337/oauth/token

//curl -XPOST "http://167.88.34.42:1337/oauth/token" -d "grant_type=password&client_id=W95ZYDDK3S&client_secret=AVnn5AVPEECHbp84FDStGuvleuuQ0X&username=me@gmail.com&password=password"