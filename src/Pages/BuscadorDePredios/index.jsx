import { useContext, useEffect } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './predios.scss'

function BuscadorDePredios() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToPredioPorNumeroRadicacion } = useNavigateProvider();

    useEffect(() => {
        return () => {
            setValorParaFiltrar('');
        }
    }, []);

    return (
        <PrincipalPage pathActive={'Buscador de predios por expediente'}>
            <BuscadorPorNumeroRadicacion
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToPredioPorNumeroRadicacion} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorDePredios
