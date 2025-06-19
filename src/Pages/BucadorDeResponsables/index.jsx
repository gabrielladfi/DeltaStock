import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import './buscadorderesponsables.scss'
import PrincipalPage from '@/Components/Pages/PrincipalPage'



function BuscadorDeResponsables() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToResponsables } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion
                title='Buscador de Responsables por numero de tramite'
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToResponsables} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeResponsables
