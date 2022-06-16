import React, { useState, useEffect } from "react";
import {getTipos, crearTipos, editTipos} from "../../../services/tipoService";

export const TipoMain = () => {

    const [ tipos, setTipos ] = useState([]);

    const listarTipos = async () => {
        try {
            const resp = await getTipos();
            console.log(resp.data);
            setTipos(resp.data);
        } catch (error) {
            console.log(error);
        }
    }   
       
    useEffect( () => {
        listarTipos();
    }, []);

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value});
}

    const nuevoTipo = async (tipo) => {
        try {
            const resp = await  crearTipos(tipo);
            console.log(resp.data);
            listarTipos();
            setValoresForm({nombre: "", estado: "", fechaCreacion:"", fechaActualizacion: ""});
        } catch (error) {
            console.log(error);
        }
    }


    const [valoresForm, setValoresForm] = useState({});
    const { nombre = '', estado = '' } = valoresForm;
    

    const handleOnSubmit = (e) => {
        e.preventDefault();
        nuevoTipo(valoresForm);        
    }


    return <>

        <form onSubmit={(e) => handleOnSubmit(e) }>
            <div className='container-fluid mt-3 mb-2'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Tipo de Equipo</h4>
                                <hr />
                                <div className="row">  
                                    <div className="col">  
                                        <div className="mb-3">            
                                            <label className="form-label">Nombre</label>
                                                <input type="text" onChange={ (e) => handleOnChange(e)}  
                                                    name="nombre"  required
                                                    className="form-control"/>  
                                        </div>  
                                    </div>                                 
                    
                                <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Estado</label>
                                            <select className="form-select" 
                                                required
                                                onChange={ (e) => handleOnChange(e) }
                                                name= "estado" value={estado} >
                                                <option defaultValue value="">Seleccionar</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>                                                
                                            </select>
                                        </div>
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <button className= "btn btn-primary">Guardar</button>
                                            <button className= "btn btn-secondary">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div> 
                            <table className="table table table-striped" >
                            <thead>
                                <tr>                                
                                <th scope="col">Nombre</th>                        
                                <th scope="col">Estado</th>
                                <th scope="col">Fecha Creación</th>
                                <th scope="col">Fecha Actualización</th>                        
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    tipos.map(tipo => {
                                        return <tr key={tipo._id}>
                                <td> {tipo.nombre} </td>
                                <td>{ tipo.estado }</td> 
                                <td>{ tipo.fechaCreacion }</td> 
                                <td>{ tipo.fechaActualizacion }</td>                              
                                </tr>  
                                })
                            }                                            
                     </tbody>
                </table>                                                                  
            </div>             
        </form>
    </>
}