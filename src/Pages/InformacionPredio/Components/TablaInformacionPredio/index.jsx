import './tablainformacionpredio.scss'
import '../../../../Sass/globalSass.scss'
import { useContext, useEffect } from 'react'
import { GlobalState } from '../../../../Context/GlobalContext'
import { useServiceDelete } from '../../../../Hooks/useServiceDelete'
import { useServicesGet } from '../../../../Hooks/useServicesGet'
import { XMarkIcon } from '@heroicons/react/24/outline'

function TablaInformacionPredio() {

    const { listadoVecinos, globalNumeroRadicacion, reloadGlobal, setReloadGlobal } = useContext(GlobalState);
    const { fetchEliminarVecinoPorId } = useServiceDelete()
    const { fetchListadoVecinosNumeroRadicacion } = useServicesGet()


    console.log('listadoVecinos', listadoVecinos)

    

    

    console.log(reloadGlobal)

    async function deleteVecino(id) {  
        await fetchEliminarVecinoPorId(id); 
        setReloadGlobal(state => !state);
        console.log(`Vecino eliminado con id: ${id}`);
        console.log(listadoVecinos)
        
    }

    console.log(reloadGlobal)

    useEffect(() => {  
        if(globalNumeroRadicacion.numero_radicacion != undefined) {
            fetchListadoVecinosNumeroRadicacion(globalNumeroRadicacion.numero_radicacion)
        }else {
            fetchListadoVecinosNumeroRadicacion(globalNumeroRadicacion)
        }
        
    },[ reloadGlobal])





    return (
    
        <div className='tablecolindantesnew'>
        <table className='tablecolindantesnew__table'>
                <thead className='tablecolindantesnew__table__thead'>
                    <tr className='tablecolindantesnew__table__thead__tr'>
                        <th className='tablecolindantesnew__table__thead__tr__th'>Nombre</th>
                        <th className='tablecolindantesnew__table__thead__tr__th'>Dirección</th>
                        <th className='tablecolindantesnew__table__thead__tr__th'>Barrio</th>
                        <th className='tablecolindantesnew__table__thead__tr__th'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='tablecolindantesnew__table__tbody'>
                    {
                        listadoVecinos?.map((vecino) => (
                            <tr key={vecino.id} className='tablecolindantesnew__table__tbody__tr'>
                                <td className='tablecolindantesnew__table__tbody__tr__td'>{vecino.nombre}</td>
                                <td className='tablecolindantesnew__table__tbody__tr__td'>{vecino.direccion}</td>
                                <td className='tablecolindantesnew__table__tbody__tr__td'>{vecino.barrio}</td>
                                <td className='tablecolindantesnew__table__tbody__tr__td'>
                                    <button onClick={() => deleteVecino(vecino.id)} className='tablecolindantesnew__table__tbody__tr__td__button-eliminar'>
                                        <XMarkIcon className='tablecolindantesnew__table__tbody__tr__td__button-eliminar__icon' />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
            
    )
}

export default TablaInformacionPredio
