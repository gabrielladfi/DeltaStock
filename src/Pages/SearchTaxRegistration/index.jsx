
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './searchtaxregistration.scss'
import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import { useNavigateProvider } from '@/Hooks/useNavigateProvider';

function SearchTaxRegistration() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToTaxRegistration } = useNavigateProvider();

    return (
        
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                title={'Buscador de Historias por numero de radicacion'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToTaxRegistration} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default SearchTaxRegistration
