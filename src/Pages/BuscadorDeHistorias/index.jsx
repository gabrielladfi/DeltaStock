import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import BuscadorPorNumeroDeRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordehistorias.scss'

function BuscadorDeHistorias() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToHistorias } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroDeRadicacion
                title={'Buscador de Historias por numero de radicacion'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToHistorias} />
            </BuscadorPorNumeroDeRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeHistorias
