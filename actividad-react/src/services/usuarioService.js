import {axiosInstance} from "../helpers/axios-config";

const getUsuarios = () => {
    return axiosInstance.get("usuario", {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

const crearUsuarios = (data) => {
    return axiosInstance.post("usuario", data, {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

const editUsuarios = (usuarioId, data) => {
    return axiosInstance.put(`usuario/${usuarioId}`,data, {
        headers: {
            "Content-type": "application/json"
        }
    });
    
}

export {
    getUsuarios, crearUsuarios, editUsuarios
}