/**
 * Hook que provee las rutas de la aplicación usando react-router-dom
 * Centraliza todas las rutas y sus componentes correspondientes en un solo lugar
 */

import { useRoutes } from "react-router-dom";
import Login from "../Pages/Login";
import Menu from "../Pages/Menu";
import NuevaRadicacion from "../Pages/NuevaRadicacion";
import CrearNuevaSolicitudNR from "../Pages/CrearNuevaSolicitudNR";
import AgregarNuevoPredio from "../Pages/AgregarNuevoPredio";
import InformacionPredio from "../Pages/InformacionPredio";
import EstadoRequisitos from "../Pages/EstadoRequisitos";
import BuscadorTramitesRadicacion from "../Pages/BuscadorTramitesRadicacion";
import BuscadorDePredios from "../Pages/BuscadorDePredios";
import Predio from "../Pages/Predio";
import BuscadorDeObservaciones from "../Pages/BuscadorDeObservaciones";
import Observaciones from "../Pages/Observaciones";
import BuscadorProcedenteJuridico from "../Pages/BuscadorProcedenteJuridico";
import ProcedentesJuridicos from "../Pages/ProcedentesJuridicos";
import BuscadorDeLiquidaciones from "../Pages/BuscadorDeLiquidaciones";
import LiquidacionesExpensas from "../Pages/LiquidacionesExpensas";
import BuscadorDeTitulares from "../Pages/BuscadorDeTitulares";
import Titulares from "../Pages/Titulares";
import BuscadorDeResponsables from "../Pages/BucadorDeResponsables";
import Responsables from "../Pages/Responsables";
import BuscadorDeOficios from "../Pages/BuscadorDeOficios";
import Oficios from "../Pages/Oficios";
import BuscadorDeActosAdministrativos from "../Pages/BuscadorDeActosAdministrativos";
import ActosAdministrativos from "../Pages/ActosAdministrativos";
import BuscadorDeCambioDeResponsable from "../Pages/BuscadorDeCambioDeResponsable";
import CambioResponsables from "../Pages/CambioResponsables";
import BuscadorDeHistorias from "../Pages/BuscadorDeHistorias";
import Historias from "../Pages/Historias";
import ProcedentesArquitectonicos from "../Pages/ProcedentesArquitectonicos";
import ProcedentesIngenieria from "../Pages/ProcedentesIngenieria";
import BuscadorDeGenerarValla from "../Pages/BuscadorDeGenerarValla";
import BuscadorDeFechas from "../Pages/BuscadorDeFechas";
import Fechas from "../Pages/Fechas";
import BuscadorDeExpedientes from "../Pages/BuscadorDeExpedientes";
import MenuNumeroRadicacion from "../Pages/MenuNumeroRadicacion";
import Configuracion from "../Pages/Configuracion";
import MenuLiquidaciones from "@/Pages/MenuLiquidaciones";
import CargoVariableVivienda from "@/Pages/CargoVariableVivienda";
import TablaDeResultadosLogico from "@/Pages/TablaDeResultadosLogico";
import BuscadorDeViabilidadTecnica from "@/Pages/BuscadorDeViabilidadTecnica";
import ViabilidadTecnica from "@/Pages/ViabilidadTecnica";
import AdministrativeAct from "@/Pages/AdministrativeAct";
import TaxRegistration from "@/Pages/TaxRegistration";
import SearchAdministrativeAct from "@/Pages/SearchAdministrativeAct";
import SearchTaxRegistration from "@/Pages/SearchTaxRegistration";
import BuscadorEntradaVentanilla from "@/Pages/BuscadorEntradaVentanilla";
import EntradaVentanilla from "@/Pages/EntradaVentanilla";
import Reportes from "@/Pages/Reportes";
import ReporteCatastral from "@/Pages/ReporteCatastral";
import OtrasActuacionesNuevoTramite from "@/Pages/OtrasActuacionesNuevoTramite";
import OtrasActuacionesPredio from "@/Pages/OtrasActuacionesPredio";
import OtrasActuacionesTitulares from "@/Pages/OtrasActuacionesTitulares";
import OtrasActuacionesHistoria from "@/Pages/OtrasActuacionesHistoria";
import OtrasActuacionesListado from "@/Pages/OtrasActuacionesListado";
import BuscadorDeOtrosActos from "@/Pages/BuscadorDeOtrosActos";
import OtrasActuacionesListadoPredios from "@/Pages/OtrasActuacionesListadoPredios";
import BuscadorDeOtrosActosTitulares from "@/Pages/BuscadorDeOtrosActosTitulares";
import OtrasActuacionesListadoTitulares from "@/Pages/OtrasActuacionesListadoTitulares";
import BuscadorDeOtrosActosHistorias from "@/Pages/BuscadorDeOtrosActosHistorias";
import OtrasActuacionesListadoHistorias from "@/Pages/OtrasActuacionesListadoHistorias";
import ReporteDane from "@/Pages/ReporteDane";
import AAStock from "@/Pages/AAStock";
import AAUbicaciones from "@/Pages/AAUbicaciones";
import AAFabricantes from "@/Pages/AAFabricantes";
import AAProveedores from "@/Pages/AAProveedores";
import AAPiezas from "@/Pages/AAPiezas";
import AAOrdenesDeCompra from "@/Pages/AAOrdenesDeCompra";
import AAProyectos from "@/Pages/AAProyectos";
import AATareas from "@/Pages/AATareas";

