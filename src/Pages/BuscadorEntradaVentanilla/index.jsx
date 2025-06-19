import PrincipalPage from '@/Components/Pages/PrincipalPage'
import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import { useNavigateProvider } from '@/Hooks/useNavigateProvider';
import './buscadorentradaventanilla.scss'


function BuscadorEntradaVentanilla() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToEntradaVentanilla } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion
                title={'Buscador de Historias por numero de radicacion'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToEntradaVentanilla} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorEntradaVentanilla