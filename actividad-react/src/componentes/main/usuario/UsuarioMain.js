import React, { useState, useEffect } from "react";
import {getUsuarios, crearUsuarios, editUsuarios} from "../../../services/usuarioService";



export const UsuarioMain = () => {

    const [ user, setUsuarios ] = useState([]);

    const listarUsuarios = async () => {
        try {
            const resp = await getUsuarios();
            console.log(resp.data);
            setUsuarios(resp.data);
        } catch (error) {
            console.log(error);
        }
    }   
       
    useEffect( () => {
        listarUsuarios();
    }, []);  

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value});
}
const nuevoUsuario = async (usuario) => {
    try {
        const resp = await  crearUsuarios(usuario);
        console.log(resp.data);
        listarUsuarios();
        setValoresForm({nombre: "", email: "" ,estado: "", fechaCreacion:"", fechaActualizacion: ""});
    } catch (error) {
        console.log(error);
    }
}


const [valoresForm, setValoresForm] = useState({});
const { nombre = '', estado = '',email= "" } = valoresForm;


const handleOnSubmit = (e) => {
    e.preventDefault();
    nuevoUsuario(valoresForm);        
}    

    return <>
        
        <form onSubmit={(e) => handleOnSubmit(e) }>        
             <div className='container-fluid mt-3 mb-2'>
                <div className='card'>
                    <div className='card-header'>
                            <h4>Usuarios</h4>
                            <hr />
                        <div className="row">  
                            <div className="col">  
                                <div className="mb-3">            
                                    <label className="form-label">Nombre Completo</label>
                                        <input type="text"   
                                            name="nombre" value={nombre}
                                            onChange={ (e) => handleOnChange(e)}
                                            required
                                            className="form-control"/>  
                                </div> 
                        </div>      
                            
                    <div className="col">  
                        <div className="mb-3"> 
                            <label className="form-label">Email</label>
                            <input type="text"   
                                name="email" value={email}
                                onChange={ (e) => handleOnChange(e)}
                                required
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
                <table className="table table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha Creación</th>
                        <th scope="col">Fecha Actualización</th>                        
                        </tr>
                    </thead>
                    
                    <tbody>
                            {
                                user.map(usuario => {
                                        return <tr key={usuario._id}>
                                <td>{user.nombre} </td>
                                <td>{user.estado }</td> 
                                <td>{user.email }</td> 
                                <td>{user.fechaCreacion }</td> 
                                <td>{user.fechaActualizacion }</td>                              
                                </tr>  
                                })
                            }          
                        
                    </tbody>
                </table>
            </div>         
        </form>
        
    </>          
             
                        
           
}


