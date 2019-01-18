'use strict'

const usuariosController = require('../controllers').usuarios;
const md_auth = require('../authenticated/authenticated'); // Middleware de autorizacion de token

module.exports = (app)=>{
	app.post('/api/usuario', md_auth.auth, usuariosController.createUser);
	app.post('/api/login', usuariosController.login);
	app.get('/api/listar-usuarios', md_auth.auth, usuariosController.getAll);
}