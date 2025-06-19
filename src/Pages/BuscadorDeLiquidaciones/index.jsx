import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import './buscadordeliquidaciones.scss'
import PrincipalPage from '@/Components/Pages/PrincipalPage'

function BuscadorDeLiquidaciones() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToLiquidacionesExpensas } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion
                title={'Buscador de Liquidaciones por número de tramite'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToLiquidacionesExpensas}/>
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeLiquidaciones
