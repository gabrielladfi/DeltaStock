
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './reportes.scss'
import CardReportes from '@/Components/Molecules/CardReportes'
import { useState } from 'react'
import Modal from '@/Components/Modal'
import FormularioReporteCatastral from '@/Components/Molecules/FormularioReporteCatastral'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import MenuCard from '@/Components/MenuCard'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import StepContentNR from '@/Components/Atoms/StepContentNR'

function Reportes() {

    //const [ reporteCatastral, setReporteCatastral ] = useState(false)

    const { navigateToReporteCatastral, navigateToReporteDane } = useNavigateProvider()

    return (
        <PrincipalPage pathActive={'Reportes'}>
            <StepContentNR>
            <BoxContainerInputsByInfo>
                <ContainerInputsNRNew>
                    <MenuCard text='Reporte Catastral' propFn={navigateToReporteCatastral} />
                    <MenuCard text='Min Vivienda' />
                    <MenuCard text='DANE' propFn={navigateToReporteDane} />
                </ContainerInputsNRNew>

            </BoxContainerInputsByInfo>
            </StepContentNR>
            {/*
                reporteCatastral &&
                <Modal>
                    <FormularioReporteCatastral />
                </Modal>
            */}
        </PrincipalPage>
    )
}

export default Reportes
