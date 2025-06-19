
import { useContext } from 'react'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import Modal from '../../Components/Modal'
import { useAbrirModalNuevoResponsable } from './Hooks/useAbrirModalNuevoResponsable'
import TablaListadoResponsablesPorNumeroRadicacion from './Components/TablaListadoResponsablesPorNumeroRadicacion'
import { ResponsablesProvider, ResponsablesState } from './ResponsablesContext/ResponsableContext'
import FormularioCrearNuevoResponsable from './Components/FormularioCrearNuevoResponsable'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './titulares.scss'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'


function Responsables() {
    return(
        <ResponsablesProvider>
            <ResponsablesContent />
        </ResponsablesProvider>
    )
}

function ResponsablesContent() {

    const { agregarNuevoResponsable } = useContext(ResponsablesState);
    const numeroRadicacion = getNumeroRadicacion();
    const { abrirModalNuevoResponsable } = useAbrirModalNuevoResponsable();

    return (
        <PrincipalPage firstpathname={'Buscador de responsables por expediente'} pathActive={'Responsables'}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Nuevo Responsable' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Responsable'}
                    onClick={abrirModalNuevoResponsable}
                />
            </ContainerTitleButtonsAddData>
            <TablaListadoResponsablesPorNumeroRadicacion />

            {
                agregarNuevoResponsable && 

                <Modal> <FormularioCrearNuevoResponsable /> </Modal>
            }
        </PrincipalPage>
    )
}

export default Responsables
