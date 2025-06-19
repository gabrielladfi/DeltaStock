import { useContext } from 'react'
import PrimaryButton from '../../Components/PrimaryButton'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { OficiosProvider, OficiosState } from './Context/OficiosContext'
import Modal from '../../Components/Modal'
import { useAbrirModalNuevoOficio } from './Hooks/UseAbrirModalNuevoOficio'
import FormularioCrearNuevoOficio from './Components/FormularioCrearNuevoOficio'
import TablaListadoOficios  from './Components/TablaListadoDeOficios'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './oficios.scss'

function Oficios() {
    return (
        <>
            <OficiosProvider>
                <OficiosContent />
            </OficiosProvider>
        </>
    )
}

function OficiosContent() {

    const { agregarNuevoOficio } = useContext(OficiosState);
    const numeroRadicacion = getNumeroRadicacion();
    const { abrirModalNuevoOficio } = useAbrirModalNuevoOficio();   

    return (
        <PrincipalPage>
            <section className='global-section-all '>
                        <article className='global-article-tabla-observaciones'>
                            <h2 className='global-h2'>Información sobre Oficios</h2>
                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Número Radicación</label>
                                <p className='observaciones-num-radicacion'>{numeroRadicacion}</p>
                            </div>
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <TablaListadoOficios />
                    </section>

                    <section className='footer-section'>
                        <PrimaryButton textButton={'Ingresar Nuevo Oficio'} propFunction={abrirModalNuevoOficio} />
                    </section>

                    {
                        agregarNuevoOficio && 

                        <Modal> <FormularioCrearNuevoOficio /> </Modal>
                    }
        </PrincipalPage>
    )
}

export default Oficios
