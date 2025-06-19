
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacioneshistoria.scss'
import Modal from '@/Components/Modal'
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import PrimaryContainerFilters from '@/Components/Molecules/PrimaryContainerFilters';
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import { TrashIcon } from '@heroicons/react/24/outline';
import SectionClosermodals from '@/Components/SectionClosermodals';
import FormularioEncargados from '@/Components/FormularioEncargados';
import FormOACreateHistories from '@/Components/Molecules/FormOACreateHistories';
import FormOAUpdateHistory from '@/Components/Molecules/FormOAUpdateHistory';
import FormOAAddNote from '@/Components/Molecules/FormOAAddNote';
import TablaListadoOficios from '@/Components/TablaListadoOficios';

function OtrasActuacionesHistoria() {

    const { 
        openModalNewHistoryOtherActs, 
        setOpenModalNewHistoryOtherActs,
        openModalUpdateHistoryOtherActs,
        setOpenModalUpdateHistoryOtherActs,
        openModalNotesHistoryOtherActs,
        setOpenModalNotesHistoryOtherActs,
        showCuratorshipManagers,
        setShowCuratorshipManagers,
        actualizacionEncargados
    } = useContext(GlobalState);

    function handleActualizarEncargadosVerificacion() {
        if (actualizacionEncargados === true) {
           alert('Debes guardar los cambios antes de salir')
        }else {
            setShowCuratorshipManagers(false)
        }
    }

    return (
        <PrincipalPage>
            <section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Historia</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Número Tramite</label>
                        <p className='observaciones-num-radicacion'>{1234567890}</p>
                    </div>
                </article>
            </section>
            <section className='global-section-all '>
                        <article className='global-article-tabla-observaciones'>
                            <PrimaryContainerFilters>
                            <PrimaryInputDate 
                                    className='global_primary_input' 
                                    blockWriteInput={true}
                                />
                                
                                <button className='trash'><TrashIcon className='trash__icon' /></button>

                            </PrimaryContainerFilters>
                            
                        </article>
                    </section>
            <section className='global-section-all '>
                <TablaListadoOficios />
            </section>

            <section className='footer-section'>
                <button onClick={() => setOpenModalNewHistoryOtherActs(true)} className='footer-section__button'>Ingresar Etapas</button>
                <button onClick={() => setOpenModalUpdateHistoryOtherActs(true)} className='footer-section__button'>Actualizar Historia</button>
                <button onClick={() => setOpenModalNotesHistoryOtherActs(true)} className='footer-section__button'>Notas Historia</button>
                <button onClick={() => setShowCuratorshipManagers(true)} className='footer-section__button'>Encargados Curaduria</button>
            </section>

            {
                openModalNewHistoryOtherActs && 

                <Modal> <FormOACreateHistories /> </Modal>
            }

            {
                openModalUpdateHistoryOtherActs && 

                <Modal> <FormOAUpdateHistory /> </Modal>
            }

            {
                openModalNotesHistoryOtherActs && 

                <Modal> <FormOAAddNote /> </Modal>
            }

            {
                showCuratorshipManagers && 

                <Modal>
                    <div className='historias-encargados'>
                        <SectionClosermodals propTitleModal={'Encargados Curaduria'} prophandleCerrarModal={handleActualizarEncargadosVerificacion}  />
                        <FormularioEncargados />
                    </div>
                </Modal>
            }
            

        </PrincipalPage>
    )
}

export default OtrasActuacionesHistoria
