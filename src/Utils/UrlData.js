export const urlBase = 'https://apiv1.deltapro.com.co/deltacu/';
export const numeroRadicacion = 'numradicacion/';
export const urlPostNuevaRadicacion = 'v1/tramites/';
export const urlPostObtenerIdVecinos = 'vecinos/obtener/';
export const urlGetObtenerIdVecinosPorRadicacion = 'vecinos/buscar/?numero_radicacion=';
export const urlCrearVecinos = 'vecinos/';
export const urleliminarVecinos = 'vecinos/?id=';
export const urlCrearPredio = 'predios/';
export const urlCrearActa = 'vecinos/acta';
export const urlObtenerRequisitosNumradicacion = 'requisitos/buscar/?numero_radicacion=';
export const urlGetListadoRadicaciones = 'v1/tramites/';
export const urlPutActualizarEstadoRequisito = 'requisito/';
export const urlDeleteRequisito = 'requisito/';
export const urlPostNuevoRequisito = 'requisitos/'
export const urlCrearRadicacionIncompleta = 'radicacion/incompleta/'
export const urlObtenerListadoDePredios = 'v1/tramites/'
export const urlObtenerListadoDePrediosPorRadicacion = 'predios/buscar/?numero_radicacion='
export const urlEliminarPredioPorId = 'predios/'
export const urlInformacionDeRadicacion = 'radicacion/buscar/?numero_radicacion='
export const urlGenerarValla = 'valla/'
export const urlGenerarActaLegal = 'legalydebida/acta/'
export const urlGetObtenerListadoObservacionesNumeroRadicacion = 'observaciones/buscar/?numero_radicacion='
export const urlPostNuevaObservacion = 'observacion/'
export const urlActualizarObservacion = 'observacion/'

//endpoints para el flujo de titulares
export const urlGetObtenerListadoTitulares = 'titulares/buscar/?numero_radicacion='
export const urlPostNuevoTitular = 'titulares/'
export const urlEliminarTitularPorId = 'titulares/'

//endpoints para el flujo de responsables
export const urlGetObtenerListadoResponsables = 'responsables/buscar/?numero_radicacion='
export const urlPostNuevoResponsable = 'responsables/'
export const urlEliminarResponsablePorId = 'responsables/'

export const urlHistorialDeCategorias = 'categorias/buscar/?num_radicacion='

export const urlObtenerLosEncargados =  'encargados/buscar/?numero_radicacion='
export const urlActualizarEncargados = 'encargados/'

export const urlObtenerlistadoHistorial = 'historia/buscar/?numero_radicacion='
export const urlPostNuevaHistoria = 'historia/'
export const urlActualizarHistoria = 'historia/'

export const generarDocumentosObservaciones = 'observacion/generardoc/'


export const urllistadoProcedenteJuridico = 'procedentes/juridicos/buscar/?numero_radicacion='
export const urlCrearProcedenteJuridico = 'procedentes/juridicos/'

export const urlGetListadoDocumentosRevisados = 'procedentes/documentos/buscar/?numero_radicacion='
export const urlCrearDocumentoRevisado = 'procedentes/documentos/'
export const urlActualizarDocumentoRevisado = 'procedentes/documentos/'

export const urlPostProcedenteArquitectonico = 'procedentes/arquitectonicos/'
export const urlGetProcedenteArquitectonico = 'procedentes/arquitectonicos/buscar/?numero_radicacion='
export const urlPutProcedenteArquitectonico = 'procedentes/arquitectonicos/'


//url configutracion de Liquidaciones y Expensas 
export const urlGetConfiguracionCargoVariableVivienda = 'configuracion/cargofijo/'
export const urlPutConfiguracionCargoVariableVivienda = 'configuracion/cargofijo'
export const urlGetConfiguracionCargoComercial = 'configuracion/cargocomercial/'
export const urlPutConfiguracionCargoComercial = 'configuracion/cargocomercial'
export const urlGetConfiguracionCargoUrbano = 'configuracion/cargourbanismo/'
export const urlPutConfiguracionCargoUrbano = 'configuracion/cargourbanismo'


//url para generar documentos en procedentes 
export const urlGenerarDocumentosProcedenteJuridico = 'procedentes/generardoc/juridico/'
export const urlGenerarDocumentosProcedenteArquitectonico = 'procedentes/generardoc/arquitectonico/'
export const urlGenerarDocumentosProcedenteIngenieria = 'procedentes/generardoc/ingenieria/'

//urls para el flujo de procedentes de ingenieria
export const urlGetProcedenteIngenieria = 'procedentes/ingenieria/buscar/?numero_radicacion='
export const urlPostProcedenteIngenieria = 'procedentes/ingenieria/'

//urls to POST, GET and DELETE the tax registration flow
export const urlGetDataTaxRegistration = 'impuestos/buscar/?numero_radicacion='
export const urlPostTaxRegistration = 'impuestos/'
export const urlDeleteTaxRegistration = 'impuestos/'

//urls to POST, GET, PUT and DELETE the administrative act flow
export const urlGetDataAdministrativeAct = 'actoadministrativo/buscar/?numero_radicacion='
export const urlPostAdministrativeAct = 'actoadministrativo/'
export const urlPutAdministrativeAct = 'actoadministrativo/'
export const urlDeleteAdministrativeAct = 'actoadministrativo/'

//urls to POST, GET, PUT and DELETE to ventanilla flow
export const urlGetDataVentanilla = 'oficios/v2/?numero_radicacion='
export const urlPostVentanilla = 'oficios/v2/'
export const urlPutVentanilla = 'oficios/v2/'   
export const urlDeleteVentanilla = 'oficios/v2/'

//url POST para generar rl documento de viavilidad tecnica
export const urlGenerarDocumentoViabilidadTecnica = 'viabilidad/documentos/'

//url crear POST para generar stcker de entrada 
export const urlGenerarStickerEntrada = 'sticker/entrada/'

//url crear POST para generar stcker de salida 
export const urlGenerarStickerSalida = 'sticker/salida/'

//url para obtener todos los oficios de entrada de ventanilla
export const urlGetAllOficiosVentanilla = 'oficios/v2/'

//url para obtener todos los tramites
export const urlGetTodoLosTramites = 'v1/tramites/'
