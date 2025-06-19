
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import './menuconfiguraciones.scss'

function MenuConfiguraciones() {

    const { setIsOpenMenuConfiguracion, setValorConfiguracion } = useContext(GlobalState);

    const { 
        navigateToConfiguracion,
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
        setIsOpenMenuConfiguracion(false)
    }
    function handleravigateToMenuLiquidaciones() {
        navigateToMenuLiquidaciones()
        setIsOpenMenuConfiguracion(false)
    }

    return (
        <div className='menuconfiguraciones'>
            <div className='menuconfiguraciones__header--closer'>
                <h1 className='menuconfiguraciones__header--closer__title'>Menú de Inventarios</h1>
                <button onClick={() => setIsOpenMenuConfiguracion(false)} className='menuconfiguraciones__header--closer__button'>
                    <XMarkIcon className='menuconfiguraciones__header--closer__button__icon' />
                </button>
            </div>
            <div className='menuconfiguraciones__body'>
                <button onClick={navigateToStock} className='menuconfiguraciones__body__button'>Stock</button>
                <button onClick={navigateToUbicaciones} className='menuconfiguraciones__body__button'>Ubicaciones</button>
                <button onClick={navigateToFabricantes} className='menuconfiguraciones__body__button'>Fabricantes</button>
                <button onClick={navigateToProveedores} className='menuconfiguraciones__body__button'>Proveedores</button>
                <button onClick={navigateToPiezas} className='menuconfiguraciones__body__button'>Piezas</button>
                <button onClick={navigateToOrdenesDeCompra} className='menuconfiguraciones__body__button'>Ordenes de compra</button>
            </div>
        </div>  
    )
}

export default MenuConfiguraciones
