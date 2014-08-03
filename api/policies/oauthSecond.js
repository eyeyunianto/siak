/**
 * oauthBearer policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var passport = require('passport');

module.exports = function(req, res, next) {

	passport.authenticate(
	    'bearer',
	    function(err, user, info)
	    {
	        if ((err) || (!user))
	        {
	            res.send(401);
	            // res.redirect('/');
	            return;
	        }

            delete req.query.access_token;
	        req.user = user;
	        //console.log(req)
	        if(user.status!='admin'){
            	if(user.status!='second'){
            		console.log('not admin')
	        		res.send(401);
	        		return;
	        	}else{
	        		return next();
	        	}
	        }
	        return next();
	    }
	)(req, res);
};
