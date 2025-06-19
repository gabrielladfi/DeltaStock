import { useContext } from 'react'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import './buscadordeexpedientes.scss'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import PrincipalPage from '@/Components/Pages/PrincipalPage'


function BuscadorDeExpedientes() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const {navigateToMenuNumeroRadicacion} = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                title='Busqueda por Expediente' 
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToMenuNumeroRadicacion} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeExpedientes
