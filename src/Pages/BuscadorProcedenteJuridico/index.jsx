import { useContext } from 'react';
import { GlobalState } from '../../Context/GlobalContext';
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion';
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones';
import Modal from '../../Components/Modal';
import MenuCategoriasProcedentes from '../../Components/MenuCategoriasProcedentes';
import PrincipalPage from '@/Components/Pages/PrincipalPage';
import './buscadorprocedentejuridico.scss'


function BuscadorProcedenteJuridico() {

    const { setValorParaFiltrar, selecionTipoDeProcedente, setSelecionTipoDeProcedente } = useContext(GlobalState);
    
    function handleOpenModal() {
        setSelecionTipoDeProcedente(true);
    }

    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                title={'Buscador Procedentes'}
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={handleOpenModal} />
            </BuscadorPorNumeroRadicacion >
            {
                selecionTipoDeProcedente && <Modal> <MenuCategoriasProcedentes /> </Modal>
            }
        </PrincipalPage>
    )
}

export default BuscadorProcedenteJuridico
