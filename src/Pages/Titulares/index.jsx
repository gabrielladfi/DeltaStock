import { useContext } from 'react'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import TablaListadoTitularesPorNumeroRadicacion from './Components/TablaListadoTitularesPorNumeroRadicacion'
import { TitularesProvider, TitularesState } from './TitularesContext/TitularesContext'
import Modal from '../../Components/Modal'
import { useAbrirModalNuevoTitular } from './Hooks/useAbrirModalNuevoTitular'
import FormularioCrearNuevoTitular from './Components/FormularioCrearNuevoTitular'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './titulares.scss'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'

function Titulares() {
    return(
        <TitularesProvider>
            <TitularesContent />
        </TitularesProvider>
    )
}

function TitularesContent() {

    const { agregarNuevoTitular } = useContext(TitularesState);
    const numeroRadicacion = getNumeroRadicacion();
    const { abrirModalNuevoTitular } = useAbrirModalNuevoTitular();

    return (
        <PrincipalPage firstpathname={'Buscador por Expediente'} pathActive={'Titulares'}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nuevo Titular' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Requisito'}
                    onClick={abrirModalNuevoTitular}
                />
            </ContainerTitleButtonsAddData>

            <TablaListadoTitularesPorNumeroRadicacion />
        
            {
                agregarNuevoTitular && 

                <Modal> <FormularioCrearNuevoTitular /> </Modal>
            }
        </PrincipalPage>
    )
}

export default Titulares
