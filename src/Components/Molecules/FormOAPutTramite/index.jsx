import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import PrimaryButton from '@/Components/PrimaryButton'
import { useContext, useRef, useState } from 'react'
import { AuthContextState } from '@/Context/AuthContextContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { GlobalState } from '@/Context/GlobalContext'
import { useDataTableItemOtherActsStore } from '@/Store/useDataTableItemOtherActsStore'
import { useServicePut } from '@/Api/useServicePut'
import PrimaryInputWithOutValidator from '@/Components/Atoms/PrimaryInputWithOutValidator'
import './formoaputtramite.scss'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'
import ModalBasicNew from '../ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import PickList from '../PickList'
import { Input } from '@/Components/Atoms/Input/Input'

function FormOAPutTramite() {

    const { token } = useContext(AuthContextState);
    const { setOpenModalDataPutTramiteOA, setReloadGlobal, setAbandonandoTramiteModal, abandonandoTramiteModal, setOpenModalVerMasOAHistoriasListado } = useContext(GlobalState);
    const { item } = useDataTableItemOtherActsStore();
    const {
        executePut 
    } = useServicePut();

    const tramiteIniciado = useRef(true);

    const initialDataPost = {
        numero_radicacion: item.numero_radicacion,
        typo_tramite: item.typo_tramite,
        uso_especifico: item.uso_especifico,
        otros_usos: item.otros_usos,
        area_residencial: item.area_residencial,
        is_horizontal: item.is_horizontal,
        is_ccomercial: item.is_ccomercial
    }

    const [dataPutTramite, setDataPutTramite] = useState(initialDataPost);

    const optionsYesorNo = [
        {
            value: true,
            option: 'Si'
        },
        {
            value: false,
            option: 'No'
        }
    ];

    const optionsTypeProcess = [
        {
            value: 'licencia_construccion',
            option: 'Licencia de Construcción'
        },
        {
            value: 'licencia_urbanismo',
            option: 'Licencia de Urbanismo'
        }
    ];

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setDataPutTramite({
            ...dataPutTramite,
            [name]: value
        })
    }

    console.log(dataPutTramite);

    const handlePut = async () => {
        await executePut(token, `https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/radicacion/${item.id}/`, dataPutTramite);
        setDataPutTramite(initialDataPost);
        setOpenModalDataPutTramiteOA(false);
        setReloadGlobal(true);
        setOpenModalVerMasOAHistoriasListado(false);
    }

    function handleCloseFormOAPutTramiteValidator() {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            setOpenModalDataPutTramiteOA(false);
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false);
        setOpenModalDataPutTramiteOA(false);
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false);
    }


    return (
        <ModalBasicNew title='Actualizar Trámite' propFunctionCloseModal={handleCloseFormOAPutTramiteValidator}>
            <BoxContainerInputsByInfoBigScroll>

                <PickList 
                    onChange={handleChange} 
                    name={'typo_tramite'} 
                    options={optionsTypeProcess} 
                    value={dataPutTramite.typo_tramite} 
                    optionSelected='Selecciona tipo de trámite'
                    label='Tipo de Trámite' 
                />
                <Input 
                    textlabel='Uso Específico'
                    onChange={handleChange} 
                    name={'uso_especifico'} 
                    value={dataPutTramite.uso_especifico} 
                />
            <Input 
                onChange={handleChange} 
                name={'otros_usos'} 
                value={dataPutTramite.otros_usos} 
                textlabel='Otro Usos' 
            />
            <Input 
                onChange={handleChange}
                name={'area_residencial'} 
                value={dataPutTramite.area_residencial} 
                textlabel='Área' 
            />
            <PickList 
                onChange={handleChange}
                name={'is_horizontal'} 
                options={optionsYesorNo} 
                value={dataPutTramite.is_horizontal} 
                optionSelected='Selecciona si es propiedad horizontal'
                label='¿Es Propiedad Horizontal?' 
            />
            <PickList 
                onChange={handleChange}
                name={'is_ccomercial'} 
                options={optionsYesorNo} 
                value={dataPutTramite.is_ccomercial} 
                optionSelected='Selecciona si es centro comercial'
                label='¿Es Centro Comercial?' 
            />

            </BoxContainerInputsByInfoBigScroll>
        
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Actualizar Trámite' onClick={handlePut} />
            </ContainerButtonsBackandNext>

            {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se actualizara el trámite."
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

export default FormOAPutTramite
