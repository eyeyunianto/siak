/**
 * NilaiController
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
    //db.jurusan.update({ '_id':12}, {$push:{"makul":{"semester":"3","salah":"lima"}}})
    create: function(req, res, next) {
    	//console.log(req.params);
    	var  jur= req.param('id');
	    var params = req.params.all();
	    var params2 = req.body;
	    delete params.access_token;
	    delete params.id;
	    delete params2.access_token;
	    delete params2.id;
	    // criteria = _.merge({}, params, params2);
	    // Jurusan.update({'kode':jur }, {$push:{'makul':criteria}}, function (err, jurusan) {
	    //     if (err) return next(err);
	    //     res.status(201);
	    //     res.json(jurusan);
	    // });
	},

  	//GET list
	find: function (req, res, next) {
		var id = req.param('id');
		var smstr = req.param('smstr');
		var kode = smstr+'.kode';
		var req = {kode:id};
		var a = JSON.stringify(req);
		var b = a.replace('\"kode\"','"'+smstr+'.kode"');
		var c = JSON.parse(b);
		var idShortCut = isShortcut(id);
		if (idShortCut === true) {
			return next();
		}
		if (id) {
			if(smstr){
			  	Khs.find(c, function(err, khs) {
					if(khs === undefined) return res.notFound();
					if (err) return next(err);
					res.json(khs);
			  	});
			}else{
				return res.notFound();
			}
		} else {
			// var where = req.param('where');
			// if (_.isString(where)) {
			//     where = JSON.parse(where);
			// }
			// var options = {
			// 	limit: req.param('limit') || undefined,
			// 	skip: req.param('skip')  || undefined,
			// 	sort: req.param('sort') || undefined,
			// 	where: where || undefined
			// };
		 //    console.log("This is the options", options);    
			// Khs.find(options, function(err, khs) {
			//   if(khs === undefined) return res.notFound();
			//   if (err) return next(err);
			//   res.json(khs);
			// });
			return res.notFound();
		}
		function isShortcut(id) {
		  if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
		  return true;
		  }
		}
	},

// 	[ id: '12100819' ]
// { access_token: '9OeSAVXn3MMJgpZhbSsqxuKN61xnPXi2lelqmorNdDI3VcwoRauSHB7Rh4ZdEihKnn4UYyplTAB9P5KDBndTPOJtIg5M1cbT2mvSyPQstV3SF2m93MdDDpFzQSCET6jlsMkOwhKYDujuFX7VkW3XgcIkGekpZZibpbQ8BUzxcngXXWHamb1eFQVy9TV8ZqtqV2r2gMB3jasaqE5wYe0VLaFvrEHvG6jUf0MXa9EXrsqUsUOCrvuCICNqXjw5Zc73',
//   nama: 'Agung H',
//   jk: 'Laki-laki',
//   angkatan: '2010',
//   jurusan: 'Teknik Informatika',
//   tmp_lahir: 'bantul',
//   tgl_lahir: '1989-06-13',
//   email: 'eyeyunianto@gmail.com',
//   alamat: 'Tulasan RT04 Mulyodadi Bambanglipuro Bantul',
//   id: '12100819' }


	// an UPDATE action
	//db.matakuliah.update({'Prodi':"Komputerisasi Akuntansi"},{'$pushAll':{'matakuliah':[{"data":[{"kode":"satu","Malam":"dua"}]}]}})
    
    //db.jurusan.update({ '_id':12,'makul.semester':'2'}, {$set:{"makul.$":{"salah":"sepuluh"}}})
    update: function (req, res, next) {
        var criteria = {};
        var id= req.param('id');
        var smstr = req.param('smstr');
        var kode = req.param('kode');
        var kodex = smstr+'.kode';
        var _nilai= req.param('nilai');
        var nilai = _nilai+'.nilai';
	    var params = req.params.all();
	    var params2 = req.body;
	    delete params.access_token;
	    delete params.id;
	    delete params2.access_token;
	    delete params2.id;
	    criteria = _.merge({}, params, params2);
	    var req = {'kode':kode,'nim':id};
		var a = JSON.stringify(req);
		var b = a.replace('\"kode\"','"'+smstr+'.kode"');
		var c = JSON.parse(b);

		var req_ = {nilai:_nilai};
		var a_ = JSON.stringify(req_);
		var b_ = a_.replace('\"nilai\"','"'+smstr+'.$.nilai"');
		var c_ = JSON.parse(b_);

		console.log(c);
		console.log(c_)

        if (!id) {
            return res.badRequest('No id provided.');
        }
        if (id) {
			if(smstr){
				if(req.user.status=='admin'){
				  	Khs.update(c,c_,function(err, khs) {
						if(khs === undefined) return res.notFound();
						if (err) return next(err);
						res.json(khs);
				  	});
				}else if(req.user.status=='second'){
					Khs.update(c,c_,function(err, khs) {
						if(khs === undefined) return res.notFound();
						if (err) return next(err);
						res.json(khs);
				  	});
				}else{
					return res.notFound();
				}
			}else{
				return res.notFound();
			}
		}else{
			return res.notFound();
		}
    },

    //DESTROY action
    //db.jurusan.update({'_id':11,'makul.salah':'lima'},{$pull:{makul:{'salah':'lima'}}})
    destroy: function (req, res, next) {
        var id = req.param('id');
        var kode = req.param('kode');
        if (!id) {
            return res.badRequest('No id provided.');
        }
        // Jurusan.findOne({'kode':id }).done(function(err, result) {
        //     if (err) return res.serverError(err);
        //     if (!result) return res.notFound();

        //     Jurusan.update({'kode':id,'makul.kode':kode},{$pull:{'makul':{'kode':kode}}},function(err){
        //     //Jurusan.destroy({'_id':parseInt(id) }, function (err) {

        //         if (err) return next (err);
        //         return res.json(result);
        //     });

        // });
    },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NilaiController)
   */
  _config: {}

  
};
