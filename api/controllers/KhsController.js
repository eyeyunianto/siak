/**
 * KhsController
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
	    delete params.access_token;
	    //console.log(params)
	    Khs.create(params, function(err, khs) {
	        if (err) return next(err);
	        res.status(201);
	        res.json(khs);
	    });
	},

  	//GET list
	find: function (req, res, next) {
		var id = req.param('id');
		var idShortCut = isShortcut(id);
		if (idShortCut === true) {
			return next();
		}
		if (id) {
			Khs.findOne({'_id':parseInt(id) }, function(err, khs) {
				if(khs === undefined) return res.notFound();
				if (err) return next(err);
				res.json(khs);
		  });
		} else {
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
			Khs.find(options, function(err, khs) {
			  if(khs === undefined) return res.notFound();
			  if (err) return next(err);
			  res.json(khs);
			});
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
	    delete params.access_token;
        //criteria = _.merge({}, req.params.all(), req.body);
        criteria = _.merge({}, params, req.body);
        var id = req.param('id');
        var khs = req.param('khs');
        var action = req.param('action');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        if(!khs){
	        Khs.update({'_id':parseInt(id) }, criteria, function (err, khs) {
	            if(khs.length === 0) return res.notFound();
	            if (err) return next(err);
	            res.json(khs);
	        });
	    }else{
	    	if(!action){
	    		Khs.update({'nim':id }, {$push: {'khs':khs}}, function (err, krs) {
	            if(krs.length === 0) return res.notFound();
	            if (err) return next(err);
		            res.json(krs);
		        });
	    	}else{
	    		Khs.update({'nim':id }, {$pull: {'khs':khs}}, function (err, krs) {
	            if(krs.length === 0) return res.notFound();
	            if (err) return next(err);
		            res.json(krs);
		        });
	    	}
	    }
    },

    //DESTROY action
    destroy: function (req, res, next) {
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        Khs.findOne({'nim':id }).done(function(err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
            Khs.destroy({'nim':id }, function (err) {
                if (err) return next (err);
                return res.json(result);
            });

        });
    },
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to KhsController)
   */
  _config: {}

  
};
