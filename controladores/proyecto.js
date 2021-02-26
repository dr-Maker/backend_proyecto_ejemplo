var Proyecto = require('../modelos/proyecto');
var fs = require('fs');

var controlador = {
    home: function(req,res){
        return res.status(200).send({
            message: "Soy la Home enviado desde controlador"
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: "Soy el test enviado desde controlador"
        });
    },

    guardarProyecto: function(req, res){
        var proyecto = new Proyecto();

        var parametros = req.body;

        proyecto.name = parametros.name;
        proyecto.description = parametros.description;
        proyecto.categoria  = parametros.categoria;
        proyecto.lenguaje = parametros.lenguaje;
        proyecto.anho = parametros.anho;
        proyecto.imagen = null;

        proyecto.save(function(err, projectStored){
            if(err) return res.status(500).send({message: "Error al guardar el documento"})
            if(!projectStored) return res.status(404).send({message: "No se ha podido guardar el proyecto"});

            return res.status(200).send({proyecto: projectStored});
        })

        return res.status(200).send({
            proyecto: proyecto,
            message: "Metodo guardarProyecto" 
        })
    },

    getProyecto: function(req, res){
        var proyectoID = req.params.id;

        if(proyectoID== null){
            return res.status(404).send({message: "EEl proyecto no existe"});
        }

    Proyecto.findById(proyectoID, function(err, proyecto){
        if(err) return res.status(500).send({message: "Error al devolver los datos"});

        if(!proyecto) return res.status(404).send({message: "EEl proyecto no existe"});

        return res.status(200).send({
            proyecto
            });

        });
    },

    getListProyectos: function(req, res){
        Proyecto.find({}).sort('+anho').exec(function(err, proyectos){
            if(err) return res.status(500).send({message: "Error al devolver los datos"});

            if(!proyectos)  res.status(404).send({message: "No hay proyectos que mostrar"});

            return res.status(200).send({proyectos})
        });
    },

    actualizarProyecto: function(req, res){
        var proyectoID = req.params.id;
        var actualizar = req.body;

        Proyecto.findByIdAndUpdate(proyectoID, actualizar, {new:true}, function(err, proyectoActualizado){
            if(err) return res.status(500).send({message: "Error al actualizar"});

            if(!proyectoActualizado)  res.status(404).send({message: "No existe el proyecto para actualizar"});

            return res.status(200).send({project :proyectoActualizado})

        });
    },

    borrarProyecto: function(req, res){
        var proyectoID = req.params.id;

        Proyecto.findByIdAndRemove(proyectoID, function (err, ProyectoEliminado){
            if(err) return res.status(500).send({message: "Error al eliminar"});

            if(!ProyectoEliminado)  res.status(404).send({message: "No existe el proyecto a Eliminar"});

            return res.status(200).send({project :ProyectoEliminado})
        });
    },

    subirImagen: function(req, res){
        var proyectoID = req.params.id;
        var file_name = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var file_name = fileSplit[1];
            var extSplit = file_name.split('\.');
            var fileExt  = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt =='jpeg' || fileExt == 'gif'){


                Proyecto.findByIdAndUpdate(proyectoID, {imagen:file_name}, {new:true}, function(err, proyectoActualizado){
                    if(err) return res.status(500).send({message: "La imagen no se ha subido"});

                    if(!proyectoActualizado)  res.status(404).send({message: "El proyecto no existe y no se ha asignado la imagen"});

                    return res.status(200).send({project: proyectoActualizado});
                });

            }else{
                fs.unlink(filePath, function(err){
                    return res.status(200).send({message: "La extensión no es válida"})
                });
            }


        }else{
                    return res.status(200).send({message: file_name});
            }
        }

};


module.exports = controlador;