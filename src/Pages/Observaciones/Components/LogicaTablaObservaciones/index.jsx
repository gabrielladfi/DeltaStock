import { useContext, useEffect, useState } from 'react'
import { urlActualizarObservacion, urlBase, urlGetObtenerListadoObservacionesNumeroRadicacion } from '../../../../Utils/UrlData';
import TablaObservaciones from '../TablaObservaciones';
import { getDataUser, getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import { ObservacionesState } from '../../Context/ObservacionesContext';
import { useFetchGet } from '@/Hooks/useFetchGet';
import { AuthContextState } from '@/Context/AuthContextContext';
import { useFetchPut } from '@/Hooks/useFetchPut';
import { useFetchDelete } from '@/Hooks/useFetchDelete';
import { GlobalState } from '@/Context/GlobalContext';


//Container Component: Este componente se encarga de obtener el listado de observaciones por numero de radicacion
//Y de renderizar el componente: Presentational Component: TablaObservaciones
function LogicaTablaObservaciones() {

    const user = getDataUser();

    console.log(user)

    const { token } = useContext(AuthContextState);
    const numeroRadicacion = getNumeroRadicacion();
    
    const { reload, valorFiltro } = useContext(ObservacionesState);
    const [ listadoObservacionesFiltrado, setListadoObservacionesFiltrado ] = useState([]);
    const { openModalObservacionesInformacionDetallada, setOpenModalObservacionesInformacionDetallada } = useContext(GlobalState);

    //Logica para obtener el listado de observaciones por numero de radicacion

    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlGetObtenerListadoObservacionesNumeroRadicacion}`, numeroRadicacion);

    
    useEffect(() => {
        const observacionesFiltradas = dataGet?.filter((observacion) => 
            observacion.area.includes(valorFiltro)
        );
        setListadoObservacionesFiltrado(observacionesFiltradas);
    }, [valorFiltro, dataGet]);

    useEffect(() => {
        refetchGet();
    }
    , [reload]);

     //Logica para obtener el listado de observaciones por numero de radicacion

    const [ dataObservacionPut, setDataObservacionPut ] = useState(null);

    //Logica para aprobar una observacion y cambiar la fecha de aprobacion

    function handleSelectChange(observacion) {

        console.log(observacion.area)
        if(user.usertype === 'admin'){
            const fechaActual = new Date();
            const anio = fechaActual.getUTCFullYear();
            const mes = String(fechaActual.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
            const dia = String(fechaActual.getUTCDate()).padStart(2, '0');
            const fechaFormateada = `${anio}-${mes}-${dia}T00:00:00Z`;

            setDataObservacionPut({
                ...observacion,
                aprobado: true,
                fecha_aprobado: fechaFormateada,
                estado: 'aprobó'
                
            });

        }else {
            if(user.usertype !== observacion.area) {
                alert('no tienes permisos para aprobar esta observacion')
            }else {
                const fechaActual = new Date();
                const anio = fechaActual.getUTCFullYear();
                const mes = String(fechaActual.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
                const dia = String(fechaActual.getUTCDate()).padStart(2, '0');
                const fechaFormateada = `${anio}-${mes}-${dia}T00:00:00Z`;
    
                setDataObservacionPut({
                    ...observacion,
                    aprobado: true,
                    fecha_aprobado: fechaFormateada,
                    estado: 'aprobó'
                    
                });
    
            }
        }
    }

    function handleSelectChangePendiente(observacion) {

        if(user.usertype === 'admin'){

            setDataObservacionPut({
                ...observacion,
                aprobado: false,
                fecha_aprobado: null,
                estado: 'pendiente'
            });

        }else {
            if(user.usertype !== observacion.area) {
                alert('no tienes permisos para aprobar esta observacion')
            }else {

                
                setDataObservacionPut({
                    ...observacion,
                    aprobado: false,
                    fecha_aprobado: null,
                    estado: 'pendiente'
                });
    
            }
        }

        
    }

    console.log(dataObservacionPut)

    const { fetchPut } = useFetchPut(token, `${urlBase}${urlActualizarObservacion}`, dataObservacionPut);

    useEffect(() => {
        if(dataObservacionPut) {
            fetchPut(dataObservacionPut.id, refetchGet);
        }
        setDataObservacionPut(null);
    }, [dataObservacionPut]);   

    const { fetchDelete } = useFetchDelete(token, `${urlBase}${urlActualizarObservacion}`);

    function handleDeleteObservacion(observacion) {

        if(user.usertype === 'admin'){

            fetchDelete(observacion.id, refetchGet);

        }else {
            if(user.usertype !== observacion.area) {
                alert('no tienes permisos para eliminar esta observacion')
            }else {

                
                fetchDelete(observacion.id, refetchGet);
    
            }
        }
        
    }

    //Logica para aprobar una observacion y cambiar la fecha de aprobacion

    //Logica para realizar el cambio de estado de la observacion

    const { fetchPut: actualizarEstado } = useFetchPut(token, `${urlBase}${urlActualizarObservacion}`, dataObservacionPut);

    function handleChangeEstado(e, observacion) {

        const fechaActual = new Date();
        const anio = fechaActual.getUTCFullYear();
        const mes = String(fechaActual.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
        const dia = String(fechaActual.getUTCDate()).padStart(2, '0');
        const fechaFormateada = `${anio}-${mes}-${dia}T00:00:00Z`;

        if(user.usertype === 'admin'){

            if(e.target.value === 'pendiente' || e.target.value === 'resuelta' || e.target.value === 'no resuelta' || e.target.value === 'completado') {
                setDataObservacionPut({
                    ...observacion,
                    estado: e.target.value,
                    aprobado: false,
                    fecha_aprobado: null
                });
            }else if(e.target.value === 'aprobó') {
                setDataObservacionPut({
                    ...observacion,
                    estado: e.target.value,
                    aprobado: true,
                    fecha_aprobado: fechaFormateada
                });
            }

        }else {
            if(user.usertype !== observacion.area) {
                alert('no tienes permisos para cambiar el estado de esta observacion')
            }else {

                
                if(e.target.value === 'pendiente' || e.target.value === 'resuelta' || e.target.value === 'no resuelta' || e.target.value === 'completado') {
                    setDataObservacionPut({
                        ...observacion,
                        estado: e.target.value,
                        aprobado: false,
                        fecha_aprobado: null
                    });
                }else if(e.target.value === 'aprobó') {
                    setDataObservacionPut({
                        ...observacion,
                        estado: e.target.value,
                        aprobado: true,
                        fecha_aprobado: fechaFormateada
                    });
                }
    
            }
        }

        
        
        

        setOpenModalObservacionesInformacionDetallada(false);

        console.log('Cambio de estado')
    }

    useEffect(() => {
        if(dataObservacionPut) {
            actualizarEstado(dataObservacionPut.id, refetchGet);
        }
        setDataObservacionPut(null);
    }, [dataObservacionPut]);

    //Logica para realizar el cambio de estado de la observacion

   

    return <TablaObservaciones openModalObservacionesInformacionDetallada={openModalObservacionesInformacionDetallada} setOpenModalObservacionesInformacionDetallada={setOpenModalObservacionesInformacionDetallada} propListadoObservaciones={dataGet} propListadoObservacionesFiltrado={listadoObservacionesFiltrado} state={valorFiltro} propFunctionPut={handleSelectChange} propFunctionDelete={handleDeleteObservacion} propFunctionChangeEstado={handleChangeEstado} propFunctionPendiente={handleSelectChangePendiente}/>
}

export default LogicaTablaObservaciones
