import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroDeRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaiones from '../../Components/TablaListadoRadicaciones'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordeoficios.scss'

function BuscadorDeOficios() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToOficios } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroDeRadicacion
                title={'Buscador de oficios por número de radicación'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaiones propNavegacion={navigateToOficios}/>
            </BuscadorPorNumeroDeRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeOficios
