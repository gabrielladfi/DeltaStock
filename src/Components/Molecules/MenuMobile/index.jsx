import { useContext, useState } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import './menumobile.scss'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider';






function MenuMobile() {

    const { isOpenMenuMobile, setIsOpenMenuMobile, setValorConfiguracion } = useContext(GlobalState);
    const [ consultasIsOpen, setConsultasIsOpen ] = useState(false);
    const [ configuracionIsOpen, setConfiguracionIsOpen ] = useState(false);

    

    const { 
        navigateToNuevaRadicacion,  
        navigateToBuscadorDeExpedientes, 
        navigateToConfiguracion, 
        navigateToMenuLiquidaciones 
    } = useNavigateProvider()

    function handlerGoToNuevaRadicacion() {
        setIsOpenMenuMobile(false);
        navigateToNuevaRadicacion();
    }

    function handleOpenConsultas() {
        setConsultasIsOpen(state => !state);
    }

    function handleOpenConfiguracion() {
        setConfiguracionIsOpen(state => !state);
    }

    function handleNavitegadorBuscadorDeExpedientes() {
        setIsOpenMenuMobile(false);
        navigateToBuscadorDeExpedientes();
    }

    function navigateConfiguracion(parametro) {
        setConfiguracionIsOpen(false);
        setIsOpenMenuMobile(false);
        navigateToConfiguracion()
        setValorConfiguracion(parametro)
    }

    function handleToMenuLiquidaciones() {
        setConfiguracionIsOpen(false);
        setIsOpenMenuMobile(false);
        navigateToMenuLiquidaciones();
    }

    function handleClosedMenu() {
        setConsultasIsOpen(false);
        setConfiguracionIsOpen(false);
        setIsOpenMenuMobile(false);
    }

    return (
        <div className={`menumobile ${isOpenMenuMobile ? 'menumobile--open' : ''}`}>
            <nav className='menumobile__nav'>
                <ul className='menumobile__nav__ul'>
                    <li onClick={handlerGoToNuevaRadicacion} className='menumobile__nav__ul__li'>RADICACION</li>
                    <li onClick={handleOpenConsultas} className='menumobile__nav__ul__li'>CONSULTAS</li>
                        {
                            consultasIsOpen &&
                            <ul className='menumobile__nav__ul__li__sub'>
                                <li onClick={handleNavitegadorBuscadorDeExpedientes} className='menumobile__nav__ul__li'>- BUSQUEDA POR EXPEDIENTE</li>
                            </ ul>
                        }
                    <li onClick={handleOpenConfiguracion} className='menumobile__nav__ul__li'>CONFIGURACION</li>
                        {
                            
                            configuracionIsOpen &&
                            <ul className='menumobile__nav__ul__li__sub'>
                                <li onClick={() => navigateConfiguracion('cimentacion')} className={`menumobile__nav__ul__li`} >- Cimentación</li>
                                <li onClick={() => navigateConfiguracion('estructura')} className={`menumobile__nav__ul__li`} >- Estructuras</li>
                                <li onClick={() => navigateConfiguracion('diseño')} className={`menumobile__nav__ul__li`} >- Diseño</li>
                                <li onClick={() => navigateConfiguracion('sismico')} className={`menumobile__nav__ul__li`} >- Sismico</li>
                                <li onClick={ handleToMenuLiquidaciones } className={`menumobile__nav__ul__li`} >- Liquidaciones y Expensas</li>
                            </ul>
                            
                        }
                </ul>
            </nav>
            <div className='menumobile__div-button'>
                <button className='menumobile__div-button__button' onClick={handleClosedMenu}>
                    <p>Cerra Menu</p>
                </button>
            </div>

        </div>
    )
}

export default MenuMobile
