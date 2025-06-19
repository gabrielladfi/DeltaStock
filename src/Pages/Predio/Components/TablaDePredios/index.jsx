import { useContext, useEffect } from 'react'
import './tabladepredios.scss'
import { GlobalState } from '../../../../Context/GlobalContext';
import { useServicesGet } from '../../../../Hooks/useServicesGet';
import { useServiceDelete } from '../../../../Hooks/useServiceDelete';
import { useNavigateProvider } from '../../../../Hooks/useNavigateProvider';
import '../../../../Sass/globalSass.scss';
import { XMarkIcon } from '@heroicons/react/24/outline';

function TablaDePredios() {

    const { prediosAsociadosNumeroRadicacion, valorParaFiltrar, globalNumeroRadicacion, setDataTramite, setDataPredioCreacion } = useContext(GlobalState);
    const { fetchPrediosAsociadosNumeroRadicacion } = useServicesGet();
    const { fetchEliminarPredioPorId } = useServiceDelete();
    const { navigateToInformacionPredio } = useNavigateProvider();
    
    useEffect(() => {
        fetchPrediosAsociadosNumeroRadicacion(globalNumeroRadicacion);
    }, []);

    console.log('listado de predios:', prediosAsociadosNumeroRadicacion);
    console.log('valor para filtrar:', valorParaFiltrar);

    async function eliminarPredio(e, idPredio) {
        e.stopPropagation();
        await fetchEliminarPredioPorId(idPredio);
        fetchPrediosAsociadosNumeroRadicacion(globalNumeroRadicacion);
    }

    function handleVerInformacionPredio(e, requisito) {
        e.stopPropagation();
        console.log(requisito)
        setDataPredioCreacion(requisito);
        setDataTramite(requisito);
        navigateToInformacionPredio();
    }

    

    return (
        <div className='tablaprediosnew'>
            <table className='tablaprediosnew__table'>
                <thead className='tablaprediosnew__table__thead'>
                    <tr className='tablaprediosnew__table__thead__tr'>
                        <th className='tablaprediosnew__table__thead__tr__th'>Direccion Actual</th>
                        <th className='tablaprediosnew__table__thead__tr__th'>Ver más</th>
                        <th className='tablaprediosnew__table__thead__tr__th'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='tablaprediosnew__table__tbody'>
                    {
                        
                        prediosAsociadosNumeroRadicacion?.map((item, index) => {
                            return (
                                <tr className='tablaprediosnew__table__tbody__tr' key={index}>
                                    <td className='tablaprediosnew__table__tbody__tr__td'>{item.direccion_actual}</td>
                                    <td className='tablaprediosnew__table__tbody__tr__td'>
                                        <button onClick={(e) => handleVerInformacionPredio(e, item)} className='tablaprediosnew__table__tbody__tr__td__button-ver-mas'>Ver más</button>
                                    </td>
                                    <td className='tablaprediosnew__table__tbody__tr__td'>
                                        <button onClick={(e) => eliminarPredio(e, item.id)} className='tablaprediosnew__table__tbody__tr__td__button-eliminar'>
                                            <XMarkIcon className='tablaprediosnew__table__tbody__tr__td__button-eliminar__icon' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )
                        
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TablaDePredios
