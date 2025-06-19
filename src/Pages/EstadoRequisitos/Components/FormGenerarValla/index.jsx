import { useContext, useEffect, useRef, useState } from 'react';
import { useServicesGet } from '../../../../Hooks/useServicesGet';
import { GlobalState } from '../../../../Context/GlobalContext';
import { EstadoRequisitosContextState } from '../../Context/EstadoRequisitosContextContext';
import { useServicesPost } from '../../../../Hooks/useServicesPost';
import { downloadFileFromPath } from '@/Utils/functions';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '../../../../Components/Modal';
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification';
import success from '@/assets/checkLogo.svg'
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryInputNumberValidator from '@/Components/Atoms/PrimaryInputNumberValidator';
import error from '@/assets/warninglogo.svg'
import './formgenararvalla.scss'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import BoxContainerInputsByInfoBig from '@/Components/Atoms/BoxContainerInputsByInfoBig';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk';
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError';

function FormGenararValla() {

    const numeroRadicacion = localStorage.getItem('numeroRadicacionLocalStorage');

    const { informacionRadicacion, setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState)
    const { fetchInformacionDeRadicacion } = useServicesGet();
    const { fetchPostObtenerIdVecinos, fetchPostObtenerValla } = useServicesPost();
    const { setGenerarValla } = useContext(EstadoRequisitosContextState);
    const [ vallaGenerada, setVallaGenerada ] = useState(false);
    const [ errorCamposVacios, setErrorCamposVacios ] = useState(false);

    useEffect(() => {
        fetchInformacionDeRadicacion(numeroRadicacion);
    }
    , []);

    const objetoInformacionRadicacion = informacionRadicacion?.[0] || {};

    const tramiteIniciado = useRef(true);

    function handleCloseFormGenerarValla() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            setGenerarValla(false);
        }
    }

    useEffect(() => {
        const objetoNumeroRadicacion = {
            numero_radicacion: numeroRadicacion
        }
        if(numeroRadicacion) {
            fetchPostObtenerIdVecinos(objetoNumeroRadicacion);
        }
    }, [])


    const dataInicialValla = {
        num_radicacion: numeroRadicacion,
        num_pisos: "",
        num_unidades: "",
        descripcion_proyecto: "",
    }

    function validatorInputVacio(data) {
        const { num_pisos, num_unidades, descripcion_proyecto } = data;
        if(num_pisos === '' || num_unidades === '' || descripcion_proyecto === '') {
            return true;
        }
        return false;
    }

    const [ dataValla, setDataValla ] = useState(dataInicialValla);

    function handleObtenerDataInpuValla({ target }) {
        const { name, value } = target;
        setDataValla({
            ...dataValla,
            [name]: value
        })
    }

    async function handleGenerarValla() {
        try {
            const respuesta = await fetchPostObtenerValla(dataValla);
            if(validatorInputVacio(dataValla)) {
                setErrorCamposVacios(true);
                return;
            }
            if(respuesta) {
                setVallaGenerada(true);
                downloadFileFromPath(respuesta.file_path);
                
            }else {
                console.log('No se ha podido generar la valla')
            }
            setDataValla({
                num_radicacion: numeroRadicacion,
                num_pisos: "",
                num_unidades: "",
                descripcion_proyecto: "",
            })

        } catch (error) {
            console.error('Error al generar la valla:', error);
        }  
    }

    function handleCerrarModalVallaGenerada() {
        setVallaGenerada(false);
        setGenerarValla(false);
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)

    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        setGenerarValla(false);
    }

    function addSpaceAfterComma(text) {
        return text.replace(/,(?!\s)/g, ', ');
    }

    return (
        <>
        <ModalBasicNew title='Generar Valla' propFunctionCloseModal={handleCloseFormGenerarValla}>
            <BoxContainerInputsByInfoBig>
                <ContainerTetxtPlain title={'Nombre Solicitante'} text={objetoInformacionRadicacion.nombre_solicitante} />
                <ContainerTetxtPlain title={'Tipo de Tramite'} text={addSpaceAfterComma(objetoInformacionRadicacion.descripcion_tramite)} />
                <ContainerTetxtPlain title={'Usos'} text={objetoInformacionRadicacion.usos === null ? 'sin registro' : objetoInformacionRadicacion.usos} />
            </BoxContainerInputsByInfoBig>
            <BoxContainerInputsByInfoBigScroll>
                <PrimaryInputNumberValidator 
                    value={dataValla.num_pisos || ''}
                    name={'num_pisos'}
                    onChange={handleObtenerDataInpuValla}
                    placeholder={'Ingrese numero de pisos'}
                    className={'input-base__input form-generar-valla-input'}
                    textLabel={'Numero de Pisos *'}
                    classNameLabel={'input-base__label'}
                    classNameContainer='input-base'
                    classNameError={'primary-validator-error-span'}
                    maxLength={3}
                />
                <PrimaryInputNumberValidator 
                        value={dataValla.num_unidades || ''}
                        name={'num_unidades'}
                        onChange={handleObtenerDataInpuValla}
                        placeholder={'Ingrese numero de unidades'}
                        className={'input-base__input form-generar-valla-input'}
                        textLabel={'Numero de Unidades *'}
                        classNameLabel={'input-base__label'}
                        classNameContainer='input-base'
                        classNameError={'primary-validator-error-span'}
                        maxLength={4}
                />
                <div className='historias-textarea'>
                    <label className='historias-textarea__label' htmlFor="">Descripción del Proyecto *</label>
                    <textarea
                        onChange={handleObtenerDataInpuValla}
                        value={dataValla.descripcion_proyecto || ''}
                        className='historias-textarea__textarea' 
                        type="text"
                        name='descripcion_proyecto'
                        placeholder='Ingrese descripción del proyecto'
                    />
                </div>

            </BoxContainerInputsByInfoBigScroll>

            

            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Generar Valla' onClick={handleGenerarValla} />
            </ContainerButtonsBackandNext>
            
       

        </ModalBasicNew>
        
        {
            vallaGenerada &&
            <Modal>
                <BoxAlertNotificationOk 
                    message={`La valla para el numero de radicacion: ${numeroRadicacion} se a generado con exito`}
                    onClick={handleCerrarModalVallaGenerada}
                    textButton2={'Cerrar'}
                />
            </Modal> 
        }

        {
            errorCamposVacios &&
            <Modal>
                <BoxAlertNotificationError
                    message={`Para generar la valla es necesario llenar todos los campos del formulario`}
                    onClick={() => setErrorCamposVacios(false)}
                    textButton2={'Cerrar'}
                />
            </Modal>
        }

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

export default FormGenararValla
