import { XMarkIcon } from '@heroicons/react/24/outline'
import MenuCard from '../MenuCard'
import './menucategoriasobservaciones.scss'
import { useContext } from 'react';
import { GlobalState } from '../../Context/GlobalContext';
import { useNavigateProvider } from '../../Hooks/useNavigateProvider';
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion';

function MenuCategoriasObservaciones() {

    const user = getDataUser();

    const { setSelecionAreaObservacionesModal, setCategoriaObservacionSeleccionada } = useContext(GlobalState);
    const { navigateToObservaciones } = useNavigateProvider();

    function handleCerrarModal() {
        setSelecionAreaObservacionesModal(false);
    }

    function handleCategoriaObservacionSeleccionada(categoria) {

        if (!categoria) {
            console.error('Categoria is undefined');
            return;
        }

        setCategoriaObservacionSeleccionada(categoria);
        setSelecionAreaObservacionesModal(false);
        navigateToObservaciones();
    }



    return (
        <div className='menuobservaciones'>
            <div className='menuobservaciones__header'>
                <p className='menuobservaciones__header__p'>Tipo de Observaciones</p>
                <button onClick={handleCerrarModal} className='menuobservaciones__header__button'>
                    <XMarkIcon className='menuobservaciones__header__button__icon' />
                </button>
            </div>
            
            {
                user.usertype === 'admin' &&
                <div className='menuobservaciones__categorias'>
                    <MenuCard text='Observaciones Juridicas' propFn={() => {handleCategoriaObservacionSeleccionada('juridico')}} />
                    <MenuCard text='Observaciones Arquitectonicas' propFn={() => {handleCategoriaObservacionSeleccionada('arquitectonico')}} />
                    <MenuCard text='Observaciones Ingenieria' propFn={() => {handleCategoriaObservacionSeleccionada('ingenieria')}} />
                </div>
            }
            {
                user.usertype === 'juridico' &&
                <div className='menuobservaciones__categorias'>
                    <MenuCard text='Observaciones Juridicas' propFn={() => {handleCategoriaObservacionSeleccionada('juridico')}} />
                </div>
            }
            {
                user.usertype === 'arquitectonico' &&
                <div className='menuobservaciones__categorias'>
                    <MenuCard text='Observaciones Arquitectonicas' propFn={() => {handleCategoriaObservacionSeleccionada('arquitectonico')}} />
                </div>
            }
            {
                user.usertype === 'ingenieria' &&
                <div className='menuobservaciones__categorias'>
                    <MenuCard text='Observaciones Ingenieria' propFn={() => {handleCategoriaObservacionSeleccionada('ingenieria')}} />
                </div>
            }
            {/*<div className='menu-categorias-observaciones__categorias'>

                <MenuCard text='Observaciones Juridicas' propFn={() => {handleCategoriaObservacionSeleccionada('juridico')}} />
                <MenuCard text='Observaciones Arquitectonicas' propFn={() => {handleCategoriaObservacionSeleccionada('arquitectonico')}} />
                <MenuCard text='Observaciones Ingenieria' propFn={() => {handleCategoriaObservacionSeleccionada('ingenieria')}} />
            </div>*/}
            
        </div>
    )
}

export default MenuCategoriasObservaciones
