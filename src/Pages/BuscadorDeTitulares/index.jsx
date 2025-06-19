import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordetitulares.scss'

function BuscadorDeTitulares() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToTitulares } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                title={'Buscador de titulares por número de tramite'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToTitulares} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeTitulares
