
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import './menuconfiguraciones.scss'

function MenuConfiguraciones() {

    const { setIsOpenMenuConfiguracion, setValorConfiguracion } = useContext(GlobalState);

    const { 
        navigateToConfiguracion,
        navigateToMenuLiquidaciones
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
                <h1 className='menuconfiguraciones__header--closer__title'>Configuraciones</h1>
                <button onClick={() => setIsOpenMenuConfiguracion(false)} className='menuconfiguraciones__header--closer__button'>
                    <XMarkIcon className='menuconfiguraciones__header--closer__button__icon' />
                </button>
            </div>
            <div className='menuconfiguraciones__body'>
                <button onClick={() => navigateConfiguracion('cimentacion')} className='menuconfiguraciones__body__button'>Cimentación</button>
                <button onClick={() => navigateConfiguracion('codigoCIIU')} className='menuconfiguraciones__body__button'>Codigo CIIU</button>
                <button onClick={() => navigateConfiguracion('diseno')} className='menuconfiguraciones__body__button'>Diseño</button>
                <button onClick={() => navigateConfiguracion('estructuras')} className='menuconfiguraciones__body__button'>Estructuras</button>
                <button onClick={handleravigateToMenuLiquidaciones} className='menuconfiguraciones__body__button'>Liquidaciones y Expensas</button>
                <button onClick={() => navigateConfiguracion('sismico')} className='menuconfiguraciones__body__button'>Sismico</button>
            </div>
        </div>  
    )
}

export default MenuConfiguraciones
