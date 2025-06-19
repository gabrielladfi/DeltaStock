import { informacionExpedienteStore } from '@/Store/informacionExpedienteStore'
import PrimaryButton from '@/Components/PrimaryButton'
import { useFetchGet } from '@/Hooks/useFetchGet'
import { urlBase, urlGenerarDocumentoViabilidadTecnica, urlGetObtenerListadoTitulares } from '@/Utils/UrlData'
import { useContext, useEffect, useState } from 'react'
import { AuthContextState } from '@/Context/AuthContextContext'
import { useFetchPost } from '@/Hooks/useFetchPost'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import { useFirmas } from '@/Hooks/useFirmas'
import { errorAlert, ValidatorSelectFirmas } from '@/Utils/validatorsFunctions'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './viabilidadtecnica.scss'
import useLeaveTask from '@/Hooks/useLeaveTask'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import BoxContainerInputsByInfoBig from '@/Components/Atoms/BoxContainerInputsByInfoBig'
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain'
import PickList from '@/Components/Molecules/PickList'
import PickListSmall from '@/Components/Molecules/PickListSmall'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import Modal from '@/Components/Modal'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk'

function ViabilidadTecnica() {

    const [ documentoGenerado, setDocumentoGenerado ] = useState(false);
    const [ faltaFirmar, setFaltaFirmar ] = useState(false);

    const { firma, handleFirmas, setFirma, dataTodasLasFirmas } = useFirmas();

    const { radicacion } = informacionExpedienteStore();
    const { token } = useContext(AuthContextState);

    const { dataGet } = useFetchGet(token, `${urlBase}${urlGetObtenerListadoTitulares}`, radicacion.numero_radicacion);

    const initialPostData = {
        numero_radicacion: radicacion.numero_radicacion,
        titular: '',
        tipo_tramite: radicacion.descripcion_tramite,
        modalidad: radicacion.descripcion_modalidad,
        nombre_firma: firma.value,
        profesion_firma: firma.profesion,
    }

    const [ dataFecthPost, setDataFecthPost ] = useState(initialPostData);

    console.log(dataFecthPost);

    const { fetchPost, dataPost } = useFetchPost(token, `${urlBase}${urlGenerarDocumentoViabilidadTecnica}`, dataFecthPost);

    function handlePost({ target }) {
        const { name, value } = target;
        setDataFecthPost({
            ...dataFecthPost,
            [name]: value
        });
        
    }

    useEffect(() => {
        setDataFecthPost({
            ...dataFecthPost,
            nombre_firma: firma.value,
            profesion_firma: firma.value === 'MONICA VILLALOBOS LEAL' ? 'Curadora Urbana 2 Santa Marta' : firma.profesion,
        });
    }, [firma])


    async function handleGenerateDocument() {

        if (!dataFecthPost.titular) {
            setFaltaFirmar(true);
            return;
        }

        try {
            await fetchPost('');
            setDataFecthPost(initialPostData);
            setDocumentoGenerado(true);
        } catch (error) {
            console.error('Error generando documento:', error);
        }
    }
    

    useEffect(() => {
        if(dataPost && dataPost.file_path) {
            window.open(
                `https://apiv1.deltapro.com.co/deltacu/docs?filename=${dataPost.file_path}`,
                '_blank'
            );
        }else {
            console.error('No se pudo generar el enlace para el documento');
        }
    }
        , [dataPost])

        useEffect(() => {
            return () => {
                setFirma({});
            }
        }, [])
    
        console.log(firma)

    const addSpaceAfterComma = (text) => {
        if (!text) return '';
        return text.replace(/,/g, ', ');
    }

    const { handlefnmenu } = useLeaveTask()

    return (
        <PrincipalPage pathActive={'Viabilidad Técnica'} handlefnmenu={handlefnmenu}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={radicacion.numero_radicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerInputsNRNew>
                <BoxContainerInputsByInfo>
                <ContainerTetxtPlain title='Radicado' text={radicacion.numero_radicacion} />
                <ContainerTetxtPlain title='Tipo de Tramite' text={addSpaceAfterComma(radicacion.descripcion_tramite)} />
                <PickList
                        label='Titular'
                        onChange={handlePost}
                        value={dataFecthPost.titular}
                        name='titular'
                        options={dataGet && dataGet.map(titular => {
                            return {
                                option: titular.nombre,
                                value: titular.nombre
                            }
                        })}
                        optionSelected='Seleccione un Titular'
                    />
                </BoxContainerInputsByInfo>
                <BoxContainerInputsByInfo>
                <ContainerTetxtPlain title='Modalidad' text={addSpaceAfterComma(radicacion.descripcion_modalidad)} />
                <ContainerTetxtPlain title='Asunto' text={'Comunicación de Viabilidad Técnica'} />
                <PickList
                        label='Firma'
                        onChange={handleFirmas}
                        value={dataFecthPost.titular}
                        name='firma'
                        options={dataTodasLasFirmas}
                        optionSelected='Seleccione una Firma'
                    />
                </BoxContainerInputsByInfo>
            </ContainerInputsNRNew>
            
            <ContainerButtonsBackandNextSmall>
                <PrimaryButtonNewSmall onClick={() => ValidatorSelectFirmas(firma, handleGenerateDocument, () => setFaltaFirmar(true) ) } text={'Generar Documento'} />

            </ContainerButtonsBackandNextSmall>

            {
                faltaFirmar &&
                <Modal>
                    <BoxAlertNotificationError 
                        message='Debe seleccionar una firma antes de generar el documento.'
                        onClick={() => setFaltaFirmar(false)}
                        textButton2='Cerrar'
                    />
                </Modal>
            }
            {
                documentoGenerado &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message='Documento generado con éxito.'
                        onClick={() => setDocumentoGenerado(false)}
                        textButton2='Cerrar'
                    />
                </Modal>
            }
            


        </PrincipalPage>
    )
}

export default ViabilidadTecnica
