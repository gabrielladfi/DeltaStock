import MenuCard from '@/Components/MenuCard'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import './menu.scss'
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import Modal from '@/Components/Modal'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import error from '@/assets/warning_logo.png'
import PageMenu from '@/Components/Pages/PageMenu'
import MenuOtrasActuaciones from '@/Components/MenuOtrasActuaciones'
import { AuthContextState } from '@/Context/AuthContextContext'

import nuevaradicacionicon from '@/assets/iconsmenu/nuevaradicacionicon.svg'
import otrasactuacionesicon from '@/assets/iconsmenu/otrasactuacionesicon.svg'
import requisitosicon from '@/assets/iconsmenu/requisitosicon.svg'
import predioicon from '@/assets/iconsmenu/predioicon.svg'
import titularesicon from '@/assets/iconsmenu/titularesicon.svg'
import responsablesicon from '@/assets/iconsmenu/responsablesicon.svg'
import entradaventanillaicon from '@/assets/iconsmenu/entradaventanillaicon.svg'
import observacionesicon from '@/assets/iconsmenu/observacionesicon.svg'
import liquidacionesicon from '@/assets/iconsmenu/liquidacionesicon.svg'
import fechasicon from '@/assets/iconsmenu/fechasicon.svg'
import procedentesicon from '@/assets/iconsmenu/procedentesicon.svg'
import generarvallaicon from '@/assets/iconsmenu/generarvallaicon.svg'
import responsablescuraduriaicon from '@/assets/iconsmenu/responsablescuraduriaicon.svg'
import historiasicon from '@/assets/iconsmenu/historiasicon.svg'
import viabilidadtecnicaicon from '@/assets/iconsmenu/viabilidadtecnicaicon.svg'
import registroimpuestosicon from '@/assets/iconsmenu/registroimpuestosicon.svg'
import actoadministrativoicon from '@/assets/iconsmenu/actoadministrativoicon.svg'
import reportesicon from '@/assets/iconsmenu/reportesicon.svg'
import MenuConsultas from '@/Components/Molecules/MenuConsultas'
import MenuConfiguraciones from '@/Components/Molecules/MenuConfiguraciones'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import FormularioReporteCatastral from '@/Components/Molecules/FormularioReporteCatastral'
import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import FormularioReporteDane from '@/Components/Molecules/FormularioReporteDane'

