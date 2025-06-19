import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import './procedentesarquitectonicos.scss'
import { modeloProcedente } from '../../Utils/ProcedenteModelo'
import PrimaryButton from '../../Components/PrimaryButton'
import { useContext, useEffect, useState } from 'react'
import { useFetchPost } from '../../Hooks/useFetchPost'
import { AuthContextState } from '../../Context/AuthContextContext'
import { 
    urlBase, 
    urlGenerarDocumentosProcedenteArquitectonico, 
    urlGetProcedenteArquitectonico, 
    urlPostProcedenteArquitectonico, 
    urlPutProcedenteArquitectonico 
} from '../../Utils/UrlData'
import { useFetchGet } from '../../Hooks/useFetchGet'
import { adaptadorProcedenteArquitectonico } from '../../Adapters/adaptersFetch'
import { useFetchPut } from '../../Hooks/useFetchPut'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import { useFirmas } from '@/Hooks/useFirmas'
import { ValidatorSelectFirmas } from '@/Utils/validatorsFunctions'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import Modal from '@/Components/Modal'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import error from '@/assets/warning_logo.png'
import success from '@/assets/check_logo2.png'
import { downloadFileFromPath } from '@/Utils/functions'
import { useAccesoLimitadoestandar } from '@/Hooks/useAccesoLimitadoestandar'
import Cargando from '@/Components/Atoms/Cargando'
import useLeaveTask from '@/Hooks/useLeaveTask'
import { GlobalState } from '@/Context/GlobalContext'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'

