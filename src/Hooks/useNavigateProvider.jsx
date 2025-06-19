/**
 * Hook personalizado que proporciona funciones de navegación para toda la aplicación
 * 
 * Este hook encapsula el uso de useNavigate de react-router-dom y expone funciones
 * de navegación predefinidas para todas las rutas de la aplicación.
 * 
 * Funcionamiento:
 * - Utiliza el hook useNavigate de react-router-dom para manejar la navegación
 * - Define funciones individuales para navegar a cada ruta específica de la app
 * - Cada función de navegación es un wrapper que llama a navigate con la ruta correspondiente
 * - Las rutas están organizadas por secciones/funcionalidades (ej: liquidaciones, actos administrativos, etc)
 * - Exporta un objeto con todas las funciones de navegación para ser usadas en otros componentes
 * 
 * Este enfoque centralizado permite:
 * - Mantener todas las rutas en un solo lugar
 * - Reutilizar la lógica de navegación
 * - Hacer cambios de rutas fácilmente modificando solo este archivo
 * - Tener nombres descriptivos para cada navegación
 */

import { useNavigate } from "react-router-dom"

function useNavigateProvider() {

    const navigate = useNavigate()

    const navigateToLogin = () => {navigate('/')}

    const navigateToNuevaRadicacion = () => {navigate('/nueva-radicacion')}
    const navigateToMenu = () => {navigate('/menu')}
    const navigateToNuevaSolicitud = () => {navigate('/nueva-solicitud')}
    const navigateToBuscarPredio = () => {navigate('/buscar-predio')}
    const navigateToInformacionPredio = () => {navigate('/informacion-predio')}
    const navigateToEstadoRequisitos = () => {navigate('/estado-requisitos')} 
    const navigateToListadoRadicacionesRequisitos = () => {navigate('/requisitos/buscar-tramite')}
    const navigateToPredioPorNumeroRadicacion = () => {navigate('/predio')}
    const navigateToAgregarNuevoPredio = () => {navigate('/agregar-nuevo-predio')}
    const navigateToBuscadorObservaciones = () => {navigate('/buscador-observaciones')}
    const navigateToObservaciones = () => {navigate('/observaciones')}
    const navigateToBuscadorProcedenteJuridico = () => {navigate('/buscador-procedentes-juridicos')}
    const navigateToProcedenteJuridico = () => {navigate('/procedentes-juridicos')}
    const navigateToBuscadorLiquidaciones = () => {navigate('/buscador-liquidaciones')}
    const navigateToLiquidacionesExpensas = () => {navigate('/liquidaciones-expensas')}
    const navigateToBuscadorTitulares = () => {navigate('/buscador-titulares')}
    const navigateToTitulares = () => {navigate('/titulares')}
    const navigateToBuscadorResponsables = () => {navigate('/buscador-responsables')}
    const navigateToResponsables = () => {navigate('/responsables')}
    const navigateToBuscadorOficios = () => {navigate('/buscador-oficios')}
    const navigateToOficios = () => {navigate('/oficios')}
    const navigateToBuscadorActosAdministrativos = () => {navigate('/buscador-actos-administrativos')}
    const navigateToActosAdministrativos = () => {navigate('/actos-administrativos')}
    const navigateToBuscadorCambioDeResponsable = () => {navigate('/buscador-cambio-responsables')}
    const navigateToCambioDeResponsable = () => {navigate('/cambio-responsables')}
    const navigateToBuscadorHistorias = () => {navigate('/buscador-historias')}
    const navigateToHistorias = () => {navigate('/historias')}
    const navigateToProcedentesArquitectonicos = () => {navigate('/procedentes-arquitectonicos')}
    const navigateToProcedentesIngenieria = () => {navigate('/procedentes-ingenieria')}
    const navigateToBuscadorDeGenerarValla = () => {navigate('/buscador-de-generar-valla')}
    const navigateToBuscadorDeFechas = () => {navigate('/buscador-de-fechas')}
    const navigateToFechas = () => {navigate('/control-fechas')}
    const navigateToBuscadorDeExpedientes = () => {navigate('/busqueda-por-expediente')}
    const navigateToMenuNumeroRadicacion = () => {navigate('/menu-por-expediente')}
    const navigateToConfiguracion = () => {navigate('/configuracion')}
    const navigateToTablaDeResultadosLogico = () => {navigate('/tablas-de-resultados')}
    const navigateToReportes = () => {navigate('/reportes')}
    


    //Navegacion del flujo de liquidaciones
    const navigateToMenuLiquidaciones = () => {navigate('/menu-liquidaciones')}
    const navigateToCargoVariableVivienda = () => {navigate('/cargo-variable-vivienda')}


    //navegacion de viabilidad tecnica
    const navigateToBuscadorDeViabilidadTecnica = () => {navigate('/buscador-viabilidad-tecnica')}
    const navigateToViabilidadTecnica = () => {navigate('/viabilidad-tecnica')}

    //navigation to administrative act
    const navigateToSearchAdministrativeAct = () => {navigate('/buscador-acto-administrativo')}
    const navigateToAdministrativeAct = () => {navigate('/acto-administrativo')}

    //navigation to tax registration
    const navigateToSearchTaxRegistration = () => {navigate('/buscador-registro-impuestos')}
    const navigateToTaxRegistration = () => {navigate('/registro-impuestos')}

    //navigate entrada ventanilla
    const navigateToBuscadorDeEntradaVentanilla = () => {navigate('/buscador-entrada-ventanilla')}
    const navigateToEntradaVentanilla = () => {navigate('/entrada-ventanilla')}

    //navegacion para ver todos los oficios 
    const navigateToBuscadorDeTodosOficios = () => {navigate('/buscador-todos-oficios')}

    //navegacion reportes
    const navigateToReporteCatastral = () => {navigate('/reporte-catastral')}
    const navigateToReporteDane = () => {navigate('/reporte-dane')}
    //navegacion para otras actuaciones
    const navigateToOtrasActuacionesNuevoTramite = () => {navigate('/otras-actuaciones-nuevo-tramite')}
    const navigateToOtrasActuacionesPredio = () => {navigate('/otras-actuaciones-predio')}
    const navigateToOtrasActuacionesTitulares = () => {navigate('/otras-actuaciones-titulares')}
    const navigateToOtherActionsHistory = () => {navigate('/otras-actuaciones-historia')}
    const navigateToOtrasActuacionesListado = () => {navigate('/otras-actuaciones-listado')}

    //navegacion para buscador de otros actos
    const navigateToBuscadorDeOtrosActos = () => {navigate('/buscador-de-otros-actos')}

    //navegacion para listado de predios otros actos
    const navigateToOtrasActuacionesListadoPredios = () => {navigate('/otras-actuaciones-listado-predios')}

    //navegacion para buscador de otros actos titulares
    const navigateToBuscadorDeOtrosActosTitulares = () => {navigate('/buscador-de-otros-actos-titulares')}

    //navegacion para listado de titulares otros actos
    const navigateToOtrasActuacionesListadoTitulares = () => {navigate('/otras-actuaciones-listado-titulares')}

    //navegacion para buscador de otros actos historias
    const navigateToBuscadorDeOtrosActosHistorias = () => {navigate('/buscador-de-otros-actos-historias')}

    //navegacion para listado de historias otros actos
    const navigateToOtrasActuacionesListadoHistorias = () => {navigate('/otras-actuaciones-listado-historias')}


    //navegacion para mvp de inventarios
    const navigateToStock = () => {navigate('/stock')}
    const navigateToUbicaciones = () => {navigate('/ubicaciones')}
    const navigateToFabricantes = () => {navigate('/fabricantes')}
    const navigateToProveedores = () => {navigate('/proveedores')}
    const navigateToPiezas = () => {navigate('/piezas')}
    const navigateToOrdenesDeCompra = () => {navigate('/ordenes-de-compra')}


    return {
        navigateToNuevaRadicacion,
        navigateToMenu,
        navigateToNuevaSolicitud,
        navigateToBuscarPredio,
        navigateToInformacionPredio,
        navigateToEstadoRequisitos,
        navigateToListadoRadicacionesRequisitos,
        navigateToPredioPorNumeroRadicacion,
        navigateToAgregarNuevoPredio,
        navigateToBuscadorObservaciones,
        navigateToObservaciones,
        navigateToBuscadorProcedenteJuridico,
        navigateToProcedenteJuridico,
        navigateToBuscadorLiquidaciones,
        navigateToLiquidacionesExpensas,
        navigateToBuscadorTitulares,
        navigateToTitulares,
        navigateToBuscadorResponsables,
        navigateToResponsables,
        navigateToBuscadorOficios,
        navigateToOficios,
        navigateToBuscadorActosAdministrativos,
        navigateToActosAdministrativos,
        navigateToBuscadorCambioDeResponsable,
        navigateToCambioDeResponsable,
        navigateToBuscadorHistorias,
        navigateToHistorias,
        navigateToProcedentesArquitectonicos,
        navigateToProcedentesIngenieria,
        navigateToBuscadorDeGenerarValla,
        navigateToBuscadorDeFechas,
        navigateToFechas,
        navigateToBuscadorDeExpedientes,
        navigateToMenuNumeroRadicacion,
        navigateToConfiguracion,
        navigateToMenuLiquidaciones,
        navigateToCargoVariableVivienda,
        navigateToTablaDeResultadosLogico,
        navigateToBuscadorDeViabilidadTecnica,
        navigateToViabilidadTecnica,
        navigateToSearchAdministrativeAct,
        navigateToAdministrativeAct,
        navigateToSearchTaxRegistration,
        navigateToTaxRegistration,
        navigateToBuscadorDeEntradaVentanilla,
        navigateToEntradaVentanilla,
        navigateToBuscadorDeTodosOficios,
        navigateToLogin,
        navigateToReportes,
        navigateToReporteCatastral,
        navigateToOtrasActuacionesNuevoTramite,
        navigateToOtrasActuacionesPredio,
        navigateToOtrasActuacionesTitulares,
        navigateToOtherActionsHistory,
        navigateToOtrasActuacionesListado,
        navigateToBuscadorDeOtrosActos,
        navigateToOtrasActuacionesListadoPredios,
        navigateToBuscadorDeOtrosActosTitulares,
        navigateToOtrasActuacionesListadoTitulares,
        navigateToBuscadorDeOtrosActosHistorias,
        navigateToOtrasActuacionesListadoHistorias,
        navigateToReporteDane,
        navigateToStock,
        navigateToUbicaciones,
        navigateToFabricantes,
        navigateToProveedores,
        navigateToPiezas,
        navigateToOrdenesDeCompra
    }
}

export { useNavigateProvider }