/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { GlobalState } from '../../Context/GlobalContext';
import './tablalistadoradicaciones.scss'
import '../../Sass/globalSass.scss'
import { useFetchGet } from '@/Hooks/useFetchGet';
import { AuthContextState } from '@/Context/AuthContextContext';
import { urlBase, urlGetAllOficiosVentanilla } from '@/Utils/UrlData';
import { adapterListadoOficios } from '@/Adapters/adapterListadoOficios';




//Props que recive el componente
// propNavegacion: Función que permite navegar a la página de detalles del predio

// Componente funcional que muestra el listado de radicaciones en una tabla
function TablaListadoOficios() {

    const { token } = useContext(AuthContextState);

    // Obtener el estado global y las funciones del contexto
    const { valorParaFiltrar } = useContext(GlobalState);
    

    const { dataGet } = useFetchGet(token, `${urlBase}${urlGetAllOficiosVentanilla}`, '');

    const dateGetAdapter = adapterListadoOficios(dataGet);

    console.log(dateGetAdapter);

    // Filtrar el listado de predios basado en el valorParaFiltrar
    const listadoOficiosFiltrado = dateGetAdapter.filter((item) => {
        return(
            item.numeroRadicacion.includes(valorParaFiltrar) ||
            item.fecha.includes(valorParaFiltrar) || 
            item.nombreSolicitante.includes(valorParaFiltrar) ||
            item.numeroOficio.includes(valorParaFiltrar)
        );
        
    });


    return (
        
        <div className='tablabuscador-div-tabla tabla-listado'>
                <table className='global-tabla '>
                    <thead className='global-tabla__thead tabla-listado-th'>
                        <tr className='global-tabla__thead__tr'>
                            <th className='global-tabla__thead__tr__th-one tabla-min-listados'>Número de Oficio</th>
                            <th className='global-tabla__thead__tr__th-one tabla-min-listados'>Expediente</th>
                            <th className='global-tabla__thead__tr__th-three tabla-min-listados'>Nombre Solicitante</th>
                            <th className='global-tabla__thead__tr__th-three tabla-min-listados'>Recibo/Salida</th>
                            <th className='global-tabla__thead__tr__th-three tabla-min-listados'>Fecha de Oficio</th>
                            <th className='global-tabla__thead__tr__th-three tabla-min-listados'>Asunto</th>
                            <th className='global-tabla__thead__tr__th-three tabla-min-listados'>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody className='global-tabla__tbody'>
                        {
                            !valorParaFiltrar.length > 0 ?
                            dateGetAdapter?.map((item, index) => {
                                return (
                                    <tr className='global-tabla__tbody__tr' key={index}>
                                        <td className='global-tabla__tbody__tr__td-one'>{item.numeroOficio}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.numeroRadicacion}</td>
                                        <td className='global-tabla__tbody__tr__td-one'>{item.nombreSolicitante}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.reciboSalida}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.fecha}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.asunto}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.descripcion}</td>
                                    </tr>
                                )
                            }
                            )
                            :
                            listadoOficiosFiltrado?.map((item, index) => {
                                return (
                                    <tr className='global-tabla__tbody__tr' key={index}>
                                        <td className='global-tabla__tbody__tr__td-one'>{item.numeroOficio}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.numeroRadicacion}</td>
                                        <td className='global-tabla__tbody__tr__td-one'>{item.nombreSolicitante}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.reciboSalida}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.fecha}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.asunto}</td>
                                        <td className='global-tabla__tbody__tr__td-three'>{item.descripcion}</td>
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

export default TablaListadoOficios
