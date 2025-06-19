import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFetchDeleteTitularId } from '../../Hooks/useFetchDeleteTitularId';
import { useFetchGetListadoTitulares } from '../../Hooks/useFetchGetListadoTitulares';
import './tablalistadotitularespornumeroradicacion.scss'

function TablaListadoTitularesPorNumeroRadicacion() {

    
    const { listadoTitulares } = useFetchGetListadoTitulares();
    const { fetchDeleteTitularId } = useFetchDeleteTitularId();

    

   
    console.log(listadoTitulares)
    

    return (
        <div className='tablalistadotitularespornumeroradicacion'>
            <table className='tablalistadotitularespornumeroradicacion__table'>
                <thead className='tablalistadotitularespornumeroradicacion__table__thead'>
                    <tr className='tablalistadotitularespornumeroradicacion__table__thead__tr'>
                        <th className='tablalistadotitularespornumeroradicacion__table__thead__tr__th'>Nombre</th>
                        <th className='tablalistadotitularespornumeroradicacion__table__thead__tr__th'>Email</th>
                        <th className='tablalistadotitularespornumeroradicacion__table__thead__tr__th'>Telefono</th>
                        <th className='tablalistadotitularespornumeroradicacion__table__thead__tr__th'>DNI</th>
                        <th className='tablalistadotitularespornumeroradicacion__table__thead__tr__th'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='tablalistadotitularespornumeroradicacion__table__tbody'> 
                    {
                        listadoTitulares?.map((titular, index) => {
                            return (
                                <tr key={index} className='tablalistadotitularespornumeroradicacion__table__tbody__tr'>
                                    <td className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td'>{titular.nombre.toLowerCase()}</td>
                                    <td className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td'>{titular.email}</td>
                                    <td className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td'>{titular.phone}</td>
                                    <td className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td'>{titular.dni}</td>
                                    <td className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td'>
                                        <button onClick={() => fetchDeleteTitularId(titular.id)} className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td__button'>
                                            <XMarkIcon className='tablalistadotitularespornumeroradicacion__table__tbody__tr__td__button__icon' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }  
                </tbody>
            </table>
        </div>
    )
}

export default TablaListadoTitularesPorNumeroRadicacion
