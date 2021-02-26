var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bd_portafolio')
        .then(function(){
            console.log("Conexion a la base de dato exitosa");

             // creacion del servidor
             app.listen(port, function(){
                 console.log("servidor corriendo correctamente en la url localhost:"+port);
             })   

        })
        .catch(function(error){
            console.log(error);
        });