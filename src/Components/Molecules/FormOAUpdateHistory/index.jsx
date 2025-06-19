import './formoaupdatehistory.scss'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import { GlobalState } from '@/Context/GlobalContext'
import { useContext, useState } from 'react'
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { AuthContextState } from '@/Context/AuthContextContext'
import { useUpgradeHistoryOtherActs } from '@/Store/useUpgradeHistoryOtherActs'
import { useServicePut } from '@/Api/useServicePut'
import ModalBasicNew from '../ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'

function FormOAUpdateHistory() {

    const user = getDataUser();
    const { item } = useUpgradeHistoryOtherActs();
    const { token } = useContext(AuthContextState);

    const { setOpenModalUpdateHistoryOtherActs, setReloadGlobal, setOpenModalVerMasOAHistorias } = useContext(GlobalState)

    const [ dataFetchActualizarHistoria, setDataFetchActualizarHistoria ] = useState(item)

    function handleNuevaObservacionFecha(event) {
        const { name, value } = event.target;
        setDataFetchActualizarHistoria((prev) => ({
            ...prev,
            [name]: `${value}T00:00:00Z`, // Reemplazar el valor existente
            finalizado_por: user.email
        }));
    }

    // Función para obtener la fecha formateada para poder mostrar en el input
    function getFormattedDate(value) {
        // Si el valor es una cadena concatenada por comas, toma la primera parte
        const firstDate = value.split(',')[0]; // Tomar la primera fecha
        return firstDate ? firstDate.split('T')[0] : ''; // Convertir a 'YYYY-MM-DD'
    }

    console.log(dataFetchActualizarHistoria)

    const { executePut } = useServicePut();

    const handlePutHistoria = async () => {
        await executePut(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/historias/${dataFetchActualizarHistoria.id}/`, dataFetchActualizarHistoria);
        setReloadGlobal(true);
        setOpenModalVerMasOAHistorias(false);
        setOpenModalUpdateHistoryOtherActs(false);
    }

    return (
        <ModalBasicNew title='Actualizar Historia' propFunctionCloseModal={() => setOpenModalUpdateHistoryOtherActs(false)}>
            <BoxContainerInputsByInfoBigScroll>
                <PrimaryInputDate
                    label='Fecha de Salida'
                    value={dataFetchActualizarHistoria && dataFetchActualizarHistoria.fecha_salida ? getFormattedDate(dataFetchActualizarHistoria.fecha_salida) : ''}
                    onChangeFn={handleNuevaObservacionFecha}
                    className={'input-base__input agregarrequisito--input'}
                    name='fecha_salida'
                    blockWriteInput={false}
                />

            </BoxContainerInputsByInfoBigScroll>
            
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall onClick={handlePutHistoria} text={'Actualizar Salida'} />
            </ContainerButtonsBackandNext>

        </ModalBasicNew>
        
    )
}

export default FormOAUpdateHistory
