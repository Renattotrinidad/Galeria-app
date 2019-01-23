'use strict'

const fotografiasController = require('../controllers').fotografias;
var md_auth = require('../authenticated/authenticated'); // Middleware de autorizacion de token
const cn_multiparty = require('connect-multiparty');
var md_upload = cn_multiparty({uploadDir: './uploads/fotografias'});

module.exports = (app)=>{
	app.post('/api/fotografia', md_auth.auth, fotografiasController.createImage);
	app.post('/api/upload-foto/:id', [md_auth.auth, md_upload], fotografiasController.uploadImage);
	app.put('/api/fotografia/:id', md_auth.auth, fotografiasController.updateImage);
	app.get('/api/fotografia/:fotografia/:thumb', fotografiasController.getImage);
	app.get('/api/fotografias', fotografiasController.getActiveImage);
	app.get('/api/all-fotografias', md_auth.auth, fotografiasController.getAllImage);
	app.get('/api/fotografia/:id', fotografiasController.getImageById);
}