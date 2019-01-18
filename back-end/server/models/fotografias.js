'use strict'

module.exports = (sequelize,DataTypes)=>{
	const fotografias = sequelize.define('fotografias',{
		fotografia: DataTypes.STRING,
		descripcion: DataTypes.STRING,
		imagen: DataTypes.STRING,
		numero: DataTypes.INTEGER,
		autor: DataTypes.STRING,
		activo: DataTypes.BOOLEAN,
		usuarioCreacion: DataTypes.STRING
	});

	return fotografias;
}