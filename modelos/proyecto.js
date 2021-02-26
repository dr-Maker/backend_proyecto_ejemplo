var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectoSchema = Schema({
    name: String,
    description: String,
    categoria : String,
    lenguaje: String,
    anho: Number, 
    imagen: String
})

module.exports = mongoose.model('Proyectos',ProyectoSchema)