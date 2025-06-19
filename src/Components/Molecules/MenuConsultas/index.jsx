
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import './menuconsultas.scss'

function MenuConsultas() {

    const { setIsOpenMenuConsultas } = useContext(GlobalState);

    const { 
        navigateToBuscadorDeExpedientes, 
    } = useNavigateProvider()
    
    function handlerNavigateToBuscadorDeExpedientes() {
        setIsOpenMenuConsultas(false);
        navigateToBuscadorDeExpedientes();
    }

    return (
        <div className='menuconsultas'>
            <div className='menuconsultas__header--closer'>
                <h1 className='menuconsultas__header--closer__title'>Consultas</h1>
                <button onClick={() => setIsOpenMenuConsultas(false)} className='menuconsultas__header--closer__button'>
                    <XMarkIcon className='menuconsultas__header--closer__button__icon' />
                </button>
            </div>
            <div className='menuconsultas__body'>
                <button onClick={handlerNavigateToBuscadorDeExpedientes} className='menuconsultas__body__button'>Busqueda por Expediente</button>
            </div>
        </div>  
    )
}

export default MenuConsultas
