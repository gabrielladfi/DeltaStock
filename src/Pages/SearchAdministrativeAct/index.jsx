import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './searchadministrativeact.scss'

function SearchAdministrativeAct() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToAdministrativeAct } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                        title={'Buscador de Historias por numero de radicacion'}
                        setState={setValorParaFiltrar}
                    >
                        <TablaListadoRadicaciones propNavegacion={navigateToAdministrativeAct} />
                    </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default SearchAdministrativeAct
