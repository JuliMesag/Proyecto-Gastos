import React from 'react'
import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
          setModal(false)  
        }, 300);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')){
           setMensaje('Todos los campos son obligatorios')

           setTimeout(() => {
               setMensaje('')
           }, 3000);
           return
        }else{
            guardarGasto({nombre, cantidad, categoria, id, fecha})
        }
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarBtn} alt="boton cerrar" onClick={ocultarModal}/>
        </div>

        <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
              onSubmit={handleSubmit}>
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre del gasto</label>

                <input 
                    id='nombre' 
                    type="text" 
                    placeholder='Añade el Nombre del Gasto' 
                    value={nombre} 
                    onChange={e => setNombre(e.target.value)}/>
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id='cantidad' 
                    type="number" 
                    placeholder='Añade la cantidad del gasto: ej. 30000'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    />
                    
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Categoria</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}>

                    <option value="">-- Seleccionar --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciónes</option>
                    <option value="otros">Otros</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form>
    </div>
  )
}

export default Modal
