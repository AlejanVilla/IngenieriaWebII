const { Router } = require("express");
const { validarMarca } = require("../helpers/validar-marca");
const Marca = require("../models/Marca");
const router = Router();

router.post('/',async function(req, res){
    
    try{

        const validacionesM = validarMarca(req); 

        if(validacionesM.length > 0) {
            return res.status(400).send(validacionesM);
        }
        console.log(req.body);
    
              
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
    
        marca = marca.save();
        res.send(marca);
    
        } catch(error) {
            console.log(error);
            res.send('Ocurrio un error');
        }
   
});

router.get('/', async function(req, res){
    try {
        const marca = await Marca.find();
        res.send(marca);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar las marcas');
    }
});

router.put('/:marcaId', async function(req, res){

    try{

        let marca = await Marca.findById(req.params.marcaId);

        if(!marca){
            return res.send('La marca no existe'); 
        }
                         
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();
    
        marca = marca.save();
        res.send(marca);
    
        } catch(error) {
            console.log(error);
            res.send('Ocurrio un error');
        }
   
});

module.exports = router;