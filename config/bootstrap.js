/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  // Create a user
  User.findOne({email: 'admin@gmail.com'}, function(err, user){
    if(!user){
      User.create({
  	email: 'admin@gmail.com',
  	password: '4dm1n',
    status:'admin',
      }).done(function(err,user){
  	console.log("Default user created");
        console.log("- username: " + user.email);
        console.log("- password: 4dm1n");
      });
    } else {
      console.log('Default user already exists');
      console.log("- username: " + user.email);
      console.log("- password: 4dm1n");
    }
  });

  // Create a trusted application
  Client.findOne({'name': 'trustedTestClient'}, function(err, client){
    if(err){
      console.log(err.message);
    } else {
      if(!client){
        Client.create({name : 'trustedTestClient',
                       redirectURI: 'http://localhost:1338',
                       trusted: true
        }).done(function(err, client){
          if(err){
            console.log(err.message);
          } else {
            console.log("trustedTestClient created");
            console.log("- client_id: " + client.clientId);
            console.log("- client_secret: " + client.clientSecret);
            console.log("- redirectURI: " + client.redirectURI);
          }
        });
      } else {
        console.log('trustedTestClient already exists');
        console.log("- client_id: " + client.clientId);
        console.log("- client_secret: " + client.clientSecret);
        console.log("- redirectURI: " + client.redirectURI);
      }
    }
  }); 

  //Client dosen
    // Create a trusted application
  Client.findOne({'name': 'dosen'}, function(err, client){
    if(err){
      console.log(err.message);
    } else {
      if(!client){
        Client.create({name : 'dosen',
                       redirectURI: 'http://localhost:1338',
                       trusted: true
        }).done(function(err, client){
          if(err){
            console.log(err.message);
          } else {
            console.log("dosen created");
            console.log("- client_id: " + client.clientId);
            console.log("- client_secret: " + client.clientSecret);
            console.log("- redirectURI: " + client.redirectURI);
          }
        });
      } else {
        console.log('dosen already exists');
        console.log("- client_id: " + client.clientId);
        console.log("- client_secret: " + client.clientSecret);
        console.log("- redirectURI: " + client.redirectURI);
      }
    }
  });

  //Mahasiswa
    // Create a trusted application
  Client.findOne({'name': 'mahasiswa'}, function(err, client){
    if(err){
      console.log(err.message);
    } else {
      if(!client){
        Client.create({name : 'mahasiswa',
                       redirectURI: 'http://localhost:1338',
                       trusted: true
        }).done(function(err, client){
          if(err){
            console.log(err.message);
          } else {
            console.log("mahasiswa created");
            console.log("- client_id: " + client.clientId);
            console.log("- client_secret: " + client.clientSecret);
            console.log("- redirectURI: " + client.redirectURI);
          }
        });
      } else {
        console.log('mahasiswa already exists');
        console.log("- client_id: " + client.clientId);
        console.log("- client_secret: " + client.clientSecret);
        console.log("- redirectURI: " + client.redirectURI);
      }
    }
  });

  // Create an untrusted application
  Client.findOne({'name': 'untrustedTestClient'}, function(err, client){
    if(err){
      console.log(err.message);
    } else {
      if(!client){
        Client.create({name : 'untrustedTestClient',
                       redirectURI: 'http://localhost:1339'
        }).done(function(err, client){
          if(err){
            console.log(err.message);
          } else {
            console.log("untrustedTestClient created");
            console.log("- client_id: " + client.clientId);
            console.log("- client_secret: " + client.clientSecret);
            console.log("- redirectURI: " + client.redirectURI);
          }
        });
      } else {
        console.log('untrustedTestClient already exists');
        console.log("- client_id: " + client.clientId);
        console.log("- client_secret: " + client.clientSecret);
        console.log("- redirectURI: " + client.redirectURI);
      }
    }
  }); 

  cb();
};