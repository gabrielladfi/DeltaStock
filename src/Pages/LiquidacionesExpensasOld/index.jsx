import { useContext, useEffect, useState } from 'react'
import { LiquidacionesExpensasProvider } from './Context/LiquidacionesExpensasContext'
import './liquidacionesexpensas.scss'
import { GlobalState } from '../../Context/GlobalContext'
import { useServicesGet } from '../../Hooks/useServicesGet'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import PrimaryInputNumberValidator from '@/Components/Atoms/PrimaryInputNumberValidator'
import PrimaryButton from '@/Components/PrimaryButton'
import ViewDataInfoExpedienteLiquidaciones from '@/Components/Molecules/ViewDataInfoExpedienteLiquidaciones'
import { useServicePost } from '@/Api/useServicePost'
import { AuthContextState } from '@/Context/AuthContextContext'
import TotalLiquidacionInfo from '@/Components/Molecules/TotalLiquidacionInfo'
import Modal from '@/Components/Modal'
import { downloadFileFromPath, formatNumber } from '@/Utils/functions'
import { useServiceGet } from '@/Api/useServiceGet'
import FormGuardarLiquidacion from '@/Components/Molecules/FormGuardarLiquidacion'
import { useServicePut } from '@/Api/useServicePut'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import success from '@/assets/checkLogo.svg'

function LiquidacionesExpensas() {
    return (
        <LiquidacionesExpensasProvider>
            <LiquidacionesExpensasContent />
        </LiquidacionesExpensasProvider>
    )
}

