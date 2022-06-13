const validarUsuario = (req) => {
    const validacionesU = [];

    if(!req.body.nombre) {
        validacionesU.push("El nombre es requerido");
    }

    if(!req.body.estado) {
        validacionesU.push("El estado es requerido");
    }

    return validacionesU;

}

module.exports = {
    validarUsuario,
}