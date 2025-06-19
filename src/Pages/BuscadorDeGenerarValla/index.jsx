import { useContext, useState } from 'react'
import BuscadorPorNumeroRadicacion from '../../Components/BuscadorPorNumeroRadicacion'
import { GlobalState } from '../../Context/GlobalContext'
import TablaListadoRadicaciones from '../../Components/TablaListadoRadicaciones'
import Modal from '../../Components/Modal'
import FormGenararValla from '../../Components/FormGenerarValla'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordegenerarvalla.scss'

function BuscadorDeGenerarValla() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const [ generarVallaModal, setGenerarVallaModal ] = useState(false);

    function handleOpenModal() {
        setGenerarVallaModal(true)
    }

    function handleCloseModal() {
        setGenerarVallaModal(false)
    }


    return (
        <PrincipalPage>
            <BuscadorPorNumeroRadicacion 
                title={'Buscador de Vallas por numero de radicacion'} 
                setState={setValorParaFiltrar}
            >
                <TablaListadoRadicaciones propNavegacion={handleOpenModal} />
            </BuscadorPorNumeroRadicacion>
            {
                generarVallaModal && <Modal> <FormGenararValla propFnCloser={handleCloseModal} /></Modal>
            }
        </PrincipalPage>
    )
}

export default BuscadorDeGenerarValla
