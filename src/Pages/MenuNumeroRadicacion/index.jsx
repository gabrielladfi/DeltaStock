import MenuCard from '../../Components/MenuCard'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import { 
    CalendarDaysIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    BuildingOfficeIcon,
    //DocumentTextIcon,
    InboxArrowDownIcon,
    ViewfinderCircleIcon,
    CurrencyDollarIcon,
    DocumentDuplicateIcon,
    //SquaresPlusIcon,
    PrinterIcon,
    UsersIcon,
    CircleStackIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline'
import './menu.scss'
import { getDataUser, getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { useContext, useState } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import Modal from '../../Components/Modal'
import MenuCategoriasObservaciones from '../../Components/MenuCategoriasObservaciones'
import FormGenararValla from '../../Components/FormGenerarValla'
import MenuCategoriasProcedentes from '../../Components/MenuCategoriasProcedentes'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import error from '@/assets/warning_logo.png'
import PageMenu from '@/Components/Pages/PageMenu'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'

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

function MenuNumeroRadicacion() {

    const numeroRadicacion = getNumeroRadicacion();
    const { 
        setSelecionAreaObservacionesModal, 
        selecionAreaObservacionesModal, 
        selecionTipoDeProcedente, 
        setSelecionTipoDeProcedente,
        setErrorDePermisosPorAcceso, 
        errorDePermisosPorAcceso
    } = useContext(GlobalState)

    const [ generarVallaModal, setGenerarVallaModal ] = useState(false);

    const {
        navigateToResponsables,
        //navigateToActosAdministrativos,
        navigateToCambioDeResponsable,
        navigateToFechas,
        navigateToHistorias,
        //navigateToLiquidacionesExpensas,
        //navigateToOficios,
        navigateToPredioPorNumeroRadicacion,
        navigateToTitulares,
        navigateToEstadoRequisitos,
        navigateToViabilidadTecnica,
        navigateToAdministrativeAct,
        navigateToTaxRegistration,
        navigateToEntradaVentanilla,
        navigateToMenuLiquidaciones
    } = useNavigateProvider()

    function handleAbrirModal() {
        setSelecionAreaObservacionesModal(true);
    }

    function handleOpenModal() {
        setGenerarVallaModal(true)
    }

    function handleCloseModal() {
        setGenerarVallaModal(false)
    }

    function handleOpenModalProcedentes() {
        setSelecionTipoDeProcedente(true);
    }

    const  userType  = getDataUser(); // ✅ Se obtiene el tipo de usuario
    
    function handleVerificarUsuarioEstandarObservaciones() {
        if(userType.usertype === 'estandar') {
            setErrorDePermisosPorAcceso(true);
        }else {
            handleAbrirModal()
        }
    }

    function handleVerificarUsuarioEstandarProcedentes() {
        if(userType.usertype === 'estandar') {
            setErrorDePermisosPorAcceso(true);
        }else {
            handleOpenModalProcedentes()
        }
    }
    

    const menu = [
        {id: 2, name: 'Requisitos', trigger: navigateToEstadoRequisitos, icon: registroimpuestosicon},
        {id: 3, name: 'Predio', trigger: navigateToPredioPorNumeroRadicacion, icon: predioicon},
        {id: 4, name: 'Titulares', trigger: navigateToTitulares, icon: titularesicon},
        {id: 5, name: 'Responsables', trigger: navigateToResponsables, icon: responsablesicon}, 
        //{id: 6, name: 'Oficios', trigger: navigateToOficios, icon: <DocumentTextIcon className='menucard__icon' />},
        {id: 7, name: 'Entrada de Ventanilla', trigger: navigateToEntradaVentanilla, icon: entradaventanillaicon},
        {id: 8, name: 'Observaciones', trigger: handleVerificarUsuarioEstandarObservaciones, icon: observacionesicon}, 
        {id: 9, name: 'Liquidaciones', trigger: navigateToMenuLiquidaciones, icon: liquidacionesicon},
        {id: 10, name: 'Fechas', trigger: navigateToFechas, icon: fechasicon},
        {id: 11, name: 'Procedentes', trigger: handleVerificarUsuarioEstandarProcedentes, icon: procedentesicon},
        //{id: 12, name: 'Procedente Técnico', trigger: () => {console.log('nueva-radicacion')}},  
        //{id: 13, name: 'Actos Administrativos', trigger: navigateToActosAdministrativos, icon: <SquaresPlusIcon className='menucard__icon' />},
        {id: 14, name: 'Generar Valla', trigger: handleOpenModal, icon: generarvallaicon},
        {id: 15, name: 'Cambio de Responsable Curaduria', trigger: navigateToCambioDeResponsable, icon: responsablescuraduriaicon},
        {id: 16, name: 'Historias', trigger: navigateToHistorias, icon: historiasicon},
        {id: 17, name: 'Viabilidad Técnica', trigger: navigateToViabilidadTecnica, icon: viabilidadtecnicaicon},
        {id: 18, name: 'Registro de Impuestos', trigger: navigateToTaxRegistration, icon: registroimpuestosicon},
        {id: 19, name: 'Acto Administrativo', trigger: navigateToAdministrativeAct, icon: actoadministrativoicon},
        
    ];

    
    return (
        <PageMenu>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            {
                menu?.map(card => (
                    <MenuCard key={card.id} text={card.name} propFn={card.trigger} icon={card.icon} />
                ))
            }

            {
                selecionAreaObservacionesModal && <Modal> <MenuCategoriasObservaciones /> </Modal>
            }

            {
                generarVallaModal && <Modal> <FormGenararValla propFnCloser={handleCloseModal} /></Modal>
            }

            {
                selecionTipoDeProcedente && <Modal> <MenuCategoriasProcedentes /> </Modal>
            }
            {
                errorDePermisosPorAcceso &&
                <Modal>
                    <BoxAlertNotificationError
                        message={'No tienes permisos para acceder a esta sección.'}
                        textButton2={'Cerrar'}
                        onClick={() => setErrorDePermisosPorAcceso(false)}
                    />
                </Modal>
            }
        </PageMenu>
    )
}

export default MenuNumeroRadicacion
