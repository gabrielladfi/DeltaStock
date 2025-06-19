import { useContext, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, FolderMinusIcon, DocumentTextIcon, Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import './menuvertical.scss'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider';
import { GlobalState } from '@/Context/GlobalContext';
import { removeNumeroRadicacion } from '@/Utils/manejoLocalStorageNumeroRadicacion';

function MenuVertical() {

    const { setValorConfiguracion, setIsOpenMenuMobile } = useContext(GlobalState);

    const { 
        navigateToNuevaRadicacion, 
        navigateToMenu, 
        navigateToBuscadorDeExpedientes, 
        navigateToConfiguracion, 
        navigateToMenuLiquidaciones 
    } = useNavigateProvider()

    function navigateConfiguracion(parametro) {
        navigateToConfiguracion()
        setValorConfiguracion(parametro)

    }

    function handleIrAlMenu() {
        removeNumeroRadicacion();
        navigateToMenu();
    }

    const [openMenus, setOpenMenus] = useState({});

    const menuData = [
        {
            icon: <HomeIcon className='MenuVertical__icon' />,
            label: 'Menu Principal',
            subOptions: [],
            disabled: true,
        },
        {   
            icon: <FolderMinusIcon className='MenuVertical__icon' />,
            label: 'Radicación',
            subOptions: [],
            disabled: true,
        },
        {
            icon: <DocumentTextIcon className='MenuVertical__icon' />,
            label: 'Consultas',
            subOptions: [
                { label: 'Busqueda por expedientes', fn: () => navigateToBuscadorDeExpedientes() },
            ],
            disabled: false,
        },
        {
            icon: <Cog6ToothIcon className='MenuVertical__icon' />,
            label: 'Configuración',
            subOptions: [
                { label: 'Cimentación', fn: () => navigateConfiguracion('cimentacion') },
                { label: 'Estructuras', fn: () => navigateConfiguracion('estructura') },
                { label: 'Diseño', fn: () => navigateConfiguracion('diseño') },
                { label: 'Sismico', fn: () => navigateConfiguracion('sismico') },
                { label: 'Liquidaciones y expensas', fn: () => navigateToMenuLiquidaciones() },
                { label: 'Código CIIU', fn: () => navigateConfiguracion('codigoCIIU') },
            ],
            disabled: false,
        },
    ];

    const handleToggle = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <nav className='MenuVertical'>
            <ul className='MenuVertical__list'>
                {menuData.map((menu, idx) => (
                    <li onClick={() => menu.label === 'Radicación' && navigateToNuevaRadicacion() || menu.label === 'Menu Principal' && handleIrAlMenu()} key={menu.label} className='MenuVertical__list__li'>
                        <div className='MenuVertical__list__li__container--option'>
                            <div
                                onClick={() => menu.subOptions.length && !menu.disabled && handleToggle(idx)}
                                disabled={menu.disabled}
                                className='MenuVertical__list__li__option'
                            >
                                {menu.icon}
                                {menu.label} 
                            </div>
                            <div className='MenuVertical__list__li__container--option__icon'>
                                {menu.subOptions.length ? (openMenus[idx] ? <ChevronUpIcon className='MenuVertical__icon' /> : <ChevronDownIcon className='MenuVertical__icon' />) : null}
                            </div>
                        </div>
                        {menu.subOptions.length > 0 && openMenus[idx] && (
                        <ul className='MenuVertical__list__li__submenu'>
                            {menu.subOptions.map((sub) => (
                                <li onClick={sub.fn} className='MenuVertical__list__li__submenu__item' key={sub.label}>
                                    <div>{sub.label}</div>
                                </li>
                            ))}
                        </ul>
                    )}   
                    </li>  
                ))}
            </ul>
        </nav>
    );
}

export default MenuVertical