function Menu() {   


    const { 
        setErrorDePermisosPorAcceso, 
        errorDePermisosPorAcceso, 
        openMenuOtrasActuaciones,
        setOpenMenuOtrasActuaciones,
        isOpenMenuConfiguracion,
        isOpenMenuConsultas,
        openModalReportes,
        setOpenModalReportes,
        setValorParaFiltrar
    } = useContext(GlobalState)

    const { 
        navigateToNuevaRadicacion, 
        navigateToBuscarPredio, 
        navigateToListadoRadicacionesRequisitos,
        navigateToBuscadorObservaciones,
        navigateToBuscadorProcedenteJuridico,
        //navigateToBuscadorLiquidaciones,
        navigateToBuscadorTitulares,
        navigateToBuscadorResponsables,
        //navigateToBuscadorOficios,
        //navigateToBuscadorActosAdministrativos,
        navigateToBuscadorCambioDeResponsable,
        navigateToBuscadorHistorias,
        navigateToBuscadorDeGenerarValla,
        navigateToBuscadorDeFechas,
        navigateToBuscadorDeViabilidadTecnica,
        navigateToSearchAdministrativeAct,
        navigateToSearchTaxRegistration,
        navigateToBuscadorDeTodosOficios,
        navigateToBuscadorLiquidaciones,
        navigateToReporteCatastral, 
        navigateToReporteDane,
        //navigateToReportes,
    } = useNavigateProvider()

    const  userType  = getDataUser(); // ✅ Se obtiene el tipo de usuario

    function handleVerificarUsuarioEstandarObservaciones() {
        if(userType.usertype === 'estandar') {
            setErrorDePermisosPorAcceso(true)
        }else {
            navigateToBuscadorObservaciones()
        }
    }

    function handleVerificarUsuarioEstandarProcedentes() {
        if(userType.usertype === 'estandar') {
            setErrorDePermisosPorAcceso(true)
        }else {
            navigateToBuscadorProcedenteJuridico()
        }
    }

    const { setToken } = useContext(AuthContextState)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])

    const menu = [
        {id: 1, name: 'Nueva Radicación', trigger: navigateToNuevaRadicacion, icon: nuevaradicacionicon},
        {id: 2, name: 'Otras Actuaciones', trigger: () => setOpenMenuOtrasActuaciones(true), icon: otrasactuacionesicon},
        {id: 3, name: 'Requisitos', trigger: navigateToListadoRadicacionesRequisitos, icon: requisitosicon},
        {id: 4, name: 'Predio', trigger: navigateToBuscarPredio, icon: predioicon},
        {id: 5, name: 'Titulares', trigger: navigateToBuscadorTitulares, icon: titularesicon},
        {id: 6, name: 'Responsables', trigger: navigateToBuscadorResponsables, icon: responsablesicon}, 
        {id: 7, name: 'Entrada de Ventanilla', trigger: navigateToBuscadorDeTodosOficios, icon: entradaventanillaicon},
        {id: 8, name: 'Observaciones', trigger: handleVerificarUsuarioEstandarObservaciones, icon: observacionesicon}, 
        {id: 9, name: 'Liquidaciones', trigger: navigateToBuscadorLiquidaciones , icon: liquidacionesicon},
        {id: 10, name: 'Fechas', trigger: navigateToBuscadorDeFechas, icon: fechasicon},
        {id: 11, name: 'Procedentes', trigger: handleVerificarUsuarioEstandarProcedentes, icon: procedentesicon},
        {id: 12, name: 'Generar Valla', trigger: navigateToBuscadorDeGenerarValla, icon: generarvallaicon},
        {id: 13, name: 'Responsables Curaduria', trigger: navigateToBuscadorCambioDeResponsable, icon: responsablescuraduriaicon},
        {id: 14, name: 'Historias', trigger: navigateToBuscadorHistorias, icon: historiasicon},
        {id: 15, name: 'Viabilidad Técnica', trigger: navigateToBuscadorDeViabilidadTecnica, icon: viabilidadtecnicaicon},
        {id: 16, name: 'Registro de Impuestos', trigger: navigateToSearchTaxRegistration, icon: registroimpuestosicon},
        {id: 17, name: 'Acto Administrativo', trigger: navigateToSearchAdministrativeAct, icon: actoadministrativoicon},
        {id: 18, name: 'Reportes', trigger: () => setOpenModalReportes(true), icon: reportesicon},
        
    ];

    function handleNavigateToReportesCatastral() {
        navigateToReporteCatastral()
        setOpenModalReportes(false)
    }

    function handleNavigateToReportesDane() {
        navigateToReporteDane()
        setOpenModalReportes(false)
    }

    const [ openModalReportesCatastral, setOpenModalReportesCatastral ] = useState(false)
    const [ openModalReportesDane, setOpenModalReportesDane ] = useState(false)
    const [ BuscadorDeExpedientes, setBuscadorDeExpedientes ] = useState(false)

    return (
        <PageMenu>
            {
                menu?.map(card => (
                    <MenuCard key={card.id} text={card.name} propFn={card.trigger} icon={card.icon} />
                ))
            }
            {
                errorDePermisosPorAcceso &&
                <Modal>
                    <BoxAlertNotification 
                        title={'Sin permisos de acceso'}
                        message={'No tienes permisos para acceder a esta sección.'}
                        textButton={'Cerrar'}
                        image={error}
                        onClick={() => setErrorDePermisosPorAcceso(false)}
                    />
                </Modal>
            }
            {
                openMenuOtrasActuaciones &&
                <Modal>
                    <MenuOtrasActuaciones />
                </Modal>
            }
            {
                isOpenMenuConfiguracion &&
                <Modal>
                    <MenuConfiguraciones />
                </Modal>
            }
            {
                isOpenMenuConsultas &&
                <Modal>
                    <MenuConsultas />
                </Modal>
            }
            {
                openModalReportes &&
                <Modal>
                    <div className='menuobservaciones'>
                        <div className='menuobservaciones__header'>
                            <p className='menuobservaciones__header__p'>Reportes</p>
                            <button onClick={() => setOpenModalReportes(false)} className='menuobservaciones__header__button'>
                                <XMarkIcon className='menuobservaciones__header__button__icon' />
                            </button>
                        </div>
            
          
                
                        <div className='menuobservaciones__categorias'>
                            <MenuCard text='Reporte Catastral' propFn={() => setOpenModalReportesCatastral(true)} />
                            <MenuCard text='Min Vivienda' />
                            <MenuCard text='DANE' propFn={() => setOpenModalReportesDane(true)} />
                        </div>
            
                    </div>
                    
                </Modal>
            }
            {
                openModalReportesCatastral &&
                <Modal>
                    <FormularioReporteCatastral functionBuscarExpedientes={() => setBuscadorDeExpedientes(true)} propFunctionCloseModal={() => setOpenModalReportesCatastral(false)} />
                </Modal>
            }
            {
                openModalReportesDane &&
                <Modal>
                    <FormularioReporteDane functionBuscarExpedientes={() => setBuscadorDeExpedientes(true)} propFunctionCloseModal={() => setOpenModalReportesDane(false)} />
                </Modal>
            }
            {
                BuscadorDeExpedientes &&
                <Modal>
                    <div className='reporte-catastarl-modal-buscador-reportes'>
                        <div className='reporte-catastarl-modal-buscador__header'>
                            <button onClickCapture={() => setBuscadorDeExpedientes(false)} className='reporte-catastarl-modal-buscador__header__button' onClick={() => setBuscadorDeExpedientes(false)}>
                                <XMarkIcon className='reporte-catastarl-modal-buscador__header__button__icon' />
                            </button>
                        </div>
                        <BuscadorPorNumeroRadicacion
                            title='Buscador por Expediente'
                            setState={setValorParaFiltrar}
                        >
                            <TablaListadoRadicaciones />
                        </BuscadorPorNumeroRadicacion>
                    </div>
                </Modal>
            }

        </PageMenu>
    )
}

export default Menu
