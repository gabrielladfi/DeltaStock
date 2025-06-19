
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacionestitulares.scss'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import Modal from '@/Components/Modal';
import FormOAAgregarTitular from '@/Components/Molecules/FormOAAgregarTitular';
import TablaListadoOficios from '@/Components/TablaListadoOficios';
function OtrasActuacionesTitulares() {

    const { openModalNuevoTitularOtrasActuaciones, setOpenModalNuevoTitularOtrasActuaciones } = useContext(GlobalState);

    return (
        <PrincipalPage>
            <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Titulares</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Número Tramite</label>
                        <p className='observaciones-num-radicacion'>{1234567890}</p>
                    </div>
                </article>
            </section>

            <section className='global-section-all '>
                <TablaListadoOficios />
            </section>

            <section className='footer-section'>
                <button onClick={() => setOpenModalNuevoTitularOtrasActuaciones(true)} className='footer-section__button'>Agregar Nuevo Titular</button>
            </section>

            {
                openModalNuevoTitularOtrasActuaciones &&
                <Modal> <FormOAAgregarTitular /> </Modal>
            }

        </PrincipalPage>
    )
}

export default OtrasActuacionesTitulares
