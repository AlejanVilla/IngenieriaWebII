import {axiosInstance} from "../helpers/axios-config"

const getEstados = () => {
    return axiosInstance.get("estado-equipo", {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

const crearEstados = (data) => {
    return axiosInstance.post("estado-equipo", data, {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

const editEstados = (estadoId, data) => {
    return axiosInstance.put(`estado-equipo/${estadoId}`,data, {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

export {
    getEstados, crearEstados, editEstados
}