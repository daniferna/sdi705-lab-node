module.exports = function (app, gestorBD) {

    app.get("/api/cancion", function (req, res) {
        gestorBD.obtenerCanciones({}, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({
                    error: "se ha producido un error"
                })
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones));
            }
        });
    });

    app.get("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};

        gestorBD.obtenerCanciones(criterio, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({error: "Se ha producido un error"});
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones[0]));
            }
        });
    });

    app.delete("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};

        gestorBD.eliminarCancion(criterio, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({error: "Se ha producido un error"});
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones));
            }
        })
    })

    app.post("/api/cancion", function (req, res) {
        var cancion = {
            nombre: req.body.nombre,
            genero: req.body.genero,
            precio: req.body.precio
        };

        if (cancion.nombre == null || cancion.genero == null || cancion.precio == null) {
            res.status(400);
            res.send(JSON.stringify({mensaje: "Falta informacion"}));
            return;
        }
        if (checkCancion(cancion, res))
            return;

        gestorBD.insertarCancion(cancion, function (id) {
            if (id == null) {
                res.status(500);
                res.json({error: "Se ha producido un error"});
            } else {
                res.status(201);
                res.json({
                    mensaje: "Cancion insertada",
                    _id: id
                });
            }
        });
    });

    function checkCancion(cancion, res) {
        if (cancion.precio < 0 || cancion.nombre.length < 3 || cancion.nombre.length > 25) {
            res.status(418);
            res.send(JSON.stringify({mensaje: "Informacion erronea"}));
            return true;
        }
        return false;
    }

    app.put("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};

        var cancion = {};

        if (req.body.nombre != null && !(req.body.nombre.length < 3 || req.body.nombre.length > 25))
            cancion.nombre = req.body.nombre;
        if (req.body.genero != null)
            cancion.genero = req.body.genero;
        if (req.body.precio != null && !(req.body.precio < 0))
            cancion.precio = req.body.precio;

        gestorBD.modificarCancion(criterio, cancion, function (result) {
            if (result == null) {
                res.status(500);
                res.json({
                    error: "se ha producido un error"
                })
            } else {
                res.status(200);
                res.json({
                    mensaje: "canción modificada",
                    _id: req.params.id
                })
            }
        });
    });



};