function LiquidacionesExpensasContent() {

    const urbanizacionObj = [
        {id: 1, option: 'Desarrollo', value: 'desarrollo'},
        {id: 2, option: 'Reurbanización', value: 'reurbanizacion'},
        {id: 3, option: 'Saneamiento', value: 'saneamiento'},
    ];

    const subdivisionObj = [
        {id: 1, option: 'Rural', value: 'rural'},
        {id: 2, option: 'Urbana', value: 'urbana'},
        {id: 3, option: 'Autenticacion de Planos', value: 'planos'},
        {id: 4, option: 'Copia Adicional de Licencia', value: 'copia'},
        {id: 5, option: 'Reloteo', value: 'reloteo'},
    ];

    const construccionObj = [
        {id: 1, option: 'Obra nueva', value: 'obra_nueva'},
        {id: 2, option: 'Ampliación', value: 'ampliacion'},
        {id: 3, option: 'Adecuación', value: 'adecuacion'},
        {id: 4, option: 'Modificación', value: 'modificacion'},
        {id: 5, option: 'Restauración', value: 'restauracion'},
        {id: 6, option: 'Reforzamiento Estructural', value: 'reforzamiento_estructural'},
        {id: 7, option: 'Demolición parcial', value: 'demolicion_parcial'}, 
        {id: 8, option: 'Demolición total', value: 'demolicion_total'}, 
        {id: 9, option: 'Reconstrucción', value: 'reconstruccion'}, 
        {id: 10, option: 'Cerramiento', value: 'cerramiento'},
    ];

    const parcelacionObj = [
        {id: 1, option: 'Saneamiento', value: 'saneamiento'},
    ];

    const otrasActuacionesObj = [
        {id: 1, option: 'Ajuste de cotas de areas por proyecto', value: 'proyecto'},
        {id: 2, option: 'Aprobacion de planos de prop. horizontal', value: 'prop_horizontal'},
        {id: 3, option: 'Modificación de plano urbanistico', value: 'plano'},
        {id: 4, option: 'Concepto de norma urbanistica', value: 'norma'},
        {id: 5, option: 'Concepto de uso de suelo', value: 'suelo'},
        {id: 6, option: 'Aprobación de proyecto urbanistico', value: 'aprobacion_urbanistico'}
    ];

    const { token } = useContext(AuthContextState)

    const { globalNumeroRadicacion, openModalTotalLiquidacion, setOpenModalTotalLiquidacion, guardarLiquidacion, setGuardarLiquidacion, putLiquidacion, setPutLiquidacion } = useContext(GlobalState)
    const { fetchInformacionDeRadicacion } = useServicesGet()
    const [ dataRadicacion, setDataRadicacion ] = useState(null)

    console.log(globalNumeroRadicacion)

    const dataFetch = {
        numero_radicacion: globalNumeroRadicacion,
    }

    async function getInformacionRadicacion() {
        const respuesta = await fetchInformacionDeRadicacion(dataFetch.numero_radicacion)
        try {
            setDataRadicacion(respuesta)
        }catch (error) {
            console.log(error)
        }
    }

    const objetoDataRadicacion = dataRadicacion && dataRadicacion[0] ? dataRadicacion[0] : {}
   
    console.log(objetoDataRadicacion)

    useEffect(() => {
        getInformacionRadicacion()
    }
    , [globalNumeroRadicacion]) // ✅ Se ejecuta cuando el numero de radicacion cambia

    const [ stageOne, setStageOne ] = useState(true)
    const [ stageTwo, setStageTwo ] = useState(false)
    const [ stageThree, setStageThree ] = useState(false)

    function handleStageOne() {
        setStageOne(true)
        setStageTwo(false)
        setStageThree(false)
    }
    function handleStageTwo() {
        setStageOne(false)
        setStageTwo(true)
        setStageThree(false)
    }
    function handleStageThree() {
        setStageOne(false)
        setStageTwo(false)
        setStageThree(true)
    }

    const tipotramiteObj = [
        {id: 1, option: 'Licencia de construcción', value: 'Construcción'},
        {id: 2, option: 'Urbanización', value: 'Urbanización'},
        {id: 3, option: 'Subdivisión', value: 'Subdivisión'},
        {id: 4, option: 'Otras Actuaciones', value: 'Otros'},
        {id: 5, option: 'Parcelación', value: 'Parcelación'},
        {id: 6, option: 'VIS', value: 'VIS'},
    ]

    const estratos = [
        {id: 1, option: 'Estrato 1', value: '1'},
        {id: 2, option: 'Estrato 2', value: '2'},
        {id: 3, option: 'Estrato 3', value: '3'},
        {id: 4, option: 'Estrato 4', value: '4'},
        {id: 5, option: 'Estrato 5', value: '5'},
        {id: 6, option: 'Estrato 6', value: '6'},
    ]

    const usos = [
        {id: 1, option: 'Vivienda', value: 'Vivienda'},
        {id: 2, option: 'Comercial', value: 'Comercial'},
        {id: 3, option: 'Industrial', value: 'Industrial'},
        {id: 4, option: 'Institucional', value: 'Institucional'},
        {id: 5, option: 'Otros', value: 'Otros'},
    ]


    const initialValues = {
        numero_radicacion: globalNumeroRadicacion,
        estrato: "",
        usos: "",
        area_residencial: 0,
        area_comercial: 0,
        area_industrial: 0,
        area_institucional: 0,
        descripcion_tramite: "",
        descripcion_modalidad: "",
        cf_subtotal: "0.00",
        cf_total: "0.00",
        cv_subtotal: "0.00",
        cv_total: "0.00",
        valor_liquidado: "0",
        valor_iva: "0",
        pago: false,
    }

    const [ formValues, setFormValues ] = useState(initialValues);

    function handleChange({ target}) {
        const { name, value } = target
        setFormValues({ ...formValues, [name]: value })
    }

    console.log(formValues)

    const url = 'https://apiv1.deltapro.com.co/deltacu/liquidaciones/calculo/'

    const{ data: dataLiquidaciones, refresh: refreshLiquidaciones } = useServiceGet(token, url)

    const { executePost, data } = useServicePost()


    console.log(dataFetch)

    const handlePostData = async () => {
        try {
            // Convert area to number before sending
            const dataToSend = {
                ...formValues,
                area: Number(formValues.area)
            };
            console.log('Sending data:', dataToSend);
            const respuesta = await executePost(token, url, dataToSend);
            console.log('Raw response:', respuesta);
            setFormValues(initialValues);
            setOpenModalTotalLiquidacion(true)
            refreshLiquidaciones()
        } catch (error) {
            console.error('Error in POST request:', error);
        }
    }

    function handleGenerateLiquidacion() {
        window.open(
            `https://apiv1.deltapro.com.co/deltacu/docs?filename=${data.filepath}`,
            '_blank'
        );
    }

    
    
    console.log(dataLiquidaciones)

    const formatNumberWithoutDots = (value) => {
        if (!value && value !== 0) return '';
        
        // Remove any dots and non-numeric characters
        return value.toString().replace(/[^\d]/g, '');
    }

    const handleGuardarLiquidacion = () => {
        setGuardarLiquidacion(true)
        refreshLiquidaciones()
    }

    const dataInicialGuardarLiquidacion = {
        numero_radicacion: globalNumeroRadicacion,
        valor_liquidado: 0,
        valor_iva: 0,
        pago: false
    }

    const [ formValuesGuardarLiquidacion, setFormValuesGuardarLiquidacion ] = useState(dataInicialGuardarLiquidacion)

    function handleChangeGuardarLiquidacion({ target}) {
        const { name, value } = target
        setFormValuesGuardarLiquidacion({ ...formValuesGuardarLiquidacion, [name]: formatNumberWithoutDots(value) })
    }

    const handleChangeGuardarLiquidacionPago = ({ target}) => {
        const { name, value } = target
        setFormValuesGuardarLiquidacion({ ...formValuesGuardarLiquidacion, [name]: value })
    }
    

    console.log(formValuesGuardarLiquidacion)

    const { executePost: executePostGuardarLiquidacion } = useServicePost()

    const handleGuardarLiquidacionPost = async () => {
        await executePostGuardarLiquidacion(token,'https://apiv1.deltapro.com.co/deltacu/liquidaciones/registro/', formValuesGuardarLiquidacion)
        refreshLiquidaciones()
        setFormValuesGuardarLiquidacion(dataInicialGuardarLiquidacion)
    }

    
    const formatNumberWithDots = (value) => {
        if (!value && value !== 0) return '';
        
        // Remove any existing dots and non-numeric characters
        const cleanNumber = value.toString().replace(/[^\d]/g, '');
        
        // Handle empty string case
        if (!cleanNumber) return '0';
        
        // Convert to number to remove leading zeros
        const numberValue = Number(cleanNumber);
        
        // Convert back to string and add dots
        return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    

    const handleCloseModalGuardarLiquidacion = () => {
        setFormValuesGuardarLiquidacion(dataInicialGuardarLiquidacion)
        setGuardarLiquidacion(false)
    }

    const handleCloseModalGuardarLiquidacionput = () => {
        setPutLiquidacion(false)
    }

    const [ liquidacionSeleccionada, setLiquidacionSeleccionada ] = useState(null)

    const handleLiquidacionSeleccionada = (item) => {
        setLiquidacionSeleccionada(item)
        setPutLiquidacion(true)
    }

    console.log(liquidacionSeleccionada)


    const handleChangeGuardarLiquidacionPagoPut = ({ target}) => {
        const { name, value } = target
        setLiquidacionSeleccionada({ ...liquidacionSeleccionada, [name]: value })
    }

    function handleChangePut({ target}) {
        const { name, value } = target
        setLiquidacionSeleccionada({ ...liquidacionSeleccionada, [name]: value })
    }

    const { executePut: executePutLiquidacion } = useServicePut()

    const handlePutLiquidacion = async () => {
        await executePutLiquidacion(token, `${url}${liquidacionSeleccionada.id}/`, liquidacionSeleccionada)
        refreshLiquidaciones()
        setPutLiquidacion(false)
    }

    const { executePost: generateDocument } = useServicePost()


    async function handleGenerateDocument() {
        const data = {
            num_radicacion: globalNumeroRadicacion
        };
    
        try {
            const response = await generateDocument(token, 'https://apiv1.deltapro.com.co/deltacu/liquidaciones/calculo/docx/', data); // Retorna los datos directamente
            if (response?.file_path) {
                downloadFileFromPath(response.file_path);
            } else {
                console.error('No se pudo generar el enlace para el acta legal');
            }
        } catch (error) {
            console.error('Error al generar el acta legal:', error);
        }
    }


    return (
        <PrincipalPage pathActive={'Liquidaciones'}>
                    
                    <div className='liquidacionesexpensas'>
                    <section className='liquidacionesexpensas__section--buttons'>
                        <div onClick={handleStageOne}  className='liquidacionesexpensas__section--buttons__button'>Calcular Valor Variable</div>
                        <div onClick={handleStageTwo} className='liquidacionesexpensas__section--buttons__button'>Información Expediente</div>
                        <div onClick={handleStageThree} className='liquidacionesexpensas__section--buttons__button'>Valores Actualizados</div>
                    </section>
                    <section className='liquidacionesexpensas__section--content'>
                        {
                            stageOne &&
                            <div className='liquidacionesexpensas__section--content__div'>
                                <PrimaryDropDown 
                                    propName={'descripcion_tramite'}
                                    propOnchangeFn={handleChange}
                                    propValue={formValues.descripcion_tramite}
                                    propOptions={tipotramiteObj}
                                    textLabel={'Tipo de Trámite *'}
                                    classNameContainer={'liquidacionesexpensas__inputnum--container'}
                                    propPlaceholderOption={'Seleccione una Opcion'}
                                    classNameLabel={'liquidacionesexpensas__inputnum--label'}
                                />
                                <PrimaryDropDown 
                                    propName={'descripcion_modalidad'}
                                    propOnchangeFn={handleChange}
                                    propValue={formValues.descripcion_modalidad}
                                    propOptions={
                                        formValues.descripcion_tramite === 'Urbanización' ? urbanizacionObj :
                                        formValues.descripcion_tramite === 'Subdivisión' ? subdivisionObj :
                                        formValues.descripcion_tramite === 'Otros' ? otrasActuacionesObj :
                                        formValues.descripcion_tramite === 'Parcelación' ? parcelacionObj :
                                        formValues.descripcion_tramite === 'Construcción' ? construccionObj :
                                        []
                                    }
                                    textLabel={'Modalidad de Trámite *'}
                                    classNameContainer={'liquidacionesexpensas__inputnum--container'}
                                    propPlaceholderOption={'Seleccione una Opcion'}
                                    classNameLabel={'liquidacionesexpensas__inputnum--label'}
                                />
                                <PrimaryInputNumberValidator 
                                    name={'area_residencial'}
                                    onChange={handleChange}
                                    value={formValues.area_residencial}
                                    textLabel='Área Residencial *'
                                    placeholder='Ingrese Área'
                                    className='liquidacionesexpensas__inputnum'
                                    classNameContainer='liquidacionesexpensas__inputnum--container'
                                    classNameLabel='liquidacionesexpensas__inputnum--label'
                                />
                                <PrimaryInputNumberValidator 
                                    name={'area_comercial'}
                                    onChange={handleChange}
                                    value={formValues.area_comercial}
                                    textLabel='Área Comercial *'
                                    placeholder='Ingrese Área'
                                    className='liquidacionesexpensas__inputnum'
                                    classNameContainer='liquidacionesexpensas__inputnum--container'
                                    classNameLabel='liquidacionesexpensas__inputnum--label'
                                />
                                <PrimaryInputNumberValidator 
                                    name={'area_industrial'}
                                    onChange={handleChange}
                                    value={formValues.area_industrial}
                                    textLabel='Área Industrial *'
                                    placeholder='Ingrese Área'
                                    className='liquidacionesexpensas__inputnum'
                                    classNameContainer='liquidacionesexpensas__inputnum--container'
                                    classNameLabel='liquidacionesexpensas__inputnum--label'
                                />
                                <PrimaryInputNumberValidator 
                                    name={'area_institucional'}
                                    onChange={handleChange}
                                    value={formValues.area_institucional}
                                    textLabel='Área Institucional *'
                                    placeholder='Ingrese Área'
                                    className='liquidacionesexpensas__inputnum'
                                    classNameContainer='liquidacionesexpensas__inputnum--container'
                                    classNameLabel='liquidacionesexpensas__inputnum--label'
                                />
                                <PrimaryDropDown
                                    propName={'usos'}
                                    propOnchangeFn={handleChange}
                                    propValue={formValues.usos}
                                    propOptions={usos}
                                    textLabel={'Usos *'}
                                    classNameContainer={'liquidacionesexpensas__inputnum--container'}
                                    propPlaceholderOption={'Seleccione una Opcion'}
                                    classNameLabel={'liquidacionesexpensas__inputnum--label'} 
                                />
                                <PrimaryDropDown 
                                    propName={'estrato'}
                                    propOnchangeFn={handleChange}
                                    propValue={formValues.estrato}
                                    propOptions={estratos}
                                    textLabel={'Estrato *'}
                                    classNameContainer={'liquidacionesexpensas__inputnum--container'}
                                    propPlaceholderOption={'Seleccione una Opcion'}
                                    classNameLabel={'liquidacionesexpensas__inputnum--label'}
                                />
                                <PrimaryButton 
                                    propFunction={handlePostData}
                                    textButton={'Generar Liquidacion'}
                                />
                                <PrimaryButton 
                                    propFunction={handleGenerateDocument}
                                    textButton={'Generar Documento'}
                                />
                            </div>
                        }
                        {
                            stageTwo &&
                            <div className='liquidacionesexpensas__section--content__div-stage-two'>
                                <ViewDataInfoExpedienteLiquidaciones 
                                    numero_radicacion={objetoDataRadicacion.numero_radicacion}
                                    tipo_tramite={objetoDataRadicacion.descripcion_tramite}
                                    modalidad_tramite={objetoDataRadicacion.descripcion_modalidad}
                                    usos={objetoDataRadicacion.usos}
                                    nombre_solicitante={objetoDataRadicacion.nombre_solicitante}
                                    dni_solicitante={objetoDataRadicacion.dni_solicitante}
                                    phone_solicitante={objetoDataRadicacion.phone_solicitante}
                                    email_solicitante={objetoDataRadicacion.email_solicitante}
                                />
                            </div>
                        }
                        {
                            stageThree &&
                            <div className='liquidacionesexpensas__section--content__div-stage-three'>
                                <h3>Liquidaciones</h3>
                                {
                                    dataLiquidaciones?.length === 0 ?
                                    <h3>Sin registros</h3>
                                    :
                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div-container'>
                                        {
                                            dataLiquidaciones.map((item) => (
                                                <div key={item.id} className='liquidacionesexpensas__section--content__div-stage-three__div--container'>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Numero de radicacion</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.numero_radicacion}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Tipo de Trámite</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.descripcion_tramite}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Modalidad de Trámite</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.descripcion_modalidad}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Usos</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.usos}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Estrato</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.estrato}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Area Residencial</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.area_residencial}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Area Comercial</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.area_comercial}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Area Industrial</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.area_industrial}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Area Institucional</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.area_institucional}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Valor CF Subtotal</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{formatNumber(item.cf_subtotal)}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Valor CF Total</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{formatNumber(item.cf_total)}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Valor CV Subtotal</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{formatNumber(item.cv_subtotal)}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Valor CV Total</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{formatNumber(item.cv_total)}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Valor Liquidado</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{formatNumber(item.valor_liquidado)}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Valor IVA</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{formatNumber(item.valor_iva)}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p--title'>Pago</p>
                                                        <p className='liquidacionesexpensas__section--content__div-stage-three__div__p'>{item.pago ? 'Realizado' : 'Pendiente'}</p>
                                                    </div>
                                                    <div className='liquidacionesexpensas__section--content__div-stage-three__div'>
                                                        <PrimaryButton propFunction={() => handleLiquidacionSeleccionada(item)} textButton='Editar Liquidacion' />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        
                                    </div>

                                }   
                            </div>

                        }

                    </section>

                    </div>
                    

                    {/*<section className='nuevaradicacion-genarales'>
                        <article className='nuevaradicacion-genarales__article liquidacionesexpensas__article--modificado'>
                        <h3 className='nuevaradicacion-genarales__article__h3'>Número Radicación</h3>
                            <p className='nuevaradicacion-genarales__article__p'>{globalNumeroRadicacion}</p>
                        </article>
                    </section>
                    <section className='nuevaradicacion-genarales'>
                        <article className='nuevaradicacion-genarales__article liquidacionesexpensas__article--modificado'>
                        <h3 className='nuevaradicacion-genarales__article__h3'>NIT</h3>
                            <p className='nuevaradicacion-genarales__article__p'>400345942-3</p>
                        </article>
                    </section>
                    <section className='nuevaradicacion-genarales'>
                        <article className='nuevaradicacion-genarales__article liquidacionesexpensas__article--modificado'>
                        <h3 className='nuevaradicacion-genarales__article__h3'>Nombre Radicador</h3>
                            <p className='nuevaradicacion-genarales__article__p'>{objetoDataRadicacion.nombre_solicitante}</p>
                        </article>
                    </section>

                    <section className='nuevaradicacion-solicitantes'>
                        <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                                <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Datos Generales</h2>
                            </div>
                       
                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Fecha</label>
                                <input 
                                    className='input-base__input' 
                                    type="date" 
                                    name='fecha'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Ciudad</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Referencia</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Valor Escrito (MAYUSCULAS)</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Valor numerico</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Organizacion</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>
                        </article>
                    </section>

                    <section className='nuevaradicacion-solicitantes'>
                        <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                                <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Concepto</h2>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Tipo de concepto</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Categoria de cocepto</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Unidad</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Area</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Cargo Variable</label>
                                <select 
                                    className='input-base__select' 
                                    name='tipo_persona'
                                >
                                    <option selected value="">Seleccione Cargo Variable</option>
                                    <option value="20.02">20.02%</option>
                                    <option value="11.16">11.16%</option>
                                </select>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Estrato</label>
                                <select 
                                    className='input-base__select' 
                                    name='tipo_persona'
                                >
                                    <option selected value="">Seleccione Estrato</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Tipo de Proyecto</label>
                                <select 
                                    className='input-base__select' 
                                    name='tipo_persona'
                                >
                                    <option selected value="">Seleccione Tipo de Proyecto</option>
                                    <option value="Institucional">Institucional</option>
                                    <option value="Comercial">Comercial</option>
                                    <option value="Industrial">Industrial</option>
                                </select>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Excepciones</label>
                                <select 
                                    className='input-base__select' 
                                    name='tipo_persona'
                                >
                                    <option selected value="">Seleccione Excepciones</option>
                                    <option value="Institucional">Modificacion Licencia</option>
                                    <option value="Comercial">VIS</option>
                                    <option value="Industrial">Dotación Publico</option>
                                </select>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">IVA</label>
                                <select 
                                    className='input-base__select' 
                                    name='tipo_persona'
                                >
                                    <option selected value="">Seleccione IVA</option>
                                    <option value="19">19%</option>
                                    <option value="0">0%</option>
                                </select>
                            </div>
                        </article>
                    </section>

                    <section className='nuevaradicacion-solicitantes'>
                        <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                                <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Datos de cuenta</h2>
                            </div>
                       
                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Entidad Bancaria</label>
                                <div className='input-base__input datos-cuenta-div'>
                                    <p>Bancolombia</p>
                                </div>
                                
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Tipo de Cuenta</label>
                                <div className='input-base__input datos-cuenta-div'>
                                    <p>Corriente</p>
                                </div>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Numero de Cuenta</label>
                                <div className='input-base__input datos-cuenta-div'>
                                    <p>51645618033</p>
                                </div>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Titular Cuenta</label>
                                <div className='input-base__input datos-cuenta-div'>
                                    <p>Mónica Villalobos</p>
                                </div>
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Observaciones</label>
                                <textarea 
                                    className='input-base__input textarea-observaciones-datos-cuenta' 
                                    type="text" 
                                    name='nombre_solicitante'
                                    placeholder='Ingrese sus observaciones'
                                />
                            </div>

                        </article>
                    </section>

                    <section className='footer-section'>
                        <button  className='footer-section__button'>Generar Liquidacion</button>
                    </section>*/}

                    {
                        <Modal>
                            {
                                openModalTotalLiquidacion &&
                                <BoxAlertNotification 
                                    title='Liquidacion Generada con exito'
                                    message='El proceso de liquidacion se ha completado con exito'
                                    alt='Imagen de alerta'
                                    onClick={() => setOpenModalTotalLiquidacion(false)}
                                    textButton='Cerrar'
                                    image={success}
                                />
                            }
                        </Modal>
                    }
                    {
                        guardarLiquidacion &&
                        <Modal>
                            <FormGuardarLiquidacion
                                closeModal={handleCloseModalGuardarLiquidacion}
                                numero_radicacion={globalNumeroRadicacion}
                                valorLiquidado={formatNumberWithDots(formValuesGuardarLiquidacion.valor_liquidado)}
                                valorIva={formatNumberWithDots(formValuesGuardarLiquidacion.valor_iva)}
                                pago={formValuesGuardarLiquidacion.pago}
                                handleChange={handleChangeGuardarLiquidacion}
                                handleGuardarLiquidacion={handleGuardarLiquidacionPost}
                                handleChangeGuardarLiquidacionPago={handleChangeGuardarLiquidacionPago}
                            />
                        </Modal>
                    }
                    {
                        putLiquidacion &&
                        <Modal>
                            <FormGuardarLiquidacion 
                                closeModal={handleCloseModalGuardarLiquidacionput}
                                numero_radicacion={liquidacionSeleccionada.numero_radicacion}
                                descripcion_tramite={liquidacionSeleccionada.descripcion_tramite}
                                descripcion_modalidad={liquidacionSeleccionada.descripcion_modalidad}
                                cargo_variable={liquidacionSeleccionada.cargo_variable}
                                area_residencial={liquidacionSeleccionada.area_residencial}
                                area_comercial={liquidacionSeleccionada.area_comercial}
                                area_industrial={liquidacionSeleccionada.area_industrial}
                                area_institucional={liquidacionSeleccionada.area_institucional}
                                usos={liquidacionSeleccionada.usos}
                                estrato={liquidacionSeleccionada.estrato}
                                valorLiquidado={formatNumberWithDots(liquidacionSeleccionada.valor_liquidado)}
                                valorIva={formatNumberWithDots(liquidacionSeleccionada.valor_iva)}
                                pago={liquidacionSeleccionada.pago}
                                handleChange={handleChangePut}
                                handleGuardarLiquidacion={handlePutLiquidacion}
                                handleChangeGuardarLiquidacionPago={handleChangeGuardarLiquidacionPagoPut}
                            />
                        </Modal>
                    }


        </PrincipalPage>
    )
}

export default LiquidacionesExpensas
