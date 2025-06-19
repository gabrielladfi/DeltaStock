import './agregarnuevorequisito.scss'
import '../../../../Sass/globalSass.scss'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useRef } from 'react'
import { EstadoRequisitosContextState } from '../../Context/EstadoRequisitosContextContext'
import { useServicesPost } from '../../../../Hooks/useServicesPost'
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import PrimaryButton from '@/Components/PrimaryButton'
import { GlobalState } from '@/Context/GlobalContext'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '@/Components/Molecules/PickList'

function AgregarNuevoRequisito() {

    const { setAgregarNuevoRequisito, setDataNuevoRequisito, dataNuevoRequisito, setReload } = useContext(EstadoRequisitosContextState);
    const { fetchPostCrearNuevoRequisito } = useServicesPost();
    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const numeroRadicacion = getNumeroRadicacion();

    const tramiteIniciado = useRef(true);

    function handleClose() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            setAgregarNuevoRequisito(false);
            setDataNuevoRequisito({
                "numero_radicacion": '',
                "requisito_title": '',
                "descripcion": '',
                "fecha_creacion": '',
                "ultima_modificacion": '',
                "descripcion_pendiente": '',
                "is_pending": ''
            })
        }
        
    }

    function handleInputChangeNumeroRadicacion() {
        setDataNuevoRequisito({
            ...dataNuevoRequisito,
            numero_radicacion: numeroRadicacion
        })
    }

    useEffect(() => {
        handleInputChangeNumeroRadicacion();
    }, []);

    

    function handleInputChange(target) {

        const { name, value } = target;

        setDataNuevoRequisito({
            ...dataNuevoRequisito,
            [name]: value
        })
    }

    function handleNuevoRequisitoFecha(event) {
        const { name, value } = event.target;
        setDataNuevoRequisito((prev) => ({
            ...prev,
            [name]: prev[name] // Verificar si ya hay un valor previo
                ? `${prev[name]},${value}T00:00:00Z` // Si existe, concatenar con coma
                : `${value}T00:00:00Z`, // Si no existe, asignar el nuevo valor
        }));
    }

    // Función para obtener la fecha formateada para poder mostrar en el input
    function getFormattedDate(value) {
        // Si el valor es una cadena concatenada por comas, toma la primera parte
        const firstDate = value.split(',')[0]; // Tomar la primera fecha
        return firstDate ? firstDate.split('T')[0] : ''; // Convertir a 'YYYY-MM-DD'
    }

    useEffect(() => {
        if(dataNuevoRequisito.fecha_creacion) {
            setDataNuevoRequisito({
                ...dataNuevoRequisito,
                ultima_modificacion: dataNuevoRequisito.fecha_creacion
            })
        }
    }, [dataNuevoRequisito.fecha_creacion]);


    console.log(dataNuevoRequisito);

    async function handlePostCrearNuevoRequisito() {
        try {
            await fetchPostCrearNuevoRequisito(dataNuevoRequisito);
            setReload((state) => !state);
            setAgregarNuevoRequisito(false);
            setDataNuevoRequisito({
                "numero_radicacion": '',
                "requisito_title": '',
                "descripcion": '',
                "fecha_creacion": '',
                "ultima_modificacion": '',
                "descripcion_pendiente": '',
                "is_pending": ''
            })
        } catch (error) {
            console.error("Error creando nuevo requisito:", error);
        }
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)

    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        setAgregarNuevoRequisito(false);
        setDataNuevoRequisito({
            "numero_radicacion": '',
            "requisito_title": '',
            "descripcion": '',
            "fecha_creacion": '',
            "ultima_modificacion": '',
            "descripcion_pendiente": '',
            "is_pending": ''
        })
    }
    



    return (
        <>
            <ModalBasicNew title='Agregar Requisito' propFunctionCloseModal={handleClose}>
                <BoxContainerInputsByInfoBigScroll>
                    <Input
                        textlabel='Nombre Del Requisito *'
                        placeholder='Nombre Del Requisito'
                        name='requisito_title'
                        onChange={(e) => handleInputChange(e.target)}
                        value={dataNuevoRequisito.requisito_title || ''}
                        required={true}
                    />
                    <Input
                        textlabel='Detalles Del Requisito *'
                        placeholder='Detalles Del Requisito'
                        name='descripcion'
                        onChange={(e) => handleInputChange(e.target)}
                        value={dataNuevoRequisito.descripcion || ''}
                        required={true}
                    />
                    <PrimaryInputDate 
                        label='Fecha De Creación *'
                        className={'input-base__input agregarrequisito--input'}
                        value={dataNuevoRequisito.fecha_creacion ? getFormattedDate(dataNuevoRequisito.fecha_creacion) : ''}
                        name='fecha_creacion'
                        onChangeFn={(e) => handleNuevoRequisitoFecha(e)}
                        blockWriteInput={true}
                    />
                    <Input
                        textlabel='¿Qué mostrar si el requisito está pendiente? *'
                        placeholder='¿Qué mostrar si el requisito está pendiente?'
                        name='descripcion_pendiente'
                        onChange={(e) => handleInputChange(e.target)}
                        value={dataNuevoRequisito.descripcion_pendiente || ''}
                        required={true}
                    />
                    <PickList
                        label='Estado Del Requisito *'
                        placeholder='Estado Del Requisito'
                        name='is_pending'
                        onChange={(e) => handleInputChange(e.target)}
                        value={dataNuevoRequisito.is_pending || ''}
                        options={[{
                            option: 'Pendiente',
                            value: 'true'
                        }, {
                            option: 'Completado',
                            value: 'false'
                        }]}
                        required={true}
                        optionSelected='Seleccione el estado inicial'
                    />
                </BoxContainerInputsByInfoBigScroll>
            {/*<div className='agregarnuevorequisito-container'>
                <section className='agregarnuevorequisito-container__body'>
                        <article className='agregarnuevorequisito-container__body__article'>
                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Nombre De Requisito *</label>
                                <input
                                    onChange={(e) => handleInputChange(e.target)}
                                    value={dataNuevoRequisito.requisito_title || ''}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='requisito_title'
                                />
                            </div>

                            <div className=' agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Detalles De Requisito *</label>
                                <input
                                    onChange={(e) => handleInputChange(e.target)}
                                    value={dataNuevoRequisito.descripcion || ''}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='descripcion'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Fecha *</label>
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">¿Qué debería decir la radicación si está pendiente el requisito? *</label>
                                <input
                                    onChange={(e) => handleInputChange(e.target)}
                                    value={dataNuevoRequisito.descripcion_pendiente || ''}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='descripcion_pendiente'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Estado Requisito *</label>
                                <select 
                                    onChange={(e) => handleInputChange(e.target)}
                                    value={dataNuevoRequisito.is_pending || ''}
                                    className='input-base__select agregarrequisito--input' 
                                    name='is_pending'
                                >
                                    <option selected value="">Seleccione el estado del requisito</option>
                                    <option value="true">Pendiente</option>
                                    <option value="false">Completado</option>
                                </select>
                            </div>

                        </article>
                    </section>
            </div>*/}
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Guardar Requisito' onClick={handlePostCrearNuevoRequisito} />
            </ContainerButtonsBackandNext>

            </ModalBasicNew>
            
            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, los datos ingresados no se guardarán."
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
        </>
    )
}

export default AgregarNuevoRequisito
