module.exports = {
  appName: 'OAuth2 Sails API',
  port: 1337,
  oauth: {
    tokenLife: 3600
  },
  adapter :{
    // 'default': 'disk',
    'default': 'mongo',
    disk: {
      module: 'sails-disk'
    },
    mongo:{
      module:'sails-mongo',
      host: 'localhost',
      port: '27017',
      user: 'webapi',
      password: 'webapi',
      database: 'apis'
    }
  } 
};

//https://mysails-eyeyunianto.rhcloud.com/oauth/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=REDIRECT_URI&scope=http://localhost:1337
