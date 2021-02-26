var express = require('express');
var ProtectoControlador = require('../controladores/proyecto')

var ruta = express.Router();

var multipart = require('connect-multiparty');
var multipartyMiddleware = multipart({uploadDir: './uploads'})

ruta.get('/home', ProtectoControlador.home);
ruta.post('/test', ProtectoControlador.test);
ruta.post('/save-proyect', ProtectoControlador.guardarProyecto);
ruta.get('/proyecto/:id?', ProtectoControlador.getProyecto);
ruta.get('/proyectos', ProtectoControlador.getListProyectos);
ruta.put('/proyecto/:id?', ProtectoControlador.actualizarProyecto);
ruta.delete('/proyecto/:id?', ProtectoControlador.borrarProyecto);
ruta.post('/upload-image/:id?',  multipartyMiddleware, ProtectoControlador.subirImagen);

module.exports = ruta;