import { useContext } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaDeListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import './buscadordecambioderesponsable.scss'
import PrincipalPage from '@/Components/Pages/PrincipalPage'

function BuscadorDeCambioDeResponsable() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToCambioDeResponsable } = useNavigateProvider();

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                title='Buscador para Cambios de Responsable Curaduria'
                setState={setValorParaFiltrar}
            >
                <TablaDeListadoRadicaciones propNavegacion={navigateToCambioDeResponsable} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDeCambioDeResponsable
