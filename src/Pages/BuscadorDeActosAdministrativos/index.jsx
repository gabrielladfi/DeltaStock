import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroDeRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import './buscadordeactosadministrativos.scss'
import PrincipalPage from '@/Components/Pages/PrincipalPage'

function BuscadorDeActosAdministrativos() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToActosAdministrativos } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroDeRadicacion 
                title={'Buscador para actos administrativos'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToActosAdministrativos} />
            </BuscadorPorNumeroDeRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeActosAdministrativos
