/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react';
import './formgenararvalla.scss'
import { useServicesGet } from '../../Hooks/useServicesGet';
import { GlobalState } from '../../Context/GlobalContext';
import { useServicesPost } from '../../Hooks/useServicesPost';
import Modal from '../Modal';
import BoxAlertNotificationleave from '../Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import ModalBasicNew from '../Molecules/ModalBasicNew';
import NumeroRadicacionFechaNR from '../Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '../Atoms/NumeroRadicacion';
import BoxContainerInputsByInfoBigScroll from '../Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '../Atoms/ContainerTetxtPlain';
import ContainerButtonsBackandNext from '../Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '../Atoms/PrimaryButtonNewSmall';
import { Input } from '../Atoms/Input/Input';
import PrimaryTextArea from '../Molecules/PrimaryTextArea';
import BoxAlertNotificationOk from '../Molecules/BoxAlertNotificationOk';

function FormGenararValla({ propFnCloser }) {

    const tramiteIniciado = useRef(true);

    const numeroRadicacion = localStorage.getItem('numeroRadicacionLocalStorage');

    const { informacionRadicacion, setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState)
    const { fetchInformacionDeRadicacion } = useServicesGet();
    const { fetchPostObtenerIdVecinos, fetchPostObtenerValla } = useServicesPost();
    const [ vallaGenerada, setVallaGenerada ] = useState(false);

    useEffect(() => {
        fetchInformacionDeRadicacion(numeroRadicacion);
    }
    , []);

    const objetoInformacionRadicacion = informacionRadicacion?.[0] || {};


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
            if(respuesta) {
                window.open(`https://apiv1.deltapro.com.co/deltacu/docs/?filename=${respuesta.file_path}`, '_blank');
                setVallaGenerada(true);
                
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
                    handleCloseModal();
    }

    function handleCloseModal() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            propFnCloser();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        propFnCloser();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }

    console.log(dataValla);

    

    return (
        <>
        <ModalBasicNew title='Generar Valla' propFunctionCloseModal={handleCloseModal}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <BoxContainerInputsByInfoBigScroll>
                <ContainerTetxtPlain title='Nombre del Solicitante' text={objetoInformacionRadicacion.nombre_solicitante?.replace(/,/g, ', ')} />
                <ContainerTetxtPlain title='Tipo de Tramite' text={objetoInformacionRadicacion.descripcion_tramite?.replace(/,/g, ', ')} />
                <ContainerTetxtPlain title='Usos' text={objetoInformacionRadicacion.usos === null ? 'sin registro' : objetoInformacionRadicacion.usos} />
                <Input 
                    textlabel='Numero de Pisos *'
                    name='num_pisos'
                    value={dataValla.num_pisos || ''}
                    onChange={handleObtenerDataInpuValla}
                    placeholder='Ingrese numero de pisos'
                    maxLength={10}
                    regexOptions={/^[0-9]*$/}
                />
                <Input 
                    textlabel='Numero de Unidades *'
                    name='num_unidades'
                    value={dataValla.num_unidades || ''}
                    onChange={handleObtenerDataInpuValla}
                    placeholder='Ingrese numero de unidades'
                    maxLength={10}
                    regexOptions={/^[0-9]*$/}
                />
                <PrimaryTextArea
                    labelText='Descripción del Proyecto *'
                    propName='descripcion_proyecto'
                    propValue={dataValla.descripcion_proyecto || ''}
                    placeholder='Ingrese descripción del proyecto'
                    propFnInput={handleObtenerDataInpuValla}
                />
            </BoxContainerInputsByInfoBigScroll>

            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Generar Valla' onClick={handleGenerarValla} />
            </ContainerButtonsBackandNext>
            {
                vallaGenerada &&
                <Modal>
                    <BoxAlertNotificationOk
                        message={`La valla para el numero de radicacion: ${numeroRadicacion} se a generado con exito`}
                        onClick={handleCerrarModalVallaGenerada}
                        textButton2='Cerrar'
                    />
                    
                </Modal>
            }



        </ModalBasicNew>
        {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se generara la valla."
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
