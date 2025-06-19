import { useContext, useEffect, useState } from 'react'
import { useFetchGet } from '../../Hooks/useFetchGet'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { conceptoIngenieria } from '../../Utils/ProcedenteModelo'
import { 
    urlBase, 
    urlGenerarDocumentosProcedenteIngenieria, 
    urlGetProcedenteIngenieria, 
    urlPostProcedenteIngenieria 
} from '../../Utils/UrlData'
import { AuthContextState } from '../../Context/AuthContextContext'
import { useFetchPost } from '@/Hooks/useFetchPost'
import { adaptadorProcedenteIngenieria } from '@/Adapters/adaptersFetch'
import { useFetchPut } from '@/Hooks/useFetchPut'
import { useFirmas } from '@/Hooks/useFirmas'
import { ValidatorSelectFirmas } from '@/Utils/validatorsFunctions'
import { downloadFileFromPath } from '@/Utils/functions'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import PrimaryButton from '../../Components/PrimaryButton'
import Modal from '@/Components/Modal'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import success from '@/assets/check_logo2.png'
import error from '@/assets/warning_logo.png'
import './procedentesingenieria.scss'
import { useAccesoLimitadoestandar } from '@/Hooks/useAccesoLimitadoestandar'
import Cargando from '@/Components/Atoms/Cargando'
import useLeaveTask from '@/Hooks/useLeaveTask'
import { GlobalState } from '@/Context/GlobalContext'

