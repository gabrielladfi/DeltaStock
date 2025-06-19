import PrincipalPage from '@/Components/Pages/PrincipalPage'
import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
//import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
//import { useNavigateProvider } from '@/Hooks/useNavigateProvider';
import TablaListadoOficios from '@/Components/TablaListadoOficios';
import './buscadorentradaventanilla.scss'


function BuscadorTodosOficiosEntradaVentanilla() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    //const { navigateToEntradaVentanilla } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion
                setState={setValorParaFiltrar}
            >
                {/*<TablaListadoRadicaciones propNavegacion={navigateToEntradaVentanilla} />*/}
                <TablaListadoOficios />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorTodosOficiosEntradaVentanilla
