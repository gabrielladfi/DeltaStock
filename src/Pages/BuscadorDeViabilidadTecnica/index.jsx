import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordeviabilidadtecnica.scss'

function BuscadorDeViabilidadTecnica() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToViabilidadTecnica } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion
                title={'Buscador Viabilidad Técnica'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToViabilidadTecnica} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeViabilidadTecnica