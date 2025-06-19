import { useContext, useEffect } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import  BuscadorPorNumeroRadicacion  from '../../Components/BuscadorPorNumeroRadicacion'
import  TablaListadoRadicaciones  from '../../Components/TablaListadoRadicaciones'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadorprediosnuradicacion.scss'
import '../../Sass/globalSass.scss'


function BuscadorTramitesRadicacion() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const { navigateToEstadoRequisitos} = useNavigateProvider();

    useEffect(() => {
        return () => {
            setValorParaFiltrar('');
        }
    }, []);

    return (
        <PrincipalPage pathActive={'Buscador de predios por expediente'}>
            <BuscadorPorNumeroRadicacion
                title={'Buscador de tramites por número de radicación'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={navigateToEstadoRequisitos} />
            </BuscadorPorNumeroRadicacion>
        </PrincipalPage>
    )
}

export default BuscadorTramitesRadicacion
