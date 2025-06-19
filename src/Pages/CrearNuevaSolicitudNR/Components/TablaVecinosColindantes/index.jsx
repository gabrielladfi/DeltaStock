import { useContext, useEffect } from 'react'
import './tablavecinoscolindantes.scss'
import { GlobalState } from '../../../../Context/GlobalContext';
import { useServiceDelete } from '../../../../Hooks/useServiceDelete';
import { CrearNuevaSolicitudNRState } from '../../Context/CrearNuevaSolicitudNRContext';
import { useServicesGet } from '../../../../Hooks/useServicesGet';
import '../../../../Sass/globalSass.scss'
import { XMarkIcon } from '@heroicons/react/24/outline';


function TablaVecinosColindantes() {

    const { listadoVecinos, globalNumeroRadicacion } = useContext(GlobalState);
    const { fetchEliminarVecinoPorId } = useServiceDelete();
    const { setReload, reload } = useContext(CrearNuevaSolicitudNRState);
    const { fetchListadoVecinosNumeroRadicacion } = useServicesGet()
    

    function deleteVecino(id) {   
        setReload(state => !state);
        console.log(`Vecino eliminado con id: ${id}`);
        fetchEliminarVecinoPorId(id);
        console.log(listadoVecinos)
        
    }

    useEffect(() => {  
            fetchListadoVecinosNumeroRadicacion(globalNumeroRadicacion.numero_radicacion)
        }
        ,[globalNumeroRadicacion, reload])

    return (
        <>
                <section className='tablecolindantesNew__table'>
                    <article className='tablecolindantesNew__table__thead'>
                        <div className='tablecolindantesNew__table__thead__tr'>
                            <p className='tablecolindantesNew__table__thead__tr__th--id'>ID</p>
                            <p className='tablecolindantesNew__table__thead__tr__th--name'>Nombre</p>
                            <p className='tablecolindantesNew__table__thead__tr__th'>Dirección</p>
                            <p className='tablecolindantesNew__table__thead__tr__th'>Barrio</p>
                            <th className='tablecolindantesNew__table__thead__tr__th--delete'>Eliminar</th>
                        </div>
                    </article>
                    <article className='tablecolindantesNew__table__tbody'>
                        {listadoVecinos?.map((vecino, index) => (
                            <div onClick={() => deleteVecino(vecino.id)} key={index} className='tablecolindantesNew__table__tbody__tr'>
                                <p className='tablecolindantesNew__table__tbody__tr__p--id'>
                                    <span className='tabla-vecinos-title'>ID:</span>
                                    {vecino.id}
                                </p>
                                <p className='tablecolindantesNew__table__tbody__tr__p--name'>
                                    <span className='tabla-vecinos-title'>Nombre:</span>
                                    {vecino.nombre}
                                </p>    
                                <p className='tablecolindantesNew__table__tbody__tr__p'>
                                    <span className='tabla-vecinos-title'>Dirección:</span>
                                    {vecino.direccion}
                                </p>
                                <p className='tablecolindantesNew__table__tbody__tr__p'>
                                    <span className='tabla-vecinos-title'>Barrio:</span>
                                    {vecino.barrio}
                                </p>
                                <p className='tablecolindantesNew__table__tbody__tr__p--delete'>
                                    <button className='tablecolindantesNew__table__tbody__tr__p--delete__button'>
                                        <XMarkIcon className='tablecolindantesNew__table__tbody__tr__p--delete__button__icon' />
                                        <p className='tablecolindantesNew__table__tbody__tr__p--delete__button__p'>Eliminar Vecino Colindante</p>
                                    </button>
                                </p>
                            </div>
                        ))}

                    </article>
                </section>
            
        </>
    )
}

export default TablaVecinosColindantes
