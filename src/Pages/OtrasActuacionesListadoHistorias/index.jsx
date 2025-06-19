
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacioneslistadohistorias.scss'
import { getOtherAct } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { AuthContextState } from '@/Context/AuthContextContext';
import { useContext, useEffect, useState } from 'react';
import { useServiceGet } from '@/Api/useServiceGet';
//import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { GlobalState } from '@/Context/GlobalContext';
import { useServicePost } from '@/Api/useServicePost';
import FormOAAgregarTitular from '@/Components/Molecules/FormOAAgregarTitular';
import OtherActsTableByNumberHistories from '@/Components/Molecules/OtherActsTableByNumberHistories';
import FormOACreateHistories from '@/Components/Molecules/FormOACreateHistories';
import FormOAUpdateHistory from '@/Components/Molecules/FormOAUpdateHistory';
import FormOAAddNote from '@/Components/Molecules/FormOAAddNote';
import SectionClosermodals from '@/Components/SectionClosermodals';
import FormularioEncargados from '@/Components/FormularioEncargados';
import { useUpgradeHistoryOtherActs } from '@/Store/useUpgradeHistoryOtherActs';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';


function OtrasActuacionesListadoHistorias() {

    const { token } = useContext(AuthContextState);
    const { 
        setReloadGlobal, 
        reloadGlobal,
        openModal,
        setOpenModal,
        openModalNewHistoryOtherActs, 
        setOpenModalNewHistoryOtherActs,
        openModalUpdateHistoryOtherActs,
        setOpenModalUpdateHistoryOtherActs,
        openModalNotesHistoryOtherActs,
        setOpenModalNotesHistoryOtherActs,
        showCuratorshipManagers,
        setShowCuratorshipManagers,
        actualizacionEncargados,
        selectedRow
    } = useContext(GlobalState);

    function handleActualizarEncargadosVerificacion() {
        if (actualizacionEncargados === true) {
           alert('Debes guardar los cambios antes de salir')
        }else {
            setShowCuratorshipManagers(false)
        }
    }

    const oaDataRadicacion = getOtherAct()
    const oaNumeroRadicacion = oaDataRadicacion.numero_radicacion

    const { data, refresh } = useServiceGet(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/historias/buscar/?numero_radicacion=${oaNumeroRadicacion}`);

    
    const initialDataToFetch = {
        numero_radicacion: oaNumeroRadicacion,
        nombre: "",
        email: "",
        phone: "",
        dni: ""
    }

    const [ dataToFetch, setDataToFetch ] = useState(initialDataToFetch)

    const handlegetDataFetch = ({ target }) => {
        setDataToFetch({ ...dataToFetch, [target.name]: target.value })
    }

    const { executePost } = useServicePost()

    const handlePostLand = () => {
        setReloadGlobal(true)
        executePost(token, 'https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/titulares/', dataToFetch)
        setDataToFetch(initialDataToFetch)
    }

    useEffect(() => {
        if (reloadGlobal) {
            refresh()
            setReloadGlobal(false)
        }
    }, [reloadGlobal])

    const { item, setItem } = useUpgradeHistoryOtherActs();

    const getDataActTable = (data) => {
        setItem(data)
    }

    

    console.log(item)

    return (
        <PrincipalPage firstpathname={'Otras Actuaciones'} pathActive={'Listado de Historias'}>
            <TitleSectionInfo text='Listado de Historias' />
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={oaNumeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nueva Historia' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Historia'}
                    onClick={() => setOpenModalNewHistoryOtherActs(true)}
                />
            </ContainerTitleButtonsAddData>
           {/*<section className='global-section-all '>
                <article className='global-article-tabla-observaciones'>
                    <h2 className='global-h2'>Historiassss</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Número Radicación</label>
                        <p className='observaciones-num-radicacion'>{oaNumeroRadicacion}</p>
                    </div>
                </article>
            </section>*/}
            <OtherActsTableByNumberHistories isEdit={false} data={data} rowFn={getDataActTable} updateNotes={() => setOpenModalNotesHistoryOtherActs(true)} updateSalida={() => setOpenModalUpdateHistoryOtherActs(true)} />
            {/*<section className='global-section-all observgaciones-buttons-section'>
                <article className='observaciones-buttons'>
                    <button onClick={() => setOpenModalUpdateHistoryOtherActs(true)} className={`global-button-save ${!selectedRow ? 'button-inactive-oa' : ''}`}>Actualizar Historial</button>
                    <button onClick={() => setOpenModalNotesHistoryOtherActs(true)} className={`global-button-save ${!selectedRow ? 'button-inactive-oa' : ''}`}>Notas Historia</button>
                    <PrimaryButton propFunction={() => setShowCuratorshipManagers(true)} textButton={'Encargados Curaduria'}  />
                </article>
            </section>*/}

            {
                openModal && 
                <Modal>
                    <div className='modal-oa-predio-predio__container'>
                        <FormOAAgregarTitular closeModal={() => setOpenModal(false)} data={dataToFetch} fetchData={handlePostLand} getFetchData={handlegetDataFetch} />
                    </div>
                </Modal>
            }

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

export default OtrasActuacionesListadoHistorias