function ProcedentesIngenieria() {

    const { firma, handleFirmas, setFirma, dataFirmasIngenieros } = useFirmas();

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);
    const { setIniciandoProceso } = useContext(GlobalState);
    const [ procedenteIngenieriaActualizado, setProcedenteIngenieriaActualizado ] = useState(false);
    const [ documentoGenerado, setDocumentoGenerado ] = useState(false);
    const [ noExisteLaFirma, setNoExisteLaFirma ] = useState(false);

    const urlCimentacion = `${urlBase}listas/cimentacion/`;
    const urlEstructura = `${urlBase}listas/estructura/`;
    const urlDiseno = `${urlBase}listas/diseno/`;
    const urlSismico = `${urlBase}listas/sismico/`;

    const { dataGet: dataCimentacion } = useFetchGet(token, `${urlCimentacion}`, '');
    const { dataGet: dataEstructura } = useFetchGet(token, `${urlEstructura}`, '');
    const { dataGet: dataDiseno } = useFetchGet(token, `${urlDiseno}`, '');
    const { dataGet: dataSismico } = useFetchGet(token, `${urlSismico}`, '');

    const dataGenerarDocumentoProcedenteIngenieria = {
        num_radicacion: numeroRadicacion,
        nombre_firma: firma.value,
        profesion_firma: firma.profesion
    }


    const { fetchPost: generarDocumento } = useFetchPost(token, `${urlBase}${urlGenerarDocumentosProcedenteIngenieria}`, dataGenerarDocumentoProcedenteIngenieria);

    const { dataGet: dataProcedenteIngenieria, refetchGet } = useFetchGet(token, `${urlBase}${urlGetProcedenteIngenieria}${numeroRadicacion}`, '');

    const dataGetadaptada = adaptadorProcedenteIngenieria(dataProcedenteIngenieria);

    const dataInicialDeProcedenteDeIngenieria = {
        numero_radicacion: numeroRadicacion,
        concepto_ingenieria: "Realizada la revisión de oficio ordenada en el artículo 2.2.6.1.2.2.3 del decreto 1077 del 2015 y el numeral A1.3.7.1 NSR-10 a la solicitud de licencia, se certifica que el proyecto estructural anexo cumple con el alcance definido en la resolución 0017 de 2017 en lo que respecta al diseño estructural de edificaciones según los requerimientos de la ley 400 de 1997 y la NSR-10 con sus decretos reglamentarios y modificatorios. Los profesionales firmantes del FUN asumen.",
        micro_zonificacion: "Opción 1",
        sismica: "Sismíco 1",
        amenaza_remocion: "Remoción 1",
        amenaza_inundación: "No Aplica",
        metodo: "Método de resistencia Diseño",
        an_sismico: "No Aplica",
        grupo_desempeño: "No Aplica",
        tipo_estructura: "Estructura 2"
    }

    const [procedenteIngenieria, setProcedenteIngenieria] = useState(dataInicialDeProcedenteDeIngenieria);

    useEffect(() => {
        if(dataGetadaptada) {
            setProcedenteIngenieria(dataGetadaptada);
        }
    }, [dataProcedenteIngenieria])


    const { fetchPost: generarProcedente } = useFetchPost(token, `${urlBase}${urlPostProcedenteIngenieria}`, procedenteIngenieria);

    useEffect(() => {
        if(dataProcedenteIngenieria && dataProcedenteIngenieria.length === 0) {
            generarProcedente(refetchGet)
            
        }else {
            console.log('Ya existe un procedente de ingenieria para esta radicacion')
        }

    }, [dataProcedenteIngenieria])

    
    function handleInputData( { target }) {
        const { name, value } = target;
        setProcedenteIngenieria({
            ...procedenteIngenieria,
            [name]: value
        })
    }


    const { fetchPut } = useFetchPut(token, `${urlBase}${`procedentes/ingenieria/`}`, procedenteIngenieria);

    async function handleGuardarProcedente() {
        await fetchPut(dataGetadaptada.id, refetchGet);
        setProcedenteIngenieriaActualizado(true);
        setIniciandoProceso(false);
    }

    async function handleGenerarProcedenteIngenieria() {
        await fetchPut(dataGetadaptada.id, refetchGet);
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

    useEffect(() => {
        return () => {
            setFirma({});
        }
    }, [])

    const { handlefnmenu } = useLeaveTask()

    const { isLoadingEstandar } = useAccesoLimitadoestandar();
        
    if (isLoadingEstandar) return <Cargando />;

    return (
        <PrincipalPage handlefnmenu={handlefnmenu}>
            <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Procedente de Ingenieria</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Número Radicación</label>
                        <p className='observaciones-num-radicacion'>{numeroRadicacion}</p>
                    </div>
                </article>
            </section>

            {/* Seccion de remocion */}
            <section className='global-section-all '>
                <article className='procedente-ingenieria-article'>
                    <div className='procedente-arquitectonico-article__div-conciderando'>
                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">TIPO DE REMOCIÓN</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    onChange={handleInputData}
                                    value={procedenteIngenieria ? procedenteIngenieria.amenaza_remocion : 'No Aplica'}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                    name='amenaza_remocion'
                                >
                                    <option selected value="">Selecciona una opcion</option>
                                    <option value="opcion 1">Opcion 1</option>
                                    <option value="opcion 2">Opcion 2</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Descripción Remoción:</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea'>
                                <textarea 
                                    onChange={handleInputData}
                                    value={procedenteIngenieria ? procedenteIngenieria.descripcion_remocion : ''}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea__textarea textarea-modificador-h' 
                                    name='descripcion_remocion'
                                ></textarea>
                            </div>
                            
                        </div>

                    </div>
                </article>
            </section>

            {/* Seccion de inundacion */}
            <section className='global-section-all '>
                <article className='procedente-ingenieria-article'>
                    <div className='procedente-arquitectonico-article__div-conciderando'>
                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">TIPO DE INUNDACIÓN</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    onChange={handleInputData}
                                    value={procedenteIngenieria ? procedenteIngenieria.amenaza_inundación : 'No Aplica'}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                    name='amenaza_inundación'
                                >
                                    <option selected value="">Selecciona una opcion</option>
                                    <option value="opcion 1">Opcion 1</option>
                                    <option value="opcion 2">Opcion 2</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Descripción inundación:</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea'>
                                <textarea 
                                    onChange={handleInputData}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea__textarea textarea-modificador-h' 
                                    name='descripcion_inundacion'
                                    value={procedenteIngenieria ? procedenteIngenieria.descripcion_inundacion : ''}
                                ></textarea>
                            </div>
                            
                        </div>

                    </div>
                </article>
            </section>

            {/* Seccion de microzonif */}
            <section className='global-section-all '>
                <article className='procedente-ingenieria-article'>
                    <div className='procedente-arquitectonico-article__div-conciderando'>
                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">TIPO DE MICROZONIFICACION</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    onChange={handleInputData}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                    name='micro_zonificacion'
                                    value={procedenteIngenieria ? procedenteIngenieria.micro_zonificacion : ''}
                                >
                                    <option selected value="">Selecciona una opcion</option>
                                    <option value="Opción 1">Opcion 1</option>
                                    <option value="opcion 2">Opcion 2</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Descripción microzonificacion:</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea'>
                                <textarea 
                                    onChange={handleInputData}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-textarea__textarea textarea-modificador-h' 
                                    name='descripcion_mzonificacion'
                                    value={procedenteIngenieria ? procedenteIngenieria.descripcion_mzonificacion : ''}
                                ></textarea>
                            </div>
                            
                        </div>

                    </div>
                </article>
            </section>

            <section className='global-section-all '>
                <article className='procedente-ingenieria-article'>
                    <div className='procedente-arquitectonico-article__div-conciderando container-selectores-pi'>
                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Tipo de Cimentación</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select'
                                >
                                    <option selected>Seleciona una opcion</option>
                                    {
                                        dataCimentacion && dataCimentacion.map((item, index) => {
                                            
                                            return (
                                                <option key={index} value={item.id}>{item.valor}</option>
                                            )
                                        }
                                        )
                                    }
                                </select>
                            </div>
                            
                        </div>

                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Tipo de Estructura</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    onChange={handleInputData}
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                    name='tipo_estructura'
                                    value={procedenteIngenieria ? procedenteIngenieria.tipo_estructura : ''}
                                >
                                    <option selected>Selecciona una opcion</option>
                                    {
                                        dataEstructura && dataEstructura.map((item, index) => {
                                            
                                            return (
                                                <option key={index} value={item.id}>{item.valor}</option>
                                            )
                                        }
                                        )
                                    }
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </article>
            </section>

            <section className='global-section-all '>
                <article className='procedente-ingenieria-article'>
                    <div className='procedente-arquitectonico-article__div-conciderando container-selectores-pi'>
                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Tipo de Diseño</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                    name='metodo'
                                    value={procedenteIngenieria ? procedenteIngenieria.metodo : ''}
                                    onChange={handleInputData}
                                >
                                    <option selected>Selecciona una opcion</option>
                                    {
                                        dataDiseno && dataDiseno.map((item, index) => {
                                            
                                            return (
                                                <option key={index} value={item.id}>{item.valor}</option>
                                            )
                                        }
                                        )
                                    }
                                </select>
                            </div>
                            
                        </div>

                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Análisis Sismico</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                    name='an_sismico'
                                    value={procedenteIngenieria ? procedenteIngenieria.an_sismico : ''}
                                    onChange={handleInputData}
                                >
                                    <option selected>Selecciona una opcion</option>
                                    {
                                        dataSismico && dataSismico.map((item, index) => {
                                            
                                            return (
                                                <option key={index} value={item.id}>{item.valor}</option>
                                            )
                                        }
                                        )
                                    }
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </article>
            </section>

            {/*<section className='global-section-all '>
                <article className='procedente-ingenieria-article'>
                    <div className='procedente-arquitectonico-article__div-conciderando container-selectores-pi'>
                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">Tipo de Desempeño de Elementos no Estructurales</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    onChange={handleInputData}
                                    value={procedenteIngenieria ? procedenteIngenieria.grupo_desempeño : 'No Aplica'}
                                    name='grupo_desempeño'
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                >
                                    <option value="">Selecciona una opcion</option>
                                    <option value="opcion 1">Opcion 1</option>
                                    <option value="opcion 2">Opcion 2</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className='procedente-arquitectonico-article__div-conciderando__div-content'>
                            <label className='procedente-arquitectonico-article__div-conciderando__div-content__label' htmlFor="">¿Gestion Anterior?</label>
                            <div className='procedente-arquitectonico-article__div-conciderando__div-content__div-select'>
                                <select 
                                    className='procedente-arquitectonico-article__div-conciderando__div-content__div-select__select' 
                                >
                                    <option value="">Selecciona una opcion</option>
                                    <option value="si">Si</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </article>
            </section>*/}

            <section className='global-section-all '>
                <article className='procedente-arquitectonico-article'>
                    <div className='procedente-arquitectonico-article__div-concepto'>
                        <div className='procedente-arquitectonico-article__div-modelo__div-span'>
                            <span className='procedente-arquitectonico-article__div-modelo__div-span__span'>Concepto de Ingenieria</span>
                        </div>
                        <div className='procedente-arquitectonico-article__div-modelo__div-p'>
                            <textarea 
                                onChange={handleInputData}
                                value={procedenteIngenieria ? procedenteIngenieria.concepto_ingenieria : conceptoIngenieria}
                                name='concepto_ingenieria'
                                className='textarea-concepto-arquitectonico'
                            >

                            </textarea>
                        </div>
                    </div>
                </article>
            </section>

            <section className='global-section-all section-buttons-ci '>
                <PrimaryDropDown propOptions={dataFirmasIngenieros} propPlaceholderOption={'Seleccionar Firma'} propOnchangeFn={handleFirmas} />
                <PrimaryButton propFunction={() => ValidatorSelectFirmas(firma, handleGenerarProcedenteIngenieria, () => setNoExisteLaFirma(true)) } textButton={'Generar Documento'}/>
                <PrimaryButton propFunction={handleGuardarProcedente} textButton={'Guardar Procedente Tecnico'} />
            </section>

            {
                procedenteIngenieriaActualizado && 
                <Modal>
                    <BoxAlertNotification 
                        title={'Procedente de Ingenieria'}
                        message={'Procedente de Ingenieria actualizado con éxito'}
                        image={success}
                        alt={'Imagen de éxito'}
                        onClick={() => setProcedenteIngenieriaActualizado(false)}
                        textButton={'Volver al Procedente'}
                    />
                </Modal>
            }

            {
                noExisteLaFirma && 
                <Modal>
                    <BoxAlertNotification 
                        title={'Un error fue detectado'}
                        message={'Para generar el documento de procedente de Ingenieria tienes que seleccionar una firma'}
                        image={error}
                        alt={'Imagen de éxito'}
                        onClick={() => setNoExisteLaFirma(false)}
                        textButton={'Volver al Procedente'}
                    />
                </Modal>
            }

            {
                documentoGenerado &&
                <Modal>
                    <BoxAlertNotification 
                        title={'Procedente de Ingenieria'}
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

export default ProcedentesIngenieria
