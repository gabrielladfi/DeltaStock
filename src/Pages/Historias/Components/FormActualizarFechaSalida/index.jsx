import { useContext, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { HistoriasState } from '../../Context/HistoriaContext';
import { useFetchPut } from '../../../../Hooks/useFetchPut';
import { AuthContextState } from '../../../../Context/AuthContextContext';
import { urlBase, urlActualizarHistoria } from '../../../../Utils/UrlData';
import './formactualizarfechasalida.scss'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion';
import Modal from '@/Components/Modal';
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import { GlobalState } from '@/Context/GlobalContext';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
function FormActualizarFechaSalida() {

    const user = getDataUser();
    const { token } = useContext(AuthContextState);

    const { 
        handleCloseFormularioActualizarHistoria,
        dataHistoriaSeleccionadaParaEditar,
        refetchGet,
        setSelectedRow,
        setVerMas
    } = useContext(HistoriasState);

    const [ dataFetchActualizarHistoria, setDataFetchActualizarHistoria ] = useState(dataHistoriaSeleccionadaParaEditar)

    const tramiteIniciado = useRef(true);

    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState)
    // Función para manejar la fecha de la nueva observación
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

    const { fetchPut } = useFetchPut(token, `${urlBase}${urlActualizarHistoria}${dataFetchActualizarHistoria.id}`, dataFetchActualizarHistoria);

    const handlePutHistoria = async () => {
        await fetchPut('', refetchGet);
        handleCloseFormularioActualizarHistoria();
        setVerMas(false);
    }

    function handleCloseFormularioActualizarHistoriaValidator() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            handleCloseFormularioActualizarHistoria();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        handleCloseFormularioActualizarHistoria();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }

    return (
        <ModalBasicNew title='Actualizar Fecha de Salida' propFunctionCloseModal={handleCloseFormularioActualizarHistoriaValidator}>
        
           
            
            
                <PrimaryInputDate 
                    label='Fecha de Salida'
                    className={'input-base__input agregarrequisito--input'}
                    value={dataFetchActualizarHistoria && dataFetchActualizarHistoria.fecha_salida ? getFormattedDate(dataFetchActualizarHistoria.fecha_salida) : ''}
                    onChangeFn={handleNuevaObservacionFecha}
                    name={'fecha_salida'}
                    blockWriteInput={true}
                />
                {/*eliminar<input 
                    onChange={handleNuevaObservacionFecha}
                    value={dataFetchActualizarHistoria && dataFetchActualizarHistoria.fecha_salida ? getFormattedDate(dataFetchActualizarHistoria.fecha_salida) : ''}
                    className='input-base__input agregarrequisito--input' 
                    type="date" 
                    name='fecha_salida'
                />*/}
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Actualizar' onClick={handlePutHistoria} />
            </ContainerButtonsBackandNext>
            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se actualizara la fecha de salida."
                            alt="Imagen de alerta"
                            onClick={handleAbandonarProcesoModal}
                            textButton="Abandonar"
                            textButton2="Cancelar"
                            onClickCancel={handleCancelar}
                            image={warning}
                        />
                    </Modal>
                )
            }

        </ModalBasicNew>
       
                            
    )
}

export default FormActualizarFechaSalida
