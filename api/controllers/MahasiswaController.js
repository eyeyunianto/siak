/**
 * MahasiswaController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    //POST
    create: function(req, res, next) {
    	//console.log(req.params);
	    var params = req.params.all();
	    var nim = req.param('nim');
	    delete params.access_token;
	    console.log(params)
	    Mahasiswa.create(params, function(err, mahasiswa) {
	        if (err) return next(err);
	        User.create({
			  	email: nim,
			  	password: 'mahasiswa',
			    status:'third',
			      }).done(function(err,user){
			  		console.log("Default user created");
			      });
	        res.status(201);
	        res.json(mahasiswa);
	    });
	},

  	//GET list
	find: function (req, res, next) {
		// req.user = user;
		var id = req.param('id');
		var idShortCut = isShortcut(id);
		if (idShortCut === true) {
			return next();
		}
		if (id) {
			if (req.user.email==id){
				Mahasiswa.findOne({'nim':id}, function(err, mahasiswa) {
					if(mahasiswa === undefined) return res.notFound();
					if (err) return next(err);
					res.json(mahasiswa);
			  	});
			}
			if(req.user.status=='admin'){
				Mahasiswa.findOne({'nim':id}, function(err, mahasiswa) {
					if(mahasiswa === undefined) return res.notFound();
					if (err) return next(err);
					res.json(mahasiswa);
			  	});
			}
		} else {
			if(req.user.status=='admin'){
				var where = req.param('where');
				if (_.isString(where)) {
				    where = JSON.parse(where);
				}
				var options = {
					limit: req.param('limit') || undefined,
					skip: req.param('skip')  || undefined,
					sort: req.param('sort') || undefined,
					where: where || undefined
				};
			    console.log("This is the options", options);    
				Mahasiswa.find(options, function(err, mahasiswa) {
				  if(mahasiswa === undefined) return res.notFound();
				  if (err) return next(err);
				  res.json(mahasiswa);
				});
			}else{
				res.send(401);
	        	return;
			}
		}
		function isShortcut(id) {
		  if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
		  return true;
		  }
		}
	},

	// an UPDATE action
    update: function (req, res, next) {
        var criteria = {};
        var params = req.params.all();
        var params2 = req.body;
        var user = req.param('nim');
	    delete params.access_token;
	    delete params2.access_token;

        //criteria = _.merge({}, req.params.all(), req.body);
        criteria = _.merge({}, params, params2);
        //console.log(criteria)
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        if(req.user.status=='admin'){
        	Mahasiswa.update({'nim':id }, criteria, function (err, mahasiswa) {
	            if(mahasiswa.length === 0) return res.notFound();
	            if (err) return next(err);
	            res.json(mahasiswa);
	        });
        }else if(req.user.email=id){
        	Mahasiswa.update({'nim':id }, criteria, function (err, mahasiswa) {
	            if(mahasiswa.length === 0) return res.notFound();
	            if (err) return next(err);
	            res.json(mahasiswa);
	        });
        }else{
        	res.send(401);
	        return;
        }
    },
    open: function (req, res, next) {
        var criteria = {};
        var params = req.params.all();
        var params2 = req.body;
        var user = req.param('nim');
	    delete params.access_token;
	    delete params2.access_token;

        //criteria = _.merge({}, req.params.all(), req.body);
        criteria = _.merge({}, params, params2);
        //console.log(criteria)
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        if(req.user.status=='admin'){
        	console.log(id)
        	Mahasiswa.update({'nim':id }, {'krs':true}, function (err, mahasiswa) {
	            if(mahasiswa.length === 0) return res.notFound();
	            if (err) return next(err);
	            res.json(mahasiswa);
	        });
        }else{
        	res.send(401);
	        return;
        }
    },

    close: function (req, res, next) {
        var criteria = {};
        var params = req.params.all();
        var params2 = req.body;
        var user = req.param('nim');
	    delete params.access_token;
	    delete params2.access_token;

        //criteria = _.merge({}, req.params.all(), req.body);
        criteria = _.merge({}, params, params2);
        //console.log(criteria)
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        if(req.user.status=='admin'){
        	Mahasiswa.update({'nim':id }, {'krs':false}, function (err, mahasiswa) {
	            if(mahasiswa.length === 0) return res.notFound();
	            if (err) return next(err);
	            res.json(mahasiswa);
	        });
        }else{
        	res.send(401);
	        return;
        }
    },

    //DESTROY action
    destroy: function (req, res, next) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        if(req.user.status=='admin'){
	        Mahasiswa.findOne({'nim':id }).done(function(err, result) {
	            if (err) return res.serverError(err);
	            if (!result) return res.notFound();
	            Mahasiswa.destroy({'nim':id }, function (err) {
	                if (err) return next (err);
	                User.destroy({'email':id }, function (err) {
	                if (err) return next (err);
		                return res.json(result);
		            });
	                return res.json(result);
	            });

	        });
	    }else{
	    	res.send(401);
	        return;
	    }
    },
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MahasiswaController)
   */
  _config: {}

  
};
