import { useContext } from 'react'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordefechas.scss'

function BuscadorDeFechas() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToFechas } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion
                title='Buscador de Fechas'
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToFechas}/>
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeFechas
