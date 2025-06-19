import SectionCloserFormsModal from '@/Components/SectionCloserFormsModal'
import PrimaryButton from '@/Components/PrimaryButton'
import { GlobalState } from '@/Context/GlobalContext'
import { useContext, useState } from 'react'
import { useUpgradeHistoryOtherActs } from '@/Store/useUpgradeHistoryOtherActs'
import { AuthContextState } from '@/Context/AuthContextContext'
import { useServicePut } from '@/Api/useServicePut'
import './formoaaddnote.scss'
import ModalBasicNew from '../ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import PrimaryTextArea from '../PrimaryTextArea'

function FormOAAddNote() {

    const { token } = useContext(AuthContextState);
    const { item } = useUpgradeHistoryOtherActs();

    const { setOpenModalNotesHistoryOtherActs, setReloadGlobal, setOpenModalVerMasOAHistorias  } = useContext(GlobalState)

    const [ dataFetchActualizarHistoria, setDataFetchActualizarHistoria ] = useState(item)

    function handleInptuChange(event) {
        const { name, value } = event.target;
        setDataFetchActualizarHistoria((prev) => ({
            ...prev,
            [name]: value, // Reemplazar el valor existente
        }));
    }

    console.log(dataFetchActualizarHistoria)

    const { executePut } = useServicePut();

    const handlePutHistoria = async () => {
        await executePut(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/historias/${dataFetchActualizarHistoria.id}/`, dataFetchActualizarHistoria);
        setReloadGlobal(true);
        setOpenModalVerMasOAHistorias(false);
        setOpenModalNotesHistoryOtherActs(false);
    }

    return (
        <ModalBasicNew title='Agregar Nota' propFunctionCloseModal={() => setOpenModalNotesHistoryOtherActs(false)}>
            <BoxContainerInputsByInfoBigScroll>
                <PrimaryTextArea
                    labelText='Nota'
                    propValue={dataFetchActualizarHistoria.notas}
                    propFnInput={handleInptuChange}
                    propName='notas'
                />
            </BoxContainerInputsByInfoBigScroll>
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall onClick={handlePutHistoria} text={'Agregar Nota'} />
            </ContainerButtonsBackandNext>
        </ModalBasicNew>
        
    )
}

export default FormOAAddNote
