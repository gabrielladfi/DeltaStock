
import { useContext, useEffect, useState } from 'react'
import { ProcedentesJuridicosProvider, ProcedentesJuridicosState } from './Context/ProcedentesJuridicosContext'
import { GlobalState } from '../../Context/GlobalContext'
import { useFetchGet } from '../../Hooks/useFetchGet'
import { AuthContextState } from '../../Context/AuthContextContext'
import { urlBase, urlCrearProcedenteJuridico, urlGenerarDocumentosProcedenteJuridico, urllistadoProcedenteJuridico } from '../../Utils/UrlData'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { useFetchPost } from '../../Hooks/useFetchPost'
import { useFetchPut } from '../../Hooks/useFetchPut'
import { useFirmas } from '@/Hooks/useFirmas'
import { ValidatorSelectFirmas } from '@/Utils/validatorsFunctions'
import { downloadFileFromPath } from '@/Utils/functions'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import DropdownDocumentosRevisados from './Components/DropdownDocumentosRevisados'
import TablaDocumentosRevisados from './Components/TablaDocumentosRevisados'
import TextAreaProcedenteJuridico from './Components/TextAreaProcedenteJuridico'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import success from '@/assets/check_logo2.png'
import error from '@/assets/warning_logo.png'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import './procedentesjuridicos.scss'
import { useAccesoLimitadoestandar } from '@/Hooks/useAccesoLimitadoestandar'
import Cargando from '@/Components/Atoms/Cargando'
import useLeaveTask from '@/Hooks/useLeaveTask'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import PickListSmall from '@/Components/Molecules/PickListSmall'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'

function ProcedentesJuridicos() {

    const { isLoadingEstandar } = useAccesoLimitadoestandar();
    
    if (isLoadingEstandar) return <Cargando />;

    return (
        <ProcedentesJuridicosProvider>
            <ProcedentesJuridicosContent />
        </ProcedentesJuridicosProvider>
    )
}

function ProcedentesJuridicosContent() {

    const { firma, handleFirmas, setFirma, dataFirmasAbogados } = useFirmas();

    const { token  } = useContext(AuthContextState);
    const numeroRadicacion = getNumeroRadicacion();
    const {
        setProcedenteJuridicoId,
        procedenteJuridicoId,
        procedenteJuridicoPut,
        setProcedenteJuridicoPut
    } = useContext(ProcedentesJuridicosState);
    const { globalNumeroRadicacion, setIniciandoProceso } = useContext(GlobalState);

    const procedenteJuridicoInicial = {
        numero_radicacion: numeroRadicacion,
        procedente_juridico: "De conformidad con el Decreto 1469 del 2010, compilado en el Decreto 1077 de 2015, en concordancia con la Resolución 1025 de 2021 y demás normas complementarias, se emite Procedente Jurídico."
    }

    const [ procedenteJuridicoActualizado, setProcedenteJuridicoActualizado ] = useState(false);
    const [ documentoGenerado, setDocumentoGenerado ] = useState(false);
    const [ noExisteLaFirma, setNoExisteLaFirma ] = useState(false);

    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urllistadoProcedenteJuridico}`, numeroRadicacion);
    const { fetchPost } = useFetchPost(token, `${urlBase}${urlCrearProcedenteJuridico}`, procedenteJuridicoInicial);
    const { fetchPut } = useFetchPut(token, `${urlBase}${urlCrearProcedenteJuridico}${procedenteJuridicoId}`, procedenteJuridicoPut);

    useEffect(() => {
        if(Array.isArray(dataGet) && dataGet.length === 0) {
            fetchPost(refetchGet);
        }else if(Array.isArray(dataGet) && dataGet.length > 0) {
            setProcedenteJuridicoId(dataGet[0].id);
            setProcedenteJuridicoPut({
                ...procedenteJuridicoPut,
                procedente_juridico: dataGet[0].procedente_juridico
            })
        }
    }
    , [dataGet])

    async function handlePutProcedenteJuridico() {
        await fetchPut('', refetchGet);
        setProcedenteJuridicoActualizado(true);
        setIniciandoProceso(false);
    }

    const generarDocumentoProcedenteJuridico = {
        num_radicacion: numeroRadicacion,
        nombre_firma: firma.value,
        profesion_firma: firma.profesion
    }

    const { fetchPost: generarDocumento } = useFetchPost(token, `${urlBase}${urlGenerarDocumentosProcedenteJuridico}`, generarDocumentoProcedenteJuridico);

    async function handleGenerarProcedenteJuridico() {
        await fetchPut('', refetchGet);
        try {
            const result = await generarDocumento(); // 🔥 Ahora sí tenés el resultado inmediato
            if (result?.file_path) {
                setDocumentoGenerado(true);
                downloadFileFromPath(result.file_path);
            } else {
                alert('❌ No se pudo generar el documento');
            }
        } catch (err) {
            alert('⚠️ Error al generar el documento');
            console.error(err);
        }
    }
      
    function handleClosedSuccessModal() {
        setProcedenteJuridicoActualizado(false);
    }

    
    //useEffect de desmontaje para limpiar el estado de firma
    useEffect(() => {
        return () => {
            setFirma({});
        }
    }, [])


    const { handlefnmenu } = useLeaveTask()
    
    return (
        <PrincipalPage pathActive={'Procedente Jurídico'} handlefnmenu={handlefnmenu}>
           {/* <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Procedente Jurídico</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Número Radicación</label>
                        <p className='observaciones-num-radicacion'>{globalNumeroRadicacion}</p>
                    </div>
                </article>
            </section>*/}
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>


            
                <DropdownDocumentosRevisados />
           

            
                <TablaDocumentosRevisados />
           

                <TextAreaProcedenteJuridico />
                <ContainerButtonsBackandNext>
                    <PickListSmall options={dataFirmasAbogados} optionSelected='Seleccionar Firma' onChange={handleFirmas} />
                    {/*<PrimaryDropDown propOptions={dataFirmasAbogados} propPlaceholderOption={'Seleccionar Firma'} propOnchangeFn={handleFirmas} />*/}
                    <PrimaryButtonNewSmall onClick={handlePutProcedenteJuridico} text={'Procedente Jurídico'} />
                    <PrimaryButtonNewSmall onClick={() => ValidatorSelectFirmas(firma, handleGenerarProcedenteJuridico, () => setNoExisteLaFirma(true))} text={'Generar Documento'} bgColor={'#D9BB62'} />

                </ContainerButtonsBackandNext>


            {
                procedenteJuridicoActualizado &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message={'Procedente Jurídico actualizado con éxito'}
                        onClick={handleClosedSuccessModal}
                        textButton2={'Volver al Procedente'}
                    />
                     
                </Modal>
            }

            {
                noExisteLaFirma &&
                <Modal>
                    <BoxAlertNotificationError  
                        message={'Para generar el documento de procedente Jurídico tienes seleccionar una firma'}
                        onClick={() => setNoExisteLaFirma(false)}
                        textButton2={'Cerrar'}
                    />
                </Modal>
            }

            {
                documentoGenerado &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message={'Documento generado con éxitoooo'}
                        onClick={() => setDocumentoGenerado(false)}
                        textButton2={'Volver al Procedente'}
                    />
                     
                </Modal>
            }
        </PrincipalPage>
    )
}

export default ProcedentesJuridicos
