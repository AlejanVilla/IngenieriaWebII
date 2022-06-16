import {axiosInstance} from "../helpers/axios-config"

const getTipos = () => {
    return axiosInstance.get("tipo-equipo", {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

const crearTipos = (data) => {
    return axiosInstance.post("tipo-equipo", data, {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

const editTipos = (tipoId, data) => { //pendiente validar este y estado
    return axiosInstance.put(`tipo-equipo/${tipoId}`,data, {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

export {
    getTipos, crearTipos, editTipos
}