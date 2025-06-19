import { useContext, useEffect, useRef, useState } from 'react';
import './formulariocrearnuevaobservacion.scss'
import '../../../../Sass/globalSass.scss'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HistoriasState } from '../../Context/HistoriaContext';
import { getDataUser, getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import { useFetchPost } from '../../../../Hooks/useFetchPost';
import { AuthContextState } from '../../../../Context/AuthContextContext';
import { urlBase, urlPostNuevaHistoria } from '../../../../Utils/UrlData';
import { encargadosCuraduriaData } from '../../../../Utils/encargadosCuraduriaData';
import { 
    SubEtapasHistoriasNoAplica,
    SubEtapasRadicacion, 
    SubEtapasHistoriasPrimeraRevision, 
    SubEtapasActaObservacionesRequerimientos, 
    SubEtapasSegundaRevision, 
    SubEtapasViabilidadLiquidaciones, 
    SubEtapasFirmaNotificacion, 
    SubEtapasEjecutoriado 
    
    
} from '../../../../Utils/SubEtapasHistorias';
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import Modal from '@/Components/Modal';
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import { GlobalState } from '@/Context/GlobalContext';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import PickList from '@/Components/Molecules/PickList';
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk';


function FormularioCrearNuevaHistoria() {

    const user = getDataUser();

    console.log(user)

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);

    const tramiteIniciado = useRef(true);
    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState)

    const [ addNewHistoryOpen, setAddNewHistoryOpen ] = useState(false);
    

    const { handleCloseFormularioNuevaHistoria, refetchGet, setCrearNuevaHistoria } = useContext(HistoriasState);

    // Estado inicial de la nueva historia
    const dataInicialNuevaHistoria = {
            "numero_radicacion": numeroRadicacion,
            "etapa": "",
            "subetapa": "",
            "responsable": "",
            "fecha_entrada": "",
            "fecha_salida": null,
            "iniciado_por": user.email,
            "finalizado_por": null,
            "reinventado_por": null,
            "dias": '45',
            "notas": null
    }

    const [ dataFetchNuevaHistoria, setDataFetchNuevaHistoria ] = useState(dataInicialNuevaHistoria); // Estado para manejar los datos de la nueva observación


    // Función para manejar los cambios en los inputs
    function handleGetDataInputsNuevaHistoria({ target}) {
        const { name, value } = target;
        setDataFetchNuevaHistoria({
            ...dataFetchNuevaHistoria,
            [name]: value
        })
    }

    // Función para manejar la fecha de la nueva observación
    function handleNuevaObservacionFecha(event) {
        const { name, value } = event.target;
        setDataFetchNuevaHistoria((prev) => ({
            ...prev,
            [name]: `${value}T00:00:00Z`, // Reemplazar el valor existente
        }));
    }

    // Función para obtener la fecha formateada para poder mostrar en el input
    function getFormattedDate(value) {
        // Si el valor es una cadena concatenada por comas, toma la primera parte
        const firstDate = value.split(',')[0]; // Tomar la primera fecha
        return firstDate ? firstDate.split('T')[0] : ''; // Convertir a 'YYYY-MM-DD'
    }

    const { fetchPost } = useFetchPost(token, `${urlBase}${urlPostNuevaHistoria}`, dataFetchNuevaHistoria);

    console.log(dataFetchNuevaHistoria)

    const handleCrearNuevaHistoria = async () => {
        await fetchPost(refetchGet)
        //setCrearNuevaHistoria(false)
        setAddNewHistoryOpen(true)  
        setDataFetchNuevaHistoria(dataInicialNuevaHistoria)
    }

    function handleCloseFormularioNuevaHistoriaValidator() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            handleCloseFormularioNuevaHistoria();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        handleCloseFormularioNuevaHistoria();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }

    useEffect(() => {
        return () => {
            setDataFetchNuevaHistoria(dataInicialNuevaHistoria)
        }
    }, [])  

    return (
        <ModalBasicNew title={'Nueva Historia'} propFunctionCloseModal={handleCloseFormularioNuevaHistoriaValidator} >
            <BoxContainerInputsByInfoBigScroll>
                       
                <PrimaryInputDate 
                    label='Fecha de Entrega *'
                    className={'input-base__input agregarrequisito--input'}
                    value={getFormattedDate(dataFetchNuevaHistoria.fecha_entrada)}
                    onChangeFn={handleNuevaObservacionFecha}
                    name='fecha_entrada'
                    blockWriteInput={true}
                />
                {/*a eliminar<input 
                    onChange={handleNuevaObservacionFecha}
                    value={getFormattedDate(dataFetchNuevaHistoria.fecha_entrada)}
                    className='input-base__input agregarrequisito--input' 
                    type="date" 
                    name='fecha_entrada'
                />*/}

                <PickList 
                    label='Etapa *'
                    options={[
                        {
                            option: 'Radicación',
                            value: 'radicacion'
                        },
                        {
                            option: 'Primera Revisión',
                            value: 'primera revision'
                        },
                        {
                            option: 'Requerimientos',
                            value: 'requerimientos'
                        },
                        {
                            option: 'Segunda Revisión',
                            value: 'segunda revision'
                        },
                        {
                            option: 'Pendiente Pagos',
                            value: 'pendiente pagos'
                        },
                        {
                            option: 'Firma y Notificación',
                            value: 'firma y notificacion'
                        },
                        {
                            option: 'Ejecutariado',
                            value: 'ejecutariado'
                        },
                        {
                            option: 'No Aplica',
                            value: 'na'
                        }
                    ]}
                    optionSelected='Selecciona etapa del tramite'
                    onChange={handleGetDataInputsNuevaHistoria}
                    value={dataFetchNuevaHistoria.etapa || ''} 
                    name='etapa'
                    placeholder='Selecciona etapa del tramite'
                    className='input-base__select agregarrequisito--input'
                />

                {/*<div className='agregarrequisito--form-div'>
                    <label className='input-base__label' htmlFor="">Etapa *</label>
                    <select 
                        onChange={handleGetDataInputsNuevaHistoria}
                        value={dataFetchNuevaHistoria.etapa || ''}
                        className='input-base__select agregarrequisito--input' 
                        name='etapa'
                    >
                        <option selected value="">Selecciona etapa del tramite</option>
                        <option value="radicacion">Radicación</option>
                        <option value="primera revision">Primera Revisión</option>
                        <option value="requerimientos">Requerimientos</option>
                        <option value="segunda revision">Segunda Revisión</option>
                        <option value="pendiente pagos">Pendiente Pagos</option>
                        <option value="firma y notificacion">Firma y Notificación</option>
                        <option value="ejecutariado">Ejecutariado</option>
                        <option value="na">No Aplica</option>
                    </select>
                </div>*/}


                <div className='picklist'>
                    <label className='picklist__label' htmlFor="">Subetapa *</label>
                    <div className='picklist__div'>
                    <ChevronDownIcon className="picklist__div__icon" />
                    <select 
                        onChange={handleGetDataInputsNuevaHistoria || ''}
                        value={dataFetchNuevaHistoria.subetapa || ''}
                        className='picklist__div__select'
                        name="subetapa"
                        placeholder='Selecciona subetapa del tramite'
                    >
                        {
                            dataFetchNuevaHistoria.etapa === '' &&
                                <option selected value="">Selecciona etapa primero</option>
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'radicacion' &&
                                SubEtapasRadicacion.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'primera revision' &&
                                SubEtapasHistoriasPrimeraRevision.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'requerimientos' &&
                                SubEtapasActaObservacionesRequerimientos.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'segunda revision' &&
                                SubEtapasSegundaRevision.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'pendiente pagos' &&
                                SubEtapasViabilidadLiquidaciones.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'firma y notificacion' &&
                                SubEtapasFirmaNotificacion.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'ejecutariado' &&
                                SubEtapasEjecutoriado.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                        {
                            dataFetchNuevaHistoria.etapa === 'na' &&
                                SubEtapasHistoriasNoAplica.map((subetapa) => (
                                    <option key={subetapa.nombre} value={subetapa.nombre}>{subetapa.nombre}</option>
                                ))
                        }
                    </select>

                    </div>
                    
                    
                </div>

                            <div className='picklist'>
                                <label className='picklist__label' htmlFor="">Responsable *</label>
                                <div className='picklist__div'>
                                    <select 
                                        onChange={handleGetDataInputsNuevaHistoria}
                                        value={dataFetchNuevaHistoria.responsable || ''}
                                        className='picklist__div__select' 
                                        name='responsable'
                                    >
                                        <option selected value="">Seleccione Responsable</option>
                                        { 
                                            encargadosCuraduriaData.map((encargado) => (
                                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                                            ))
                                        }
                                    </select>
                                    <ChevronDownIcon className="picklist__div__icon" />
                                </div>
                                
                            </div>

                            <div className='historias-textarea'>
                                <label className='historias-textarea__label' htmlFor="">Nota</label>
                                <textarea
                                    onChange={handleGetDataInputsNuevaHistoria}
                                    value={dataFetchNuevaHistoria.notas || ''}
                                    className='historias-textarea__textarea' 
                                    type="text"
                                    name='notas'
                                />
                            </div>

                        
           
            </BoxContainerInputsByInfoBigScroll>
           

            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text={'Crear Historia'} onClick={handleCrearNuevaHistoria} />
            </ContainerButtonsBackandNext>

            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se guardara la liquidacion."   
                            alt="Imagen de alerta"
                            onClick={handleAbandonarProcesoModal}
                            textButton="Abandonar"
                            textButton2="Cancelar"
                            onClickCancel={handleCancelar}
                            image={warning}
                        />
                    </Modal>
                )
            }
            {
                addNewHistoryOpen && (
                    <Modal>
                        <BoxAlertNotificationOk
                            message={`La historia se ha creado con exito para la radicacion numero: ${numeroRadicacion}`}   
                            onClick={() => setAddNewHistoryOpen(false)}
                            textButton2="Cerrar"
                        />
                    </Modal>
                )
            }
        

        </ModalBasicNew>
        
    )
}

export default FormularioCrearNuevaHistoria
