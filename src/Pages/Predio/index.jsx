import { useContext, useEffect } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { PredioProvider } from './Context/PredioContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import { PlusIcon } from '@heroicons/react/24/outline'
import TablaDePredios from './Components/TablaDePredios'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './predio.scss'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'


function Predio() {
    return (
        <PredioProvider>
            <PredioContent />
        </PredioProvider>
    )
}

function PredioContent() {

    const { globalNumeroRadicacion } = useContext(GlobalState);
    const { navigateToAgregarNuevoPredio } = useNavigateProvider();

    function handleAgregarNuevoPredio(){
        navigateToAgregarNuevoPredio();
    }

    function guardarNumeroRadicacionLocalStorage(){
        localStorage.setItem('numeroRadicacionLocalStorage', globalNumeroRadicacion);
    }

    useEffect(() => {
        guardarNumeroRadicacionLocalStorage();
    }, [globalNumeroRadicacion]);

    return (
        <PrincipalPage firstpathname={'Buscador de predios por expediente'} pathActive={'Predios'}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={globalNumeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Registrar Predio' />
                <PrimaryButtonNewSmall
                    backgroundColor='#D7A100'
                    text={'Agregar Predio'}
                    onClick={handleAgregarNuevoPredio}
                />
            </ContainerTitleButtonsAddData>
                    
            <TablaDePredios />
        </PrincipalPage>
    )
}

export default Predio
