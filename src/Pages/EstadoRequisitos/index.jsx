import TablaEstadoRequisitos from './Components/TablaEstadoRequisitos'
import { EstadoRequisitosContextProvider, EstadoRequisitosContextState } from './Context/EstadoRequisitosContextContext'
import './estadorequisitos.scss'
import '../../Sass/globalSass.scss'
import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import Modal from '../../Components/Modal'
import AgregarNuevoRequisito from './Components/AgregarNuevoRequisito'
import { useServicesPost } from '../../Hooks/useServicesPost'
import RegistrarIngreso from './Components/RegistrarIngreso'
import { useServicesGet } from '../../Hooks/useServicesGet'
import FormGenararValla from './Components/FormGenerarValla'   
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
//import { dataFirmas } from '@/Utils/dataObjetoFirmas'
import { useFirmas } from '@/Hooks/useFirmas'
import { ValidatorSelectFirmas, errorAlert } from '@/Utils/validatorsFunctions'
import { useNoInicioSesion } from '@/Hooks/useNoInicioSesion'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import success from '@/assets/checkLogo.svg'
import error from '@/assets/warninglogo.svg'
import PrimaryButton from '@/Components/PrimaryButton'
import { downloadFileFromPath } from '@/Utils/functions'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import BoxContainerInputsByInfoBig from '@/Components/Atoms/BoxContainerInputsByInfoBig'
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import PickListSmall from '@/Components/Molecules/PickListSmall'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import BarraEstadoRequisitos from '@/Components/Molecules/BarraEstadoRequisitos'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk'





function EstadoRequisitos() {

    const { isLoading } = useNoInicioSesion();

    if (isLoading) return <div>Cargando...</div>;

    return (
        <>
            <EstadoRequisitosContextProvider>
                <EstadoRequisitosContent />
            </EstadoRequisitosContextProvider>
        </>
    )
}