function useRoutesProvider() {

    /**
     * Componente que define y retorna todas las rutas de la aplicación
     * Utiliza useRoutes de react-router-dom para manejar el enrutamiento
     */
    /**
     * AppRoutes es un componente que maneja el enrutamiento de la aplicación
     * Utiliza el hook useRoutes de react-router-dom para definir todas las rutas disponibles
     * 
     * Cada ruta se define como un objeto con:
     * - path: La URL que activará la ruta
     * - element: El componente React que se renderizará cuando se acceda a esa ruta
     * 
     * Por ejemplo:
     * { path: '/menu', element: <Menu /> } -> Cuando se acceda a /menu, renderiza el componente Menu
     * 
     * El hook useRoutes toma el array de rutas y retorna el elemento React correspondiente
     * a la ruta actual basado en la URL del navegador
     */
    const AppRoutes = () => {
        let routes = useRoutes([
            { path: '/', element: <Login /> },
            { path: '/menu', element: <Menu />  },
            { path: '/nueva-radicacion', element: <NuevaRadicacion /> },
            { path: '/nueva-solicitud', element: <CrearNuevaSolicitudNR /> },
            { path: '/agregar-nuevo-predio', element: <AgregarNuevoPredio /> },
            { path: '/requisitos/buscar-tramite', element: <BuscadorTramitesRadicacion />},
            { path: '/informacion-predio', element: <InformacionPredio />},
            { path: '/estado-requisitos', element: <EstadoRequisitos />},
            { path: '/buscar-predio', element: <BuscadorDePredios />},
            { path: '/predio', element: <Predio />},
            { path: '/buscador-observaciones', element: <BuscadorDeObservaciones />},
            { path: '/observaciones', element: <Observaciones />},
            { path: '/buscador-procedentes-juridicos', element: <BuscadorProcedenteJuridico />},
            { path: '/procedentes-juridicos', element: <ProcedentesJuridicos />},
            { path: '/buscador-liquidaciones', element: <BuscadorDeLiquidaciones />},
            { path: '/liquidaciones-expensas', element: <LiquidacionesExpensas />},
            { path: '/buscador-titulares', element: <BuscadorDeTitulares />},
            { path: '/titulares', element: <Titulares />},
            { path: '/buscador-responsables', element: <BuscadorDeResponsables />},
            { path: '/responsables', element: <Responsables />},
            { path: '/buscador-oficios', element: <BuscadorDeOficios />},
            { path: '/oficios', element: <Oficios />},
            { path: '/buscador-actos-administrativos', element: <BuscadorDeActosAdministrativos />},
            { path: '/actos-administrativos', element: <ActosAdministrativos />},
            { path: '/buscador-cambio-responsables', element: <BuscadorDeCambioDeResponsable />},
            { path: '/cambio-responsables', element: <CambioResponsables />},
            { path: '/buscador-historias', element: <BuscadorDeHistorias />},
            { path: '/historias', element: <Historias />},
            { path: '/procedentes-arquitectonicos', element: <ProcedentesArquitectonicos />},
            { path: '/procedentes-ingenieria', element: <ProcedentesIngenieria />},
            { path: '/buscador-de-generar-valla', element: <BuscadorDeGenerarValla />},
            { path: '/buscador-de-fechas', element: <BuscadorDeFechas />},
            { path: '/control-fechas', element: <Fechas />},
            { path: '/busqueda-por-expediente', element: <BuscadorDeExpedientes />},
            { path: '/menu-por-expediente', element: <MenuNumeroRadicacion />},
            { path: '/configuracion', element: <Configuracion />},
            { path: '/menu-liquidaciones', element: <MenuLiquidaciones />},
            { path: '/cargo-variable-vivienda', element: <CargoVariableVivienda />},
            { path: '/tablas-de-resultados', element: <TablaDeResultadosLogico />},
            { path: '/buscador-viabilidad-tecnica', element: <BuscadorDeViabilidadTecnica />},
            { path: '/viabilidad-tecnica', element: <ViabilidadTecnica />},
            { path: '/buscador-acto-administrativo', element: <SearchAdministrativeAct /> },
            { path: '/acto-administrativo', element: <AdministrativeAct /> },
            { path: '/buscador-registro-impuestos', element: <SearchTaxRegistration /> },
            { path: '/registro-impuestos', element: <TaxRegistration /> },
            { path: '/buscador-entrada-ventanilla', element: <BuscadorEntradaVentanilla /> },
            { path: '/entrada-ventanilla', element: <EntradaVentanilla /> },
            { path: '/buscador-todos-oficios', element: <EntradaVentanilla /> },
            { path: '/reportes', element: <Reportes /> },
            { path: '/reporte-catastral', element: <ReporteCatastral /> },
            { path: '/otras-actuaciones-nuevo-tramite', element: <OtrasActuacionesNuevoTramite /> },
            { path: '/otras-actuaciones-predio', element: <OtrasActuacionesPredio /> },
            { path: '/otras-actuaciones-titulares', element: <OtrasActuacionesTitulares /> },
            { path: '/otras-actuaciones-historia', element: <OtrasActuacionesHistoria /> },
            { path: '/otras-actuaciones-listado', element: <OtrasActuacionesListado /> },
            { path: '/buscador-de-otros-actos', element: <BuscadorDeOtrosActos /> },
            { path: '/otras-actuaciones-listado-predios', element: <OtrasActuacionesListadoPredios /> },
            { path: '/buscador-de-otros-actos-titulares', element: <BuscadorDeOtrosActosTitulares /> },
            { path: '/otras-actuaciones-listado-titulares', element: <OtrasActuacionesListadoTitulares /> },
            { path: '/buscador-de-otros-actos-historias', element: <BuscadorDeOtrosActosHistorias /> },
            { path: '/otras-actuaciones-listado-historias', element: <OtrasActuacionesListadoHistorias /> },
            { path: '/reporte-dane', element: <ReporteDane /> },
            { path: '/stock', element: <AAStock /> },
            { path: '/ubicaciones', element: <AAUbicaciones /> },
            { path: '/fabricantes', element: <AAFabricantes /> },
            { path: '/proveedores', element: <AAProveedores /> },
            { path: '/piezas', element: <AAPiezas /> },
            { path: '/ordenes-de-compra', element: <AAOrdenesDeCompra /> },
            { path: '/proyectos', element: <AAProyectos /> },
            { path: '/tareas', element: <AATareas /> },
        ])
      
        return routes
    }

    return {
        AppRoutes
    }
}

export { useRoutesProvider}