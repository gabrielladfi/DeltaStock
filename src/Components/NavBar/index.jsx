import { useContext, useState } from 'react';
import { useNavigateProvider } from '../../Hooks/useNavigateProvider';
import { removeNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion';
import './navbar.scss'
import { GlobalState } from '../../Context/GlobalContext';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { useDeviceScale } from '@/Hooks/useDeviceScale';

// eslint-disable-next-line react/prop-types
function NavBar({ handlefnmenu }) {

    const { isTVScale } = useDeviceScale()

    const url = window.location.pathname;

    const { setValorConfiguracion, setIsOpenMenuMobile } = useContext(GlobalState);

    const { 
        navigateToNuevaRadicacion, 
        navigateToMenu, 
        navigateToBuscadorDeExpedientes, 
        navigateToConfiguracion, 
        navigateToMenuLiquidaciones 
    } = useNavigateProvider()

    const [ openConsultas, setOpenConsultas ] = useState(false);
    const [ openConfiguracion, setOpenConfiguracion ] = useState(false);

    //Esta funcion es encargada de navegar al menu principal y limpiar nuestro local storage de numero de radicacion
    function handleIrAlMenu() {
        removeNumeroRadicacion();
        navigateToMenu();
    }

    function openMenuConsultas() {
        setOpenConsultas(state => !state);
        setOpenConfiguracion(false);
    }

    function openMenuConfiguracion() {
        setOpenConfiguracion(state => !state);
        setOpenConsultas(false);
    }

    function closeMenuConsultas() {
        setOpenConsultas(false);
        setOpenConfiguracion(false);
    }

    function navigateConfiguracion(parametro) {
        navigateToConfiguracion()
        setValorConfiguracion(parametro)

    }

    return (
        <nav onMouseLeave={closeMenuConsultas} className={isTVScale ? 'navbar-tv' : 'navbar'}>
                <ul className={isTVScale ? 'navbar-tv__ul' : 'navbar__ul'}>
                    <li onClick={navigateToNuevaRadicacion} className={isTVScale ? 'navbar-tv__ul__li' : 'navbar__ul__li'}>RADICACIÓN</li>
                    <li onClick={openMenuConsultas} className={isTVScale ? 'navbar-tv__ul__li' : `navbar__ul__li ${openConsultas ? 'navbar__ul__li--active' : ''}`}>
                        CONSULTAS
                        <div className='navbar__ul__li__submenu' style={{display: openConsultas ? 'block' : 'none'}}>
                            <ul className='navbar__ul__li__submenu__ul'>
                                <li className={`navbar__ul__li__submenu__ul__li`} onClick={navigateToBuscadorDeExpedientes}>
                                    - Busqueda por Expediente
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                    <li onClick={openMenuConfiguracion} className={isTVScale ? 'navbar-tv__ul__li' : `navbar__ul__li ${openConfiguracion ? 'navbar__ul__li--active' : ''}`}>
                        CONFIGURACION
                        <div className='navbar__ul__li__submenu navbar__ul__li__submenu--config' style={{display: openConfiguracion ? 'block' : 'none'}}>
                            <ul className='navbar__ul__li__submenu__ul'>
                                <li onClick={() => navigateConfiguracion('cimentacion')} className={`navbar__ul__li__submenu__ul__li`} >- Cimentación</li>
                                <li onClick={() => navigateConfiguracion('estructura')} className={`navbar__ul__li__submenu__ul__li`} >- Estructuras</li>
                                <li onClick={() => navigateConfiguracion('diseño')} className={`navbar__ul__li__submenu__ul__li`} >- Diseño</li>
                                <li onClick={() => navigateConfiguracion('sismico')} className={`navbar__ul__li__submenu__ul__li`} >- Sismico</li>
                                <li onClick={ navigateToMenuLiquidaciones } className={`navbar__ul__li__submenu__ul__li`} >- Liquidaciones y Expensas</li>
                                <li onClick={() => navigateConfiguracion('codigoCIIU')} className={`navbar__ul__li__submenu__ul__li`} >- Codigo CIIU</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <button onClick={() => setIsOpenMenuMobile(state => !state)} className='navbar-button-menu'><Bars2Icon className='navbar-button-menu__icon' /></button>
                {
                    url !== '/menu' ?
                    <button onClick={handlefnmenu ? handlefnmenu : handleIrAlMenu} className='navbar__button'>Menú principal</button>
                    :
                    null
                } 
        </nav>
    )
}

export default NavBar