function EstadoRequisitosContent() {

    const { firma, handleFirmas, setFirma, dataFirmasCuradores } = useFirmas();

    const [ noExisteFirma, setNoExisteFirma ] = useState(false);
    const [ actaLegaGenerada, setActaLegalGenerada ] = useState(false);


    //const [ agregarNuevoRequsito, setAgregarNuevoRequisito ] = useState(true);
    const { globalNumeroRadicacion, setDataTramite, informacionRadicacion, setGlobalNumeroRadicacion, errorActaLegal, setErrorActaLegal } = useContext(GlobalState);
    const { agregarNuevoRequsito, setAgregarNuevoRequisito, registrarNuevoIngreso } = useContext(EstadoRequisitosContextState);
    const { fetchPostCrearRadicacionIncompleta, fetchPostObtenerActaLegal } = useServicesPost();
    const { fetchInformacionDeRadicacion } = useServicesGet();

    const { generarValla, setGenerarValla } = useContext(EstadoRequisitosContextState);

    const numeroRadicacion = localStorage.getItem('numeroRadicacionLocalStorage');
    
    useEffect(() => {
        if(numeroRadicacion) {
            setGlobalNumeroRadicacion(numeroRadicacion);
        }
    }, [globalNumeroRadicacion])

    function handleAgregarNuevoRequisito() {
        setAgregarNuevoRequisito(true);
    }

    async function handleCrearRadicacionIncompleta() {
        const data = {
            "num_radicacion": numeroRadicacion,
            "nombre_firma": firma.value,
            "profesion_firma": firma.profesion
        }
            try {
                const response = await fetchPostCrearRadicacionIncompleta(data);
                if (response) {
                    window.open(
                        `https://apiv1.deltapro.com.co/deltacu/docs?filename=${response.file_path}`,
                        '_blank'
                    );
                }else {
                    console.error('No se pudo generar el enlace para la radicación incompleta');
                }
            } catch (error) {
                console.error('Error al crear radicación incompleta:', error);
            }
        
    }

    useEffect(() => {
        fetchInformacionDeRadicacion(numeroRadicacion);
    }, [])

    useEffect(() => {
        setDataTramite(informacionRadicacion);
    }, [informacionRadicacion])

    const objetoInformacionRadicacion = informacionRadicacion?.[0] || {};

    function handleGenerarValla() {
        setGenerarValla(true);
    }

   

    async function handleCrearActaLegal() {
        const data = {
            "num_radicacion": numeroRadicacion,
            "nombre_firma": firma.value,
            "profesion_firma": firma.profesion
        };
    
        try {
            const response = await fetchPostObtenerActaLegal(data); // Retorna los datos directamente
            if (response?.file_path) {
                setActaLegalGenerada(true);
                downloadFileFromPath(response.file_path);
            } else {
                console.error('No se pudo generar el enlace para el acta legal');
            }
        } catch (error) {
            console.error('Error al generar el acta legal:', error);
        }
    }

    function addSpaceAfterComma(text) {
        if (!text) return text;
        return text.replace(/,(?!\s)/g, ', ');
    }
    
    

    //useEffect de desmontaje para limpiar el estado de firma
    useEffect(() => {
        return () => {
            setFirma({});
        }
    }, [])

    return (
        <PrincipalPage pathActive={'Estado de requisitos'}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <section className='estadorequisitos-section-container-info'>
                <BoxContainerInputsByInfo>
                    <ContainerTetxtPlain title={'Tipo de Tramite'} text={addSpaceAfterComma(objetoInformacionRadicacion.descripcion_tramite)} />
                    <ContainerTetxtPlain title={'Objeto Tramite'} text={objetoInformacionRadicacion.objeto_tramite === null ? 'Sin registro' : objetoInformacionRadicacion.objeto_tramite} />
                </BoxContainerInputsByInfo>
                <BoxContainerInputsByInfo>
                    <ContainerTetxtPlain title={'Nombre Solicitante'} text={objetoInformacionRadicacion.nombre_solicitante} />
                    <ContainerTetxtPlain title={'Email Solicitante'} text={objetoInformacionRadicacion.email_solicitante} />
                </BoxContainerInputsByInfo>
            </section>
            
            <div className='div-line'></div>

                            
                <ContainerTitleButtonsAddData>
                    <TitleSectionInfo text='Registrar Nuevo Requisito' />
                    <PrimaryButtonNewSmall
                        backgroundColor='#D7A100'
                        text={'Agregar Requisito'}
                        onClick={handleAgregarNuevoRequisito}
                    />
                </ContainerTitleButtonsAddData>
            
                <TablaEstadoRequisitos />
            

            <div className='estadorequisitos-buttons'>
                

                <PickListSmall
                    options={dataFirmasCuradores}
                    optionSelected={'Seleccionar Firma'}
                    onChange={handleFirmas}
                />

                <PrimaryButtonNewSmall
                    text={'Radicacion'}
                    onClick={() => ValidatorSelectFirmas(firma, handleCrearRadicacionIncompleta, () => setNoExisteFirma(true))}
                />

                <PrimaryButtonNewSmall
                    text={'Generar Valla'}
                    onClick={handleGenerarValla}
                />

                <PrimaryButtonNewSmall
                    text={'Acta legal y debida Forma'}
                    onClick={() => ValidatorSelectFirmas(firma, handleCrearActaLegal, () => setNoExisteFirma(true))}
                />

            </div>

            {
                agregarNuevoRequsito &&  
                <Modal> 
                    <AgregarNuevoRequisito /> 
                </Modal>
            }

            {
                registrarNuevoIngreso && 
                <Modal> 
                    <RegistrarIngreso /> 
                </Modal>
            }

            {
                generarValla && 
                <Modal> 
                    <FormGenararValla /> 
                </Modal>
            }

            {
                errorActaLegal && 
                <Modal> 
                    <BoxAlertNotificationError 
                        message={`Para la radicacion ${numeroRadicacion} existen aún algunos requisitos pendientes, Por favor verifique y complételos antes de continuar.`}
                        onClick={() => setErrorActaLegal(false)}
                        textButton2={'Cerrar'}
                    />
                </Modal>
            }

            {
                actaLegaGenerada &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message={`El acta legal y debida forma para el numero de radicacion: ${numeroRadicacion} se a generado con exito`}
                        onClick={() => setActaLegalGenerada(false)}
                        textButton2={'Cerrar'}
                    />
                </Modal>
            }

            {
                noExisteFirma && 
                <Modal> 
                    <BoxAlertNotificationError 
                        message={`No se ha seleccionado una firma, por favor seleccione una firma antes de continuar.`}
                        onClick={() => setNoExisteFirma(false)}
                        textButton2={'Cerrar'}
                    />
                </Modal>
            }
        </PrincipalPage>
    )
}

export default EstadoRequisitos
