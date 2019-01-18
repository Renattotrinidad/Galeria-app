'use strict'

module.exports = (sequelize,DataTypes)=>{
	const usuarios = sequelize.define('usuarios',{
		usuario: DataTypes.STRING,
		clave: DataTypes.STRING,
		idRol: DataTypes.INTEGER,
		activo: DataTypes.BOOLEAN,
		usuarioCreacion: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	});

	return usuarios;
}