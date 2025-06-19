/* eslint-disable react/prop-types */
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './buscadordeotrosactos.scss'
import OtherActsTable from '@/Components/Molecules/OtherActsTable'
import { setOtherAct } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'


function BuscadorDeOtrosActos() {


    const { navigateToOtrasActuacionesListadoPredios } = useNavigateProvider();

    const setOtherActToSessionStorage = (item) => {
        setOtherAct(item);
        navigateToOtrasActuacionesListadoPredios();
    }

    return (
        <PrincipalPage firstpathname={'Otras Actuaciones'} pathActive={'Predios'}>
            <TitleSectionInfo text='Buscador de otros actos' />
            <div className='div-line'></div>
            <OtherActsTable isEdit={false} rowFn={setOtherActToSessionStorage} />
        </PrincipalPage>
    )
}

export default BuscadorDeOtrosActos
