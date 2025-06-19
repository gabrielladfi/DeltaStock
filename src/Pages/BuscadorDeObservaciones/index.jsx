import { useContext, useEffect } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import BuscadorPorNumeroDeRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import Modal from '../../Components/Modal'
import './buscadordeobservaciones.scss'
import MenuCategoriasObservaciones from '../../Components/MenuCategoriasObservaciones'
import PrincipalPage from '@/Components/Pages/PrincipalPage'

function BuscadorDeObservaciones() {

    const { setValorParaFiltrar, selecionAreaObservacionesModal, setSelecionAreaObservacionesModal } = useContext(GlobalState);

    function handleAbrirModal() {
        setSelecionAreaObservacionesModal(true);
    }

    useEffect(() => {
        return () => {
            setSelecionAreaObservacionesModal(false);
        }
    }, [])

    return (
        <PrincipalPage>
            <BuscadorPorNumeroDeRadicacion
                title={'Buscador de Observaciones por número tramite'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={handleAbrirModal} />
            </BuscadorPorNumeroDeRadicacion>
            {
                selecionAreaObservacionesModal && <Modal> <MenuCategoriasObservaciones /> </Modal>
            }
        </PrincipalPage>
    )
}

export default BuscadorDeObservaciones