function ProcedentesArquitectonicos() {

    const { firma, handleFirmas, setFirma, dataFirmasArquitectos } = useFirmas();

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);
    const { setIniciandoProceso } = useContext(GlobalState);

    const [ procedenteArquitectonicoActualizado, setProcedenteArquitectonicoActualizado ] = useState(false);
    const [ documentoGenerado, setDocumentoGenerado ] = useState(false);
    const [ noExisteLaFirma, setNoExisteLaFirma ] = useState(false);

    const copiarAlPortapapeles = () => {
        navigator.clipboard.writeText(dataProcedenteArquitectonico.modelo_texto)
            .then(() => {
                alert('Texto copiado al portapapeles');
            })
            .catch((err) => {
                console.error('Error al copiar el texto: ', err);
            });
    };

    const initialData = {
        numero_radicacion: numeroRadicacion,
        modelo_texto: modeloProcedente,
        concepto_arquitectonico: null,
        adicional: null,
        descripcion_resuelve: null,
        precisiones: null
    }

    
    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlGetProcedenteArquitectonico}`, numeroRadicacion);


    const dataAdapterGet = adaptadorProcedenteArquitectonico(dataGet);

    const [ dataProcedenteArquitectonico, setDataProcedenteArquitectonico ] = useState(initialData);
    const [ dataId, setDataId ] = useState(null);

    function handleChange({ target }) {
        const { name, value } = target;
        setDataProcedenteArquitectonico({
            ...dataProcedenteArquitectonico,
            [name]: value
        });
    }

    useEffect(() => {
        if(dataAdapterGet) {
            setDataProcedenteArquitectonico({
                ...dataProcedenteArquitectonico,
                numero_radicacion: dataAdapterGet.numero_radicacion,
                modelo_texto: dataAdapterGet.modelo_texto,
                concepto_arquitectonico: dataAdapterGet.concepto_arquitectonico,
                adicional: dataAdapterGet.adicional,
                descripcion_resuelve: dataAdapterGet.descripcion_resuelve,
                precisiones: dataAdapterGet.precisiones

            });

            setDataId(dataAdapterGet.id);
        }
    }, [dataGet]);

    const { fetchPost }  = useFetchPost(token, `${urlBase}${urlPostProcedenteArquitectonico}`, dataProcedenteArquitectonico);

    function handlePostFetch() {
        if(Array.isArray(dataGet) && dataGet.length === 0) {
            fetchPost(refetchGet);
            console.log('Se hizo el post');
        }else {
            console.log('Ya existe el procedente');
        }
    }

    useEffect(() => {
        handlePostFetch();
    }, [dataGet]);


    const { fetchPut } = useFetchPut(token, `${urlBase}${urlPutProcedenteArquitectonico}`, dataProcedenteArquitectonico);

    async function handlePutFetch() {
        await fetchPut(dataId);
        setProcedenteArquitectonicoActualizado(true);
        setIniciandoProceso(false);
    }

    const dataGenerarDocumentoProcedenteArquitectonico = {
        num_radicacion: numeroRadicacion,
        nombre_firma: firma.value,
        profesion_firma: firma.profesion
    }

    const { fetchPost: generarDocumento } = useFetchPost(token, `${urlBase}${urlGenerarDocumentosProcedenteArquitectonico}`, dataGenerarDocumentoProcedenteArquitectonico);
    
    async function handleGenerarProcedenteArquitectonico() {
        await fetchPut(dataId);
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

    const { handlefnmenu } = useLeaveTask()
          
    //useEffect de desmontaje para limpiar el estado de firma
    useEffect(() => {
        return () => {
            setFirma({});
        }
    }, [])

    const { isLoadingEstandar } = useAccesoLimitadoestandar();
        
    if (isLoadingEstandar) return <Cargando />;

    

    return (
        <PrincipalPage pathActive={'Procedente Arquitectónico'} handlefnmenu={handlefnmenu}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>


            



                <section className='global-section-all '>
                    <article className='procedente-arquitectonico-article'>
                        <div className='procedente-arquitectonico-article__div-concepto'>
                            <div className='procedente-arquitectonico-article__div-modelo__div-span'>
                                <span className='procedente-arquitectonico-article__div-modelo__div-span__span'>Modelo</span>
                            </div>
                            <div className='procedente-arquitectonico-article__div-modelo__div-p'>
                                <textarea 
                                    onChange={handleChange}
                                    name='modelo_texto'
                                    className='textarea-concepto-arquitectonico'
                                    value={dataProcedenteArquitectonico.modelo_texto || ''}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className='procedente-arquitectonico-article__div-concepto-buttons'>
                            <PrimaryButton textButton='Copiar modelo' propFunction={copiarAlPortapapeles} />
                        </div>
                    </article>
                </section>

                <section className='global-section-all '>
                    <article className='procedente-arquitectonico-article'>
                        <div className='procedente-arquitectonico-article__div-concepto'>
                            <div className='procedente-arquitectonico-article__div-modelo__div-span'>
                                <span className='procedente-arquitectonico-article__div-modelo__div-span__span'>Concepto Arquitectónico</span>
                            </div>
                            <div className='procedente-arquitectonico-article__div-modelo__div-p'>
                                <textarea 
                                    className='textarea-concepto-arquitectonico'
                                    onChange={handleChange}
                                    name='concepto_arquitectonico'
                                    value={dataProcedenteArquitectonico.concepto_arquitectonico || ''}
                                >

                                </textarea>
                            </div>
                        </div>
                        <div className='procedente-arquitectonico-article__div-concepto-buttons'>
                            <PrimaryButton textButton='Procedente Arquitectónico' propFunction={handlePutFetch} />
                            {/*<PrimaryButton textButton='Procedente Conjunto' propFunction={() => {console.log('Procedente Conjunto')}} />*/}
                            {/*<PrimaryButton textButton='Formatos de revisión' propFunction={() => {console.log('Formatos de revisión')}} />*/}
                            <PrimaryDropDown propOptions={dataFirmasArquitectos} propPlaceholderOption={'Seleccionar Firma'} propOnchangeFn={handleFirmas} />
                            <PrimaryButton textButton='Generar Documento' propFunction={() => ValidatorSelectFirmas(firma, handleGenerarProcedenteArquitectonico, () => setNoExisteLaFirma(true))   } />
                        </div>
                    </article>
                </section>

                <section className='global-section-all '>
                    <article className='procedente-arquitectonico-article'>
                        <div className='procedente-arquitectonico-article__div-conciderando'>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                                <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Considerando Adicional:</label>
                                <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                    <select 
                                        className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                        name="adicional"
                                        onChange={handleChange}
                                        value={dataProcedenteArquitectonico.adicional || ''}
                                    >
                                        <option value="">Selecciona una opcion</option>
                                        <option value="opcion 1">Opcion 1</option>
                                        <option value="opcion 2">Opcion 2</option>
                                    </select>
                                </div>
                                
                            </div>

                            <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                                <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Descripción Proyecto Resuelve:</label>
                                <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea'>
                                    <textarea 
                                        className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea__textarea' 
                                        name="descripcion_resuelve"
                                        onChange={handleChange}
                                        value={dataProcedenteArquitectonico.descripcion_resuelve || ''}
                                    ></textarea>
                                </div>
                                
                            </div>

                        </div>

                        <div className='procedente-arquitectonico-article__div-concepto-buttons'>
                            <div className='div-estructural' ></div>
                        </div>
                        
                        
                    </article>
                </section>

                <section className='global-section-all section-final'>
                    <article className='procedente-arquitectonico-article'>
                        <div className='procedente-arquitectonico-article__div-concepto'>
                            <div className='procedente-arquitectonico-article__div-modelo__div-span'>
                                <span className='procedente-arquitectonico-article__div-modelo__div-span__span'>Precisiones al Proyecto CAPITULO 6. de Formato Único Licencia</span>
                            </div>
                            <div className='procedente-arquitectonico-article__div-modelo__div-p'>
                                <textarea 
                                    className='textarea-concepto-arquitectonico'
                                    name="precisiones"
                                    onChange={handleChange}
                                    value={dataProcedenteArquitectonico.precisiones || ''}
                                >

                                </textarea>
                            </div>
                        </div>
                        <div className='procedente-arquitectonico-article__div-concepto-buttons'>
                            {/*<PrimaryButton textButton='Copia OBS' propFunction={() => {console.log('Copia OBS')}} />*/}
                            {/*<PrimaryButton textButton='Pegar Concepto' propFunction={() => {console.log('Pegar Concepto')}} />*/}
                            {/*<PrimaryButton textButton='Borrar Concepto' propFunction={() => {console.log('Borrar Concepto')}} bgColor='red' />*/}
                            <div className='gosth'></div>
                        </div>
                    </article>
                </section>

                {
                    noExisteLaFirma &&
                    <Modal>
                        <BoxAlertNotification 
                            title={'Un error fue detectado'}
                            message={'Para generar el documento de procedente Arquitectonico tienes que seleccionar una firma'}
                            image={error}
                            alt={'Imagen de error'}
                            onClick={() => setNoExisteLaFirma(false)}
                            textButton={'Volver al Procedente'}
                        />
                    </Modal>
                }

                {
                    procedenteArquitectonicoActualizado &&
                    <Modal>
                        <BoxAlertNotification 
                            title={'Procedente Arquitectonico'}
                            message={'Procedente Arquitectonico actualizado con éxito'}
                            image={success}
                            alt={'Imagen de éxito'}
                            onClick={() => setProcedenteArquitectonicoActualizado(false)}
                            textButton={'Volver al Procedente'}
                        />
                    </Modal>
                }

                {
                    documentoGenerado &&
                    <Modal>
                        <BoxAlertNotification 
                            title={'Documento Generado'}
                            message={'Documento generado con éxito'}
                            image={success}
                            alt={'Imagen de éxito'}
                            onClick={() => setDocumentoGenerado(false)}
                            textButton={'Volver al Procedente'}
                        />
                    </Modal>
                }

        </PrincipalPage>
    )
}

export default ProcedentesArquitectonicos
