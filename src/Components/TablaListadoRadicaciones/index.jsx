/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import { GlobalState } from '../../Context/GlobalContext';
import { useServicesGet } from '../../Hooks/useServicesGet';
import { setFechaRadicacion, setNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion';
import './tablalistadoradicaciones.scss'
import '../../Sass/globalSass.scss'
import { informacionExpedienteStore } from '../../Store/informacionExpedienteStore';
import { format } from 'date-fns';




//Props que recive el componente
// propNavegacion: Función que permite navegar a la página de detalles del predio

// Componente funcional que muestra el listado de radicaciones en una tabla
function TablaListadoRadicaciones({ propNavegacion }) {


    const { setInformacionRadicacion } = informacionExpedienteStore();

    // Obtener el estado global y las funciones del contexto
    const { listadoPredios, valorParaFiltrar, setGlobalNumeroRadicacion } = useContext(GlobalState);
    // Obtener la función para obtener el listado de predios del hook personalizado
    const { fetchObtenerListadoDePredios } = useServicesGet();

    // useEffect para obtener el listado de predios cuando el componente se monta
    useEffect(() => {
        fetchObtenerListadoDePredios();
    }, []);

    // Filtrar el listado de predios basado en el valorParaFiltrar
    const listadoPrediosFiltrado = listadoPredios.filter((item) => {
        return(
            item.numero_radicacion.includes(valorParaFiltrar) ||
            item.fecha.includes(valorParaFiltrar) || 
            item.nombre_solicitante.includes(valorParaFiltrar) ||
            item.email_solicitante.includes(valorParaFiltrar)
        );
        
    });

    // Función para ver la información de un predio específico
    function verInfoPredio(predio) {
        setGlobalNumeroRadicacion(predio.numero_radicacion); // Establecer el número de radicación globalmente
        setNumeroRadicacion(predio.numero_radicacion); // Guardar el número de radicación en el almacenamiento local
        propNavegacion(); // Navegar a la página de detalles del predio
        console.log(predio);
        setInformacionRadicacion(predio);
        setFechaRadicacion(predio.fecha);
    }

    console.log(listadoPredios)

    return (
                <section className='tablalistadoradicaciones '>
                    <article className='tablalistadoradicaciones__thead'>
                        <div className='tablalistadoradicaciones__thead__tr'>
                            <span className='tablalistadoradicaciones__thead__tr__th-one'>Expediente</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-two'>Interesado</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-three'>NIT</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-four'>Direcciones</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-six'>Fecha de EJ</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-seven'>Fecha de Radicacion</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-nine'>Teléfono</span>
                            <span className='tablalistadoradicaciones__thead__tr__th-ten'>Tipo de Trámite</span>
                        </div>
                    </article>
                    <article className='tablalistadoradicaciones__tbody'>
                        {
                            !valorParaFiltrar.length > 0 ?
                            listadoPredios?.slice().reverse().map((item, index) => {
                                return (
                                    <div onClick={() => verInfoPredio(item)} className='tablalistadoradicaciones__tbody__tr' key={index}>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-one'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-one__p'>Expediente:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-one__span'>{item.numero_radicacion}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-two'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-two__p'>Interesado:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-two__span'>{item.nombre_solicitante}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-three'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-three__p'>NIT:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-three__span'>{item.dni_solicitante}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-four'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-four__p'>Direcciones:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-four__span'>{item.direccion}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-six'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-six__p'>Fecha de EJ:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-six__span'>{format(new Date(item.fecha), 'dd/MM/yyyy')}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-seven'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-seven__p'>Fecha de Radicacion:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-seven__span'>{format(new Date(item.fecha), 'dd/MM/yyyy')}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-nine'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-nine__p'>Teléfono:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-nine__span'>{item.phone_solicitante}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-ten'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-ten__p'>Tipo de Trámite:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-ten__span'>{item.descripcion_tramite}</span>
                                        </span>
                                    </div>
                                )
                            }
                            )
                            :
                            listadoPrediosFiltrado?.map((item, index) => {
                                return (
                                    <div onClick={() => verInfoPredio(item)} className='tablalistadoradicaciones__tbody__tr' key={index}>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-one'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-one__p'>Expediente:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-one__span'>{item.numero_radicacion}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-two'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-two__p'>Interesado:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-two__span'>{item.nombre_solicitante}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-three'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-three__p'>NIT:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-three__span'>{item.dni_solicitante}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-four'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-four__p'>Direcciones:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-four__span'>{item.direccion}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-six'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-six__p'>Fecha de EJ:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-six__span'>{format(new Date(item.fecha), 'dd/MM/yyyy')}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-seven'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-seven__p'>Fecha de Radicacion:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-seven__span'>{format(new Date(item.fecha), 'dd/MM/yyyy')}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-nine'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-nine__p'>Teléfono:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-nine__span'>{item.phone_solicitante}</span>
                                        </span>
                                        <span className='tablalistadoradicaciones__tbody__tr__td-ten'>
                                            <p className='tablalistadoradicaciones__tbody__tr__td-ten__p'>Tipo de Trámite:</p>
                                            <span className='tablalistadoradicaciones__tbody__tr__td-ten__span'>{item.descripcion_tramite}</span>
                                        </span>
                                    </div>
                                )
                            }
                            )
                            
                        }
                    </article>
                </section>
    )
}

export default TablaListadoRadicaciones
