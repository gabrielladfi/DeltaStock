
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './reportecatastral.scss'
import { useContext, useState } from 'react'
import Modal from '@/Components/Modal'
import BuscadorPorNumeroRadicacion from '@/Components/BuscadorPorNumeroRadicacion'
import TablaListadoRadicaciones from '@/Components/TablaListadoRadicaciones'
import { GlobalState } from '@/Context/GlobalContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import FormularioReporteDane from '@/Components/Molecules/FormularioReporteDane'
import useLeaveTask from '@/Hooks/useLeaveTask'
function ReporteDane() {

    const { setValorParaFiltrar } = useContext(GlobalState);
    const [ BuscadorDeExpedientes, setBuscadorDeExpedientes ] = useState(false)

    const { handlefnmenu } = useLeaveTask()

    return (
        <PrincipalPage handlefnmenu={handlefnmenu} >
            <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Reporte DANE</h2>
                </article>
            </section>
            <FormularioReporteDane functionBuscarExpedientes={() => setBuscadorDeExpedientes(true)} />
            {
                BuscadorDeExpedientes &&
                <Modal>
                    <div className='reporte-catastarl-modal-buscador'>
                        <div className='reporte-catastarl-modal-buscador__header'>
                            <button onClickCapture={() => setBuscadorDeExpedientes(false)} className='reporte-catastarl-modal-buscador__header__button' onClick={() => setBuscadorDeExpedientes(false)}>
                                <XMarkIcon className='reporte-catastarl-modal-buscador__header__button__icon' />
                            </button>
                        </div>
                        <BuscadorPorNumeroRadicacion
                            title='Buscador de Responsables por numero de tramite'
                            setState={setValorParaFiltrar}
                        >
                            <TablaListadoRadicaciones />
                        </BuscadorPorNumeroRadicacion>
                    </div>
                </Modal>
            }
        </PrincipalPage>
    )
}

export default ReporteDane
