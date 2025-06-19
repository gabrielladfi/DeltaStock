/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline'
import './formnewfile.scss'
import PrimaryInputLiquidaciones from '@/Components/Molecules/PrimaryInputLiquidaciones'
import PrimaryButton from '@/Components/PrimaryButton'
import PrimaryTextArea from '@/Components/Molecules/PrimaryTextArea'
import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate'
import PrimarySelectDropDown from '@/Components/Molecules/PrimarySelectDropDown'
import DropdownSearch from '@/Components/Molecules/DropdownSearch'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import PrimaryLabeledInput from '@/Components/Molecules/PrimaryLabeledInput'
import PrimaryLabel from '@/Components/Atoms/PrimaryLabel'
import { GlobalState } from '@/Context/GlobalContext'
import { useContext, useRef } from 'react'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '@/Components/Molecules/PickList'

function FormNewFile({ propFnCloseModal, propFnBasicInput, propFnDateInput,  propDataPost, statePost, propFnPostNewFile, propAddNumRadicacion, stateTitleForm }) {

    console.log(propDataPost.fecha);

    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const optionReciboSalida = [
        {  value: 'Entrada', option: 'Entrada' },
        { value: 'Salida', option: 'Salida' },
    ];

    const tramiteIniciado = useRef(true);

    const handleCloseModal = () => {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            propFnCloseModal();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        propFnCloseModal();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)
    }
    return (
        <> 
        <ModalBasicNew title='Agregar Oficio' propFunctionCloseModal={handleCloseModal}>
            <BoxContainerInputsByInfoBigScroll>
                <DropdownSearch propFnInput={propFnBasicInput} propValue={propDataPost.numero_radicacion} propAddNumRadicaciondd={propAddNumRadicacion} />
                <Input
                    textlabel='Nombre del Solicitante *'
                    name='nombre_solicitante'
                    onChange={propFnBasicInput}
                    value={propDataPost.nombre_solicitante}
                    placeholder='Ingrese el nombre del solicitante'
                />

                <Input
                    textlabel='Asunto *'
                    name='asunto'
                    onChange={propFnBasicInput}
                    value={propDataPost.asunto}
                    placeholder='Ingrese el asunto'
                />
        
                <PrimaryInputDate 
                    label='Fecha *'
                    className={'global_primary_input'}
                    value={formatDateToYYYYMMDD(propDataPost.fecha)}
                    onChangeFn={(e) => propFnDateInput( e, statePost )}
                    name={'fecha'}
                    blockWriteInput={true}
                />

                <PickList 
                    label='Recibo de Salida *'
                    name='recibo_salida'
                    onChange={propFnBasicInput}
                    value={propDataPost.recibo_salida}
                    placeholder='Ingrese el recibo de salida'
                    options={optionReciboSalida}
                    optionSelected='Selecciona una opción'
                />
                    
                    {/*<PrimaryInputLiquidaciones labelText={'Nombre del Solicitante *'} propName={'nombre_solicitante'} propFnInput={propFnBasicInput} propValue={propDataPost.nombre_solicitante} />*/}
                    {/*<PrimaryInputLiquidaciones labelText={'Asunto *'} propName={'asunto'} propFnInput={propFnBasicInput} propValue={propDataPost.asunto} />*/}
                    {/*<PrimarySelectDropDown labelText={'Recibo de Salida *'} propName={'recibo_salida'} propFnInput={propFnBasicInput} propValue={propDataPost.recibo_salida} propOptions={optionReciboSalida} />*/}
                    <PrimaryTextArea labelText={'Descripcion *'} propName={'descripcion'} propFnInput={propFnBasicInput} propValue={propDataPost.descripcion} />
                    </BoxContainerInputsByInfoBigScroll>
        <ContainerButtonsBackandNext>
            <PrimaryButtonNewSmall text={stateTitleForm ? 'Guardar Cambios' : 'Guardar Oficio'} onClick={propFnPostNewFile} />
        </ContainerButtonsBackandNext>

        </ModalBasicNew>
        
        {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, los datos ingresados no se guardarán."
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
        </>
    )
}

export default FormNewFile
