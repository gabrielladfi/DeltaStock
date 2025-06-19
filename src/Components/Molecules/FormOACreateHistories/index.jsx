import SectionCloserFormsModal from '@/Components/SectionCloserFormsModal'
import './formoacreatehistories.scss'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import PrimaryButton from '@/Components/PrimaryButton'
import { useContext, useState } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import { getDataUser, getOtherAct } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { 
    SubEtapasHistoriasNoAplica,
    SubEtapasRadicacion, 
    SubEtapasHistoriasPrimeraRevision, 
    SubEtapasActaObservacionesRequerimientos, 
    SubEtapasSegundaRevision, 
    SubEtapasViabilidadLiquidaciones, 
    SubEtapasFirmaNotificacion, 
    SubEtapasEjecutoriado 
    
    
} from '../../../Utils/SubEtapasHistorias';
import { encargadosCuraduriaData } from '../../../Utils/encargadosCuraduriaData';
import { useServicePost } from '@/Api/useServicePost'
import { AuthContextState } from '@/Context/AuthContextContext'
import ModalBasicNew from '../ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import PickList from '../PickList'
import PrimaryTextArea from '../PrimaryTextArea'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function FormOACreateHistories() {

    const { token } = useContext(AuthContextState);

    const { setOpenModalNewHistoryOtherActs, setReloadGlobal } = useContext(GlobalState);

    const userData = getDataUser();
    const user = userData;

    const dataSessionStorage = getOtherAct();
    const oaNumeroRadicacion = dataSessionStorage.numero_radicacion;

    const dataInicialNuevaHistoria = {
        "numero_radicacion": oaNumeroRadicacion,
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

    const [ dataFetchNuevaHistoria, setDataFetchNuevaHistoria ] = useState(dataInicialNuevaHistoria);

    
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

    const { executePost } = useServicePost();

    const handleCrearNuevaHistoria = async () => {
        await executePost(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/historias/`, dataFetchNuevaHistoria);
        setReloadGlobal(true);
        setDataFetchNuevaHistoria(dataInicialNuevaHistoria);
    }

    console.log(dataFetchNuevaHistoria)

    return (
        <ModalBasicNew title='Agregar Nueva Historia' propFunctionCloseModal={() => setOpenModalNewHistoryOtherActs(false)}>
            <BoxContainerInputsByInfoBigScroll>
                <PrimaryInputDate 
                    label='Fecha de Entrega'
                    onChangeFn={handleNuevaObservacionFecha}
                    value={getFormattedDate(dataFetchNuevaHistoria.fecha_entrada)}
                    className={'input-base__input agregarrequisito--input'}
                    name='fecha_entrada'
                    blockWriteInput={false}
                />

                <PickList 
                    label='Etapa'
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
                    onChange={handleGetDataInputsNuevaHistoria}
                    value={dataFetchNuevaHistoria.etapa || ''}
                    name='etapa'
                    optionSelected='Selecciona etapa del tramite'
                />

<div className='picklist'>
                               <label className='picklist__label' htmlFor="">Subetapa</label>
                               <div className='picklist__div'>
                                    <ChevronDownIcon className="picklist__div__icon" />
                               <select 
                                   onChange={handleGetDataInputsNuevaHistoria || ''}
                                   value={dataFetchNuevaHistoria.subetapa || ''}
                                   className='picklist__div__select'
                                   name="subetapa"
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

                <PickList
                    label='Responsable'
                    options={encargadosCuraduriaData}
                    onChange={handleGetDataInputsNuevaHistoria}
                    value={dataFetchNuevaHistoria.responsable || ''}
                    name='responsable'
                    optionSelected='Selecciona responsable'
                />
                <PrimaryTextArea
                    labelText='Nota'
                    propValue={dataFetchNuevaHistoria.notas || ''}
                    propFnInput={handleGetDataInputsNuevaHistoria}
                    propName='notas'
                />
                {/*<div className='form-oa-create-histories__section-inputs__input-container'>
                    <label className='input-base__label' htmlFor="">Etapa</label>
                    <select 
                        onChange={handleGetDataInputsNuevaHistoria}
                        value={dataFetchNuevaHistoria.etapa || ''}
                        className='input-base__select agregarrequisito--input form-oa-create-histories__section-inputs__input-container__select' 
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
           
           
           
               
               

                           
                           {/*<div className='form-oa-create-histories__section-inputs__input-container'>
                               <label className='input-base__label' htmlFor="">Responsable</label>
                               <select 
                                   onChange={handleGetDataInputsNuevaHistoria}
                                   value={dataFetchNuevaHistoria.responsable || ''}
                                   className='input-base__select agregarrequisito--input form-oa-create-histories__section-inputs__input-container__select' 
                                   name='responsable'
                               >
                                   <option selected value="">Seleccione Responsable</option>
                                   { 
                                       encargadosCuraduriaData.map((encargado) => (
                                           <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                                       ))
                                   }
                               </select>
                           </div>*/}
           {/*<section className='form-oa-create-histories__section-textarea'>
               <div className='agregarrequisito--form-div agregarObservacion--form-div-textarea'>
                   <label className='input-base__label' htmlFor="">Nota</label>
                   <textarea
                       onChange={handleGetDataInputsNuevaHistoria}
                       value={dataFetchNuevaHistoria.notas || ''}
                       className='agregarHistoria--form-div-textarea__textarea' 
                       type="text"
                       name='notas'
                   />
               </div>

           </section>*/}
                
            </BoxContainerInputsByInfoBigScroll>
            
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall onClick={handleCrearNuevaHistoria} text={'Guardar Historia'} />
            </ContainerButtonsBackandNext>
        </ModalBasicNew>
            
    )
}

export default FormOACreateHistories
