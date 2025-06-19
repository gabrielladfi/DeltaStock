
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacioneslistadotitulares.scss'
import { getOtherAct } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { AuthContextState } from '@/Context/AuthContextContext';
import { useContext, useEffect, useState } from 'react';
import { useServiceGet } from '@/Api/useServiceGet';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { GlobalState } from '@/Context/GlobalContext';
import { useServicePost } from '@/Api/useServicePost';
import FormOAAgregarTitular from '@/Components/Molecules/FormOAAgregarTitular';
import OtherActsTableByNumberLands from '@/Components/Molecules/OtherActsTableByNumberLands';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';


function OtrasActuacionesListadoTitulares() {

    const { token } = useContext(AuthContextState);
    const { 
        setReloadGlobal, 
        reloadGlobal,
        openModal,
        setOpenModal
         } = useContext(GlobalState);

    const oaDataRadicacion = getOtherAct()
    const oaNumeroRadicacion = oaDataRadicacion.numero_radicacion

    const { data, refresh } = useServiceGet(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/titulares/buscar/?numero_radicacion=${oaNumeroRadicacion}`);

    
    const initialDataToFetch = {
        numero_radicacion: '10101010',
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

    

    return (
        <PrincipalPage firstpathname={'Otras Actuaciones'} pathActive={'Listado de Titulares'}>
            <TitleSectionInfo text='Listado de Titulares' />
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={oaNumeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>

            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nuevo Titular' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Titular'}
                    onClick={() => setOpenModal(true)}
                />
            </ContainerTitleButtonsAddData>
            <OtherActsTableByNumberLands isEdit={false} data={data} />
            {
                openModal && 
                <Modal>
                    <FormOAAgregarTitular closeModal={() => setOpenModal(false)} data={dataToFetch} fetchData={handlePostLand} getFetchData={handlegetDataFetch} />
                </Modal>
            }
        </PrincipalPage>
    )
}

export default OtrasActuacionesListadoTitulares
