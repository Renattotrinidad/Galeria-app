'use strict'

const usuarios = require('../models').usuarios;
const jwt = require('../services/jwt');

function createUser(req,res){
	usuarios.create(req.body)
			.then(usuario=>{
				res.status(200).send({usuario});
			})
			.catch(err=>{
				res.status(500).send({err});
			});
}

function login(req,res){
	usuarios.findOne({
		where:{
			usuario: req.body.usuario,
			clave: req.body.clave
		}
	})
	.then(usuario=>{
		if (usuario) {
			if (req.body.token) {
				res.status(200).send({
					token: jwt.createToken(usuario)
				});
			}else{
				res.status(200).send({
					usuario: usuario,
				});
			}

		}else{
			res.status(401).send({message: "Usuario sin autorizacion."});
		}
		
	})
	.catch(err=>{
		res.status(500).send({message: "No se pudo encontrar el usaurio."});
	});
}

function getAll(req,res){
	usuarios.all()
			.then(usuarios=>{
				return res.status(200).send({usuarios});
			})
			.catch(err=>{
				return res.status(500).send({message: "Ocurrio un error al buscar los usuarios."});
			})
}

module.exports = {
	createUser,
	login,
	getAll
}