import { useContext, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { HistoriasState } from '../../Context/HistoriaContext';
import { useFetchPut } from '../../../../Hooks/useFetchPut';
import { AuthContextState } from '../../../../Context/AuthContextContext';
import { urlBase, urlActualizarHistoria } from '../../../../Utils/UrlData';
import './formactualizarfechanota.scss'
import Modal from '@/Components/Modal';
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import { GlobalState } from '@/Context/GlobalContext';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';

function FormActualizarNota() {

    const { token } = useContext(AuthContextState);

    const tramiteIniciado = useRef(true);

    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState)

    const { 
        handleCloseFormularioActualizarNota,
        dataHistoriaSeleccionadaParaEditar,
        refetchGet,
        setVerMas
    } = useContext(HistoriasState);

    const [ dataFetchActualizarHistoria, setDataFetchActualizarHistoria ] = useState(dataHistoriaSeleccionadaParaEditar)


    function handleInptuChange(event) {
        const { name, value } = event.target;
        setDataFetchActualizarHistoria((prev) => ({
            ...prev,
            [name]: value, // Reemplazar el valor existente
        }));
    }

    const { fetchPut } = useFetchPut(token, `${urlBase}${urlActualizarHistoria}${dataFetchActualizarHistoria.id}`, dataFetchActualizarHistoria);

    const handlePutHistoria = async () => {
        await fetchPut('', refetchGet);
        handleCloseFormularioActualizarNota();
        setVerMas(false);
    }

    console.log(dataFetchActualizarHistoria)

    function handleCloseFormularioActualizarNotaValidator() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            handleCloseFormularioActualizarNota();
        }
    }   

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        handleCloseFormularioActualizarNota();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }

    return (
        <ModalBasicNew title='Actualizar Nota' propFunctionCloseModal={handleCloseFormularioActualizarNotaValidator}>
           
            
            <div className='formactualizarnota--textarea'>
                <label className='formactualizarnota--textarea__label' htmlFor="">Actualizar Nota</label>
                <textarea 
                    onChange={handleInptuChange}
                    value={dataFetchActualizarHistoria && dataFetchActualizarHistoria.notas ? dataFetchActualizarHistoria.notas : ''}
                    className='formactualizarnota--textarea__textarea' 
                    type="text" 
                    name='notas'
                />
            </div>
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Actualizar' onClick={handlePutHistoria} />
            </ContainerButtonsBackandNext>
            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se actualizara la nota."
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

export default FormActualizarNota
