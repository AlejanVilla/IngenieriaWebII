const { Router } = require("express");
const { validarUsuario } = require("../helpers/validar-usuario");
const router = Router();
const Usuario = require('../models/Usuario');

router.post('/', async function(req, res){

    try{

        const validacionesU = validarUsuario(req); 

        if(validacionesU.length > 0) {
            return res.status(400).send(validacionesU);
        }

    console.log(req.body);

    const existeUsurio = await Usuario.findOne({ email: req.body.email }); //metodo de validación
    console.log('Usuario ya existe', existeUsurio);
    if(existeUsurio){
        return res.send('Email ya existe.');
    }
    
    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = usuario.save();
    res.send(usuario);

    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.get('/', async function(req, res){
    
    try {
        const usuario = await Usuario.find();
        res.send(usuario);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar los usuarios');
    }
    
});

router.put('/:usuarioId', async function(req, res){

    try {
        let usuario = await Usuario.findById(req.params.usuarioId);

        if(!usuario){
            return res.send('Usuario no existe'); 
        }

    const existeUsurio = await Usuario
                        .findOne({ email: req.body.email, _Id: {$ne: usuario._Id} }); 

    if(existeUsurio){
        return res.send('Email ya existe.');
    }

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaActualizacion = new Date();

    usuario = usuario.save();
    res.send(usuario);

    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router;