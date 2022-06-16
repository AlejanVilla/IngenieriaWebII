import React, { useState, useEffect }from 'react'
import {getUsuarios} from "../../../services/usuarioService";
import {getMarcas} from "../../../services/marcaService";
import {getTipos} from "../../../services/tipoService";
import {getEstados} from "../../../services/estadoService";
import {crearInventarios} from '../../../services/inventarioService';
import Swal from 'sweetalert2';


export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipo, setTipos ] = useState([]);
    const [ estado, setEstados ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState({});
    const { serial = '', modelo = '', descripcion = '', color = '', precio = '', foto = '', fechaCompra = '', 
            usuario,marca, tipos,estados } = valoresForm;

    
    const listarUsuarios = async () => {
        try {
            const {data}= await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        listarUsuarios();
    }, []);

    const listarMarcas = async () => {
        try {
            const {data}= await getMarcas();
            setMarcas(data);
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect( () => {
        listarMarcas();
    }, []);

    const listarTipos = async () => {
        try {
            const {data}= await getTipos();
            setTipos(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        listarTipos ();
    }, []);

    const listarEstados = async () => {
        try {
            const {data}= await getEstados();
            setEstados(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        listarEstados();
    }, []);

    const handleOnChange = ({ target}) => {
        const { name, value } = target;
        setValoresForm({...valoresForm,[ name]: value});
    }

    const handleOnSubmit= async (e) => {
        e.preventDefault();
        const inventario = { serial, modelo, descripcion, color, precio, foto, fechaCompra, 
        usuario: {
            _id: usuario
        },
        marca: {
            _id: marca
        }, 
        tipoEquipo: {
            _id: tipos
        },
        estadoEquipo: {
            _id: estados
        }
    }
    
    try {
        Swal.fire ({
            allowOutsideClick: false,
            text: "Procesando..."            
        });
        Swal.showLoading();
        const {data} = await crearInventarios(inventario);
        console.log(data);
        Swal.close();
        handleOpenModal();
        listarInventarios();
    } catch (error) {
        console.log(error);
        Swal.close();
        let mensaje; 
            if (error && error.response && error.response.data ) {
                mensaje = error.response.data;
            } else {
                mensaje = "Ocurrio un error, intente de nuevo"; 
            }
            Swal.fire("Error", mensaje , "error"); 
    }
}

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nuevo Registro</h3>
                        <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <hr />
                </div>
            </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name="serial"
                                    required 
                                    onChange={ (e) => handleOnChange(e) }
                                    value={serial}                                    
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input type="text" name='modelo'
                                    required 
                                    onChange={ (e) => handleOnChange(e) }
                                    value={modelo}                                    
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <input type="text" name='descripcion'
                                    required
                                    onChange={ (e) => handleOnChange(e) }
                                    value={descripcion}                                    
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input type="text" name='color' 
                                    required
                                    onChange={ (e) => handleOnChange(e) }
                                    value={color}                                    
                                    className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="url" name="foto" 
                                    required
                                    onChange={ (e) => handleOnChange(e) }
                                    value={foto}                                    
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha Compra</label>
                                <input type="date" name='fechacompra' 
                                    /*required*/
                                    onChange={ (e) => handleOnChange(e) }
                                    value={fechaCompra}                                    
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input type="number" name='precio' 
                                    required
                                    onChange={ (e) => handleOnChange(e) }
                                    value={precio}                                    
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select" 
                                    required
                                    onChange={ (e) => handleOnChange(e) }
                                    name= "usuario" value={usuario}>                                    
                                    <option value="">Seleccionar</option>
                                    {
                                        usuarios.map(({_id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <select className="form-select"
                                    /*required*/
                                    onChange={ (e) => handleOnChange(e) }
                                    name= "marca" value={marca}>
                                    <option value="">Seleccionar</option>
                                    {
                                        marcas.map(({_id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo Equipo</label>
                                <select className="form-select" 
                                    /*required*/
                                    onChange={ (e) => handleOnChange(e) }
                                    name= "tipo" value={tipos}>
                                    <option value="">Seleccionar</option>
                                    {
                                        tipo.map(({_id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado Equipo</label>
                                <select className="form-select" 
                                    required
                                    onChange={ (e) => handleOnChange(e) }
                                    name= "estado" value={estados}>
                                    <option value="">Seleccionar</option>
                                    {
                                        estado.map(({_id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>                                                
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className= "btn btn-primary"> Crear </button>
                        </div>
                    </div>
                </form>
        </div>
    </div>
  )
}
