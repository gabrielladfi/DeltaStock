
import { XMarkIcon } from '@heroicons/react/24/outline'
import './menuotrasactuaciones.scss'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import MenuCard from '../MenuCard';
import { useNavigateProvider } from '@/Hooks/useNavigateProvider';

function MenuOtrasActuaciones() {

    const { 
        navigateToOtrasActuacionesNuevoTramite, 
        navigateToOtrasActuacionesListado,
        navigateToBuscadorDeOtrosActosTitulares,
        navigateToBuscadorDeOtrosActos,
        navigateToBuscadorDeOtrosActosHistorias
    } = useNavigateProvider();

    const { setOpenMenuOtrasActuaciones } = useContext(GlobalState);

    function handleCerrarModal() {
        setOpenMenuOtrasActuaciones(false);
    }

    function handleNavigateToNuevoTramite() {
        navigateToOtrasActuacionesNuevoTramite();
        setOpenMenuOtrasActuaciones(false);
    }

    function handleNavigateToListado() {
        navigateToOtrasActuacionesListado();
        setOpenMenuOtrasActuaciones(false);
    }

    function handleNavigateToBuscadorDeOtrosActosTitulares() {
        navigateToBuscadorDeOtrosActosTitulares();
        setOpenMenuOtrasActuaciones(false);
    }

    function handleNavigateToBuscadorDeOtrosActosPredios() {
        navigateToBuscadorDeOtrosActos();
        setOpenMenuOtrasActuaciones(false);
    }

    function handleNavigateToBuscadorDeOtrosActosHistorias() {
        navigateToBuscadorDeOtrosActosHistorias();
        setOpenMenuOtrasActuaciones(false);
    }

    return (
       <div className='menu-otras-actuaciones-container--r'>
            <div className='menu-otras-actuaciones__header'>
                <p className='menu-otras-actuaciones__header__p'>Otras Actuaciones</p>
                <button onClick={handleCerrarModal} className='menu-otras-actuaciones__header__button'>
                    <XMarkIcon className='menu-otras-actuaciones__header__button__icon' />
                </button>
            </div>
            <div className='menu-otras-actuaciones__container--r'>
                <MenuCard text='Nuevo Trámite' propFn={handleNavigateToNuevoTramite} />
                <MenuCard text='Predio' propFn={handleNavigateToBuscadorDeOtrosActosPredios} />
                <MenuCard text='Titulares' propFn={handleNavigateToBuscadorDeOtrosActosTitulares} />
                <MenuCard text='Historia' propFn={handleNavigateToBuscadorDeOtrosActosHistorias} />
                <MenuCard text='Ver Radicaciones' propFn={handleNavigateToListado} />
            </div>

       </div>
    )
}

export default MenuOtrasActuaciones
