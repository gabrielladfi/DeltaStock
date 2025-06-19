import { useContext, useEffect } from 'react';
import { useServicesGet } from '../../../../Hooks/useServicesGet';
import './tablecolindantes.scss'
import { GlobalState } from '../../../../Context/GlobalContext';
import { useServiceDelete } from '../../../../Hooks/useServiceDelete';
import { XMarkIcon } from '@heroicons/react/24/outline';

function TableColindantes() {

    const {listadoVecinos } = useContext(GlobalState);
    const { fetchListadoVecinosNumeroRadicacion, fetchInformacionDeRadicacion } = useServicesGet();
    const { fetchEliminarVecinoPorId } = useServiceDelete();

    const numeroDeradicacion = localStorage.getItem('numeroRadicacionLocalStorage');

    useEffect(() => {
        fetchInformacionDeRadicacion(numeroDeradicacion)
    },[numeroDeradicacion])


    useEffect(() => {
        fetchListadoVecinosNumeroRadicacion(numeroDeradicacion);
    }
    , [numeroDeradicacion]);

    console.log('listadoVecinos:', listadoVecinos);

    async function handleEliminarVecino(idVecino){
      await  fetchEliminarVecinoPorId(idVecino);
      fetchListadoVecinosNumeroRadicacion(numeroDeradicacion);
    }

    return (

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
                            <div key={index} className='tablecolindantesNew__table__tbody__tr'>
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
                                    <button onClick={() => handleEliminarVecino(vecino.id)} className='tablecolindantesNew__table__tbody__tr__p--delete__button'>
                                        <XMarkIcon className='tablecolindantesNew__table__tbody__tr__p--delete__button__icon' />
                                        <p className='tablecolindantesNew__table__tbody__tr__p--delete__button__p'>Eliminar Vecino Colindante</p>
                                    </button>
                                </p>
                            </div>
                        ))}

                    </article>
                </section>
       
        
    )
}

export default TableColindantes
