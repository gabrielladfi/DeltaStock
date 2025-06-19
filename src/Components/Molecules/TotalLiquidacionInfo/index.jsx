import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './totalliquidacioninfo.scss'
import PrimaryButton from '@/Components/PrimaryButton'
import { GlobalState } from '@/Context/GlobalContext'
import { useContext } from 'react'
import { useRef } from 'react'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'

TotalLiquidacionInfo.propTypes = {
    OnClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
    propFunction: PropTypes.func.isRequired
}

function TotalLiquidacionInfo({ OnClose, total, subTotal, propFunction }) {

    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const tramiteIniciado = useRef(true);

    const handleCloseModal = () => {

        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            OnClose();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        OnClose();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)
    }
    return (
        <>



        <div className='totalliquidacioninfo'>
            <section className='totalliquidacioninfo__header'>
                <span className='totalliquidacioninfo__header__title'>Resultado de la liquidación</span>
                <button className='totalliquidacioninfo__header__button' onClick={handleCloseModal}>
                    <XMarkIcon className='totalliquidacioninfo__header__button__icon' />
                </button>
            </section>
            <section className='totalliquidacioninfo__section--content'>
                <article className='totalliquidacioninfo__section--content__article'>
                    <span className='totalliquidacioninfo__section--content__article__title'>Valor Liquidado:</span>
                    <span className='totalliquidacioninfo__section--content__article__value'>{subTotal}</span>
                </article>
                <article className='totalliquidacioninfo__section--content__article'>
                    <span className='totalliquidacioninfo__section--content__article__title'>Valor mas IVA:</span>
                    <span className='totalliquidacioninfo__section--content__article__value'>{total}</span>
                </article>
            </section>
            <section className='totalliquidacioninfo__section--footer'>
                <PrimaryButton propFunction={propFunction} textButton={'Generar Documento'} />
            </section>
        </div>
            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se generara el documento."
                            alt="Imagen de alerta"
                            onClick={handleAbandonarProcesoModal}
                            textButton="Abandonar"
                            textButton2="Cancelar"
                            onClickCancel={handleCancelar}
                            image={warning}
                        />
                    </Modal>
                )
            }
        </>
    )
}

export default TotalLiquidacionInfo
