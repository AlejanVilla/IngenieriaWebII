const validarMarca = (req) => {
    const validacionesM = [];

    if(!req.body.nombre) {
        validacionesM.push("El nombre es requerido");
    }

    if(!req.body.estado) {
        validacionesM.push("El estado es requerido");
    }

    if(!req.body.fechaCreacion) {
        validacionesM.push("La fecha de compra es requerida");
    }


    return validacionesM;

}

module.exports = {
    validarMarca,
}


