// CADENA URL BBDD MONGODB
// mongodb://admin:EIISDI2018$@tiendamusica-shard-00-00-0jvpg.mongodb.net:27017,tiendamusica-shard-00-01-0jvpg.mongodb.net:27017,tiendamusica-shard-00-02-0jvpg.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true




// Módulos
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var swig = require('swig');
var mongo = require('mongodb');
var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:EIISDI2018$@tiendamusica-shard-00-00-0jvpg.mongodb.net:27017,tiendamusica-shard-00-01-0jvpg.mongodb.net:27017,tiendamusica-shard-00-02-0jvpg.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true');


//Rutas controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)


// lanzar el servidor
app.listen(app.get('port'), function() {
    console.log("Servidor activo");
});
