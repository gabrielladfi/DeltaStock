import { useContext, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, FolderMinusIcon, DocumentTextIcon, Cog6ToothIcon, HomeIcon, ClipboardDocumentListIcon, CpuChipIcon, UsersIcon, WrenchScrewdriverIcon, CircleStackIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
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
        navigateToMenuLiquidaciones,
        navigateToStock,
        navigateToUbicaciones,
        navigateToFabricantes,
        navigateToProveedores,
        navigateToPiezas,
        navigateToOrdenesDeCompra
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
            fn: () => navigateToMenu(),
        },
        {
            icon: < Cog6ToothIcon className='MenuVertical__icon' />,
            label: 'Fabricantes',
            subOptions: [],
            disabled: true,
            fn: () => navigateToFabricantes(),
        },
        {
            icon: <ClipboardDocumentListIcon className='MenuVertical__icon' />,
            label: 'Ordenes de compra',
            subOptions: [],
            disabled: true,
            fn: () => navigateToOrdenesDeCompra(),
        },
        {
            icon: <WrenchScrewdriverIcon className='MenuVertical__icon' />,
            label: 'Piezas',
            subOptions: [],
            disabled: true,
            fn: () => navigateToPiezas(),
        },
        {
            icon: <UsersIcon className='MenuVertical__icon' />,
            label: 'Proveedores',
            subOptions: [],
            disabled: true,
            fn: () => navigateToProveedores(),
        },
        {
            icon: <CircleStackIcon className='MenuVertical__icon' />,
            label: 'Stock',
            subOptions: [],
            disabled: true,
            fn: () => navigateToStock(),
        },
        {
            icon: <GlobeAmericasIcon className='MenuVertical__icon' />,
            label: 'Ubicaciones',
            subOptions: [],
            disabled: true,
            fn: () => navigateToUbicaciones(),
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
                {menuData.map((menu) => (
                    <li onClick={menu.fn} key={menu.label} className='MenuVertical__list__li'>
                        <div className='MenuVertical__list__li__container--option'>
                            <div className='MenuVertical__list__li__option'>
                                {menu.icon}
                                {menu.label}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MenuVertical
