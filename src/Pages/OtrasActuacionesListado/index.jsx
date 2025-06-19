
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacioneslistado.scss'
import OtherActsTable from '@/Components/Molecules/OtherActsTable'
import { GlobalState } from '@/Context/GlobalContext';
import { useContext } from 'react';
import FormOAPutTramite from '@/Components/Molecules/FormOAPutTramite';
import Modal from '@/Components/Modal';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';

function OtrasActuacionesListado() {

    const { openModalDataPutTramiteOA } = useContext(GlobalState);


    return (
        <PrincipalPage firstpathname={'Otras Actuaciones'} pathActive={'Listado de radicados'}>
            <TitleSectionInfo text='Listado de radicados' />
            <div className='div-line'></div>
            <OtherActsTable verMas={true} />
            {
                openModalDataPutTramiteOA && (
                    <Modal>
                        <FormOAPutTramite />
                    </Modal>
                )
            }
        </PrincipalPage>
    )
}

export default OtrasActuacionesListado
