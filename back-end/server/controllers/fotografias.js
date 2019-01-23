'use strict'

const fotografias = require('../models').fotografias;
const fs = require('fs');
const thumb = require('node-thumbnail').thumb;
const path = require('path');

function createImage(req, res){
	fotografias.create(req.body)
	.then(fotografia=>{
		res.status(200).send({fotografia});
	})
	.catch(err=>{
		res.status(500).send({message: "Ocurrio un problema al guardar la fotografia."});
	});
}

function updateImage(req, res){
	var id = req.params.id;
	fotografias.findById(id)
	.then(fotografia=>{
		fotografia.update(req.body)
		.then(()=>{
			res.status(200).send({fotografia});
		})
		.catch(err=>{
			res.status(500).send({message: "Ocurrio un problema al actualizar la fotografia."})
		});
	})
	.catch(err=>{
		res.status(500).send({message: "Ocurrio un problema al buscar la fotografia."})
	});
}

function uploadImage(req, res){
	var id = req.params.id;

	if (req.files){
		var filePath 	= req.files.foto.path;
		var fileSplit 	= filePath.split('\\');
		var fileName 	= fileSplit[2];
		var extSplit 	= fileName.split('\.');
		var fileExt 	= extSplit[1];

		if (fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'gif'){
			var image = {};
			image.imagen = fileName;

			fotografias.findById(id)
			.then(fotografia=>{
				fotografia.update(image)
				.then(()=>{
					// Para guardar las imagenes en formato miniatura
					var newPath = './uploads/fotografias/' + fileName;
					var thumbPath = './uploads/fotografias/thumbs';

					thumb({
						source: path.resolve(newPath),
						destination: path.resolve(thumbPath),
						width: 200,
						suffix: ''
					}).then(()=>{
						// Guarda el objeto de imagen
						res.status(200).send({fotografia});
					}).catch(err=>{
						res.status(404).send({message: "Error al crear el thumbnail."});
					});

				})
				.catch(err=>{
					res.status(500).send({message: "Ocurrio un error al subir fotorgrafia."});	
				});
			})
			.catch(err=>{
				fs.unlink(filePath,(err)=>{
					if (err){
						res.status(404).send({message: "Ocurrio un error al realizar rollback."})	
					}
				});
				res.status(500).send({message: "Ocurrio un error al buscar fotorgrafia."});
			});
		}else{
			fs.unlink(filePath,(err)=>{
				if (err){
					res.status(404).send({message: "Ocurrio un error al realizar rollback."})	
				}
			});
			res.status(500).send({message: "Fotografia no es de un formato valido."});
		}
	}else{
		res.status(400).send({message: "Debes seleccionar una fotografia."});
	}
}

function getImage(req,res){
	var image = req.params.fotografia;
	var thumb = req.params.thumb;

	if (thumb == "false"){
		var pathImage = './uploads/fotografias/' + image;	
	}else if (thumb == "true"){
		var pathImage = './uploads/fotografias/thumbs/' + image;
	}

	fs.exists(pathImage, (exists)=>{
		if (exists){
			res.sendFile(path.resolve(pathImage));
		}else{
			res.status(404).send({message: "No se encuentra la fotografia."})
		}
	});
}

function getActiveImage(req,res){
	fotografias.all({
		where:{
			activo: true
		},
		order:[
			['numero', 'ASC']
		]
	})
	.then(fotografias=>{
		res.status(200).send({fotografias});
	})
	.catch(err=>{
		res.status(404).send({message: "Problemas para obtener las fotografias."});
	});
}

function getAllImage(req,res){
	fotografias.all({
		order:[
			['numero', 'ASC']
		]
	})
	.then(fotografias=>{
		res.status(200).send({fotografias});
	})
	.catch(err=>{
		res.status(500).send({message: "Problemas para obtener las fotografias."});
	});
}

function getImageById(req,res){
	var id = req.params.id;

	fotografias.findById(id)
	.then(fotografia=>{
		res.status(200).send({fotografia});
	})
	.catch(err=>{
		res.status(500).send({message: "Problemas para obtener la fotografia."});
	});
}

module.exports = {
	createImage,
	updateImage,
	uploadImage,
	getImage,
	getActiveImage,
	getAllImage,
	getImageById
}