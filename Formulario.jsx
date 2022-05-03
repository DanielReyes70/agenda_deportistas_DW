import React from 'react'
import { nanoid } from 'nanoid'
import {firebase} from '../firebase'

const Formulario = () => {
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [edad, setEdad] = React.useState('')
    const [ciudad, setCiudad] = React.useState('')
    const [deporte, setDeporte] = React.useState('')
    

    const [listaDeportes, setListaDeportes] = React.useState([])
    const [id, setId] = React.useState('')
    const [modoEdicion, SetModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)


   


    

    React.useEffect(()=>{
        const obtenerDatos = async() => {
            try{
                const db = firebase.firestore()
                const data = await db.collection('agenda').get()
                const arrayData = data.docs.map(doc => (
                    {
                    id: doc.id, ...doc.data()
                    }
                ))
                //console.log(arrayData)

                setListaDeportes(arrayData)

            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos()
    })

    const guardarDeportes = async (e) => {
        e.preventDefault()

        if (!nombre.trim()) {
            setError('digite la nombre')
            return
        }

        if (!apellido.trim()) {
            setError('digite la apellido')
            return
        }

        if (!edad.trim()) {
            setError('digite la edad')
            return
        }

        if (!ciudad.trim()) {
            setError('digite la ciudad')
            return
        }

        if (!deporte.trim()) {
            setError('digite el deporte')
            return
        }

       
        try {
            const db = firebase.firestore()
            const nuevoDeportista = {
                nombreNombre: nombre,
                nombreApellido: apellido,
                nombreEdad: edad,
                nombreCiudad: ciudad,
                nombreDeporte: deporte
            }
    
            await db.collection('agenda').add(nuevoDeportista)
    
            
            setListaDeportes([
                ...listaDeportes,
                { id: nanoid(), nombreNombre: nombre, nombreApellido: apellido, nombreCiudad: ciudad, 
                    nombreEdad: edad, nombreDeporte: deporte
                 }
            ])
    
            e.target.reset()
            setNombre('')
            setApellido('')
            setEdad('')
            setCiudad('')
            setDeporte('')
            setError(null)
        
        } catch (error) {
            console.log(error)
            
        }
       
    }

    const editar = item => {
        setNombre(item.nombreNombre)
        setApellido(item.nombreApellido)
        setEdad(item.nombreEdad)
        setCiudad(item.nombreCiudad)
        setDeporte(item.nombreDeporte)
        SetModoEdicion(true)
        setId(item.id);
    }
    const editarDeportes =  async e => {
        e.preventDefault()

        if (!nombre.trim()) {
            setError('digite la nombre')
            return
        }

        if (!apellido.trim()) {
            setError('digite la apellido')
            return
        }

        if (!edad.trim()) {
            setError('digite la edad')
            return
        }

        if (!ciudad.trim()) {
            setError('digite la ciudad')
            return
        }

        if (!deporte.trim()) {
            setError('digite el deporte')
            return
        }
        try {
            const db = firebase.firestore()
            await db.collection('agenda').doc(id).update({
            nombreNombre: nombre,
            nombreApellido: apellido,
            nombreEdad: edad,
            nombreCiudad: ciudad,
            nombreDeporte: deporte
            })

            const arrayEditado = listaDeportes.map(
                item => item.id === id ? { id: id, nombreNombre: nombre, nombreApellido: apellido, nombreCiudad: ciudad, 
                    nombreEdad: edad, nombreDeporte: deporte } : item
    
            )
            setListaDeportes(arrayEditado)
            setNombre('')
            setApellido('')
            setEdad('')
            setCiudad('')
            setDeporte('')
            setId('')
            SetModoEdicion(false)
            setError(null)
        } catch (error) {
            console.log(error)
        }


       
    }

    const eliminar = async id => {
        try {
            const db = firebase.firestore()
            await db.collection('agenda').doc(id).delete()
            const aux = listaDeportes.filter(item =>item.id !== id)
            setListaDeportes(aux)
        } catch (error) {
            console.log(error)
            
        }
        
    }

    const cancelar = () => {
        SetModoEdicion(false)
        setNombre('')
        setId('')
        setApellido('')
        setEdad('')
        setCiudad('')
        setDeporte('')
        setError(null)
    }


    return (
        <div className='container mt-5'>
            <h1 className='text-center'>AGENDA</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Listado de deportistas</h4>
                    <ul className='list-group'>

                        {
                            listaDeportes.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>
                                        <img className='imagenAleatoria' src= 'https://picsum.photos/seed/237/200/300?random=1' alt = "imagenRandom"/><br/>
                                        Nombre: {item.nombreNombre}<br/>
                                    Apellido: {item.nombreApellido}<br/>
                                    Edad: {item.nombreEdad}<br/>
                                    Ciudad: {item.nombreCiudad}<br/>
                                    Deporte: {item.nombreDeporte}<br/>
                                    </span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                    <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>
                                        Editar
                                    </button>

                                </li>

                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar deportistas' : 'Agregar deportistas'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarDeportes : guardarDeportes}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese nombre'
                            onChange={(e) => setNombre(e.target.value)}
                            value={nombre}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese apellido'
                            type="text"
                            onChange={(e) => setApellido(e.target.value)}
                            value={apellido}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese edad'
                            onChange={(e) => setEdad(e.target.value)}
                            value={edad}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese ciudad'
                            onChange={(e) => setCiudad(e.target.value)}
                            value={ciudad}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese el deporte'
                            onChange={(e) => setDeporte(e.target.value)}
                            value={deporte}
                        />
                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className='btn btn-warning btn-block'
                                            type='submit'
                                        >Editar</button>
                                        <button
                                            className='btn btn-dark btn-block mx-2'
                                            onClick={() => cancelar()}
                                        >Cancelar
                                        </button>
                                    </>
                                )
                                :
                                <button
                                    className='btn btn-primary btn-block'
                                    type='submit'
                                >Agregar</button>

                        }

                    </form>

                </div>
            </div>




        </div>
    )
}

export default Formulario