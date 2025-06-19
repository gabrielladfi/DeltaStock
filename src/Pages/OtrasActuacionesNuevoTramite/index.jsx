
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './otrasactuacionesnuevotramite.scss'
import FormOANuevoTramite from '@/Components/Molecules/FormOANuevoTramite'
import useLeaveTask from '@/Hooks/useLeaveTask'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'

function OtrasActuacionesNuevoTramite() {

    const { handlefnmenu } = useLeaveTask()

    return (
        <PrincipalPage firstpathname={'Otras Actuaciones'} pathActive={'Nuevo Trámite'} handlefnmenu={handlefnmenu}>
            <TitleSectionInfo text='Agregar Nuevo Trámite' />
            <div className='div-line'></div>
            <FormOANuevoTramite />
        </PrincipalPage>
    )
}

export default OtrasActuacionesNuevoTramite
