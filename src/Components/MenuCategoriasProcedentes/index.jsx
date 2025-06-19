import { XMarkIcon } from '@heroicons/react/24/outline'
import MenuCard from '../MenuCard'
import './menucategoriasprocedentes.scss'
import { useContext } from 'react';
import { GlobalState } from '../../Context/GlobalContext';
import { getDataUser, removeNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion';
import { useNavigateProvider } from '../../Hooks/useNavigateProvider';

function MenuCategoriasProcedentes() {

    const user = getDataUser();

    const { setSelecionTipoDeProcedente } = useContext(GlobalState);
    const { navigateToProcedenteJuridico, navigateToProcedentesArquitectonicos, navigateToProcedentesIngenieria } = useNavigateProvider();

    function handleCerrarModal() {
        setSelecionTipoDeProcedente(false);
        removeNumeroRadicacion();
    }

    function handleNavigateToProcedenteJuridico() {
        navigateToProcedenteJuridico();
        setSelecionTipoDeProcedente(false);
    }

    function handleNavigateToProcedentesArquitectonicos() {
        navigateToProcedentesArquitectonicos();
        setSelecionTipoDeProcedente(false);
    }

    function handleNavigateToProcedentesIngenieria() {
        navigateToProcedentesIngenieria();
        setSelecionTipoDeProcedente(false);
    }

    



    return (
        <div className='menuprocedentes'>
            <div className='menuprocedentes__header'>
                <p className='menuprocedentes__header__p'>Procedentes por Categoria</p>
                <button onClick={handleCerrarModal} className='menuprocedentes__header__button'>
                    <XMarkIcon className='menuprocedentes__header__button__icon' />
                </button>
            </div>
            {
                user.usertype === 'admin' &&
                <div className='menuprocedentes__categorias'>
                    <MenuCard text='Procedente Juridico' propFn={handleNavigateToProcedenteJuridico} />
                    <MenuCard text='Procedente Arquitectonico' propFn={handleNavigateToProcedentesArquitectonicos} />
                    <MenuCard text='Procedente de Ingenieria' propFn={handleNavigateToProcedentesIngenieria} />
                </div>
            }
            {
                user.usertype === 'juridico' &&
                <div className='menuprocedentes__categorias'>
                    <MenuCard text='Procedente Juridico' propFn={handleNavigateToProcedenteJuridico} />
                </div>
            }
            {
                user.usertype === 'arquitectonico' &&
                <div className='menuprocedentes__categorias'>
                    <MenuCard text='Procedente Arquitectonico' propFn={handleNavigateToProcedentesArquitectonicos} />
                </div>
            }
            {
                user.usertype === 'ingenieria' &&
                <div className='menuprocedentes__categorias'>
                    <MenuCard text='Procedente de Ingenieria' propFn={handleNavigateToProcedentesIngenieria} />
                </div>
            }
            {/*<div className='menu-categorias-observaciones__categorias'>
                <MenuCard text='Procedente Juridico' propFn={handleNavigateToProcedenteJuridico} />
                <MenuCard text='Procedente Arquitectonico' propFn={handleNavigateToProcedentesArquitectonicos} />
                <MenuCard text='Procedente de Ingenieria' propFn={handleNavigateToProcedentesIngenieria} />
            </div>*/}
            
        </div>
    )
}

export default MenuCategoriasProcedentes
