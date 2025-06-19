import PrimaryInputNumberValidator from '@/Components/Atoms/PrimaryInputNumberValidator'
import PropTypes from 'prop-types'
import './formguardarliquidacion.scss'
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import PrimaryButton from '@/Components/PrimaryButton'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PrimaryInputWithOutValidator from '@/Components/Atoms/PrimaryInputWithOutValidator'
import { GlobalState } from '@/Context/GlobalContext'
import { useContext } from 'react'
import { useRef } from 'react'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import warning from '@/assets/warninglogo.svg'
import ModalBasicNew from '../ModalBasicNew'
import NumeroRadicacionFechaNR from '../NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import PickList from '../PickList'

FormGuardarLiquidacion.propTypes = {
    numero_radicacion: PropTypes.string.isRequired,
    valorLiquidado: PropTypes.number.isRequired,
    valorIva: PropTypes.number.isRequired,
    pago: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleGuardarLiquidacion: PropTypes.func.isRequired,
    handleChangeGuardarLiquidacionPago: PropTypes.func.isRequired,
    descripcion_tramite: PropTypes.string.isRequired,
    descripcion_modalidad: PropTypes.string.isRequired,
    cargo_variable: PropTypes.number.isRequired,
    area_residencial: PropTypes.number.isRequired,
    area_comercial: PropTypes.number.isRequired,
    area_industrial: PropTypes.number.isRequired,
    area_institucional: PropTypes.number.isRequired,
    usos: PropTypes.string.isRequired,
    estrato: PropTypes.string.isRequired
}

function FormGuardarLiquidacion({ 
    numero_radicacion, 
    descripcion_tramite,
    descripcion_modalidad,
    cargo_variable,
    area_residencial,
    area_comercial,
    area_industrial,
    area_institucional,
    usos,
    estrato,
    valorLiquidado, 
    valorIva, 
    pago, 
    handleChange, 
    closeModal, 
    handleGuardarLiquidacion, 
    handleChangeGuardarLiquidacionPago }) {

    const urbanizacionObj = [
        {id: 1, option: 'Desarrollo', value: 'desarrollo'},
        {id: 2, option: 'Reurbanización', value: 'reurbanizacion'},
        {id: 3, option: 'Saneamiento', value: 'saneamiento'},
    ];

    const subdivisionObj = [
        {id: 1, option: 'Rural', value: 'rural'},
        {id: 2, option: 'Urbana', value: 'urbana'},
        {id: 3, option: 'Autenticacion de Planos', value: 'planos'},
        {id: 4, option: 'Copia Adicional de Licencia', value: 'copia'},
        {id: 5, option: 'Reloteo', value: 'reloteo'},
    ];

    const construccionObj = [
        {id: 1, option: 'Obra nueva', value: 'obra_nueva'},
        {id: 2, option: 'Ampliación', value: 'ampliacion'},
        {id: 3, option: 'Adecuación', value: 'adecuacion'},
        {id: 4, option: 'Modificación', value: 'modificacion'},
        {id: 5, option: 'Restauración', value: 'restauracion'},
        {id: 6, option: 'Reforzamiento Estructural', value: 'reforzamiento_estructural'},
        {id: 7, option: 'Demolición parcial', value: 'demolicion_parcial'}, 
        {id: 8, option: 'Demolición total', value: 'demolicion_total'}, 
        {id: 9, option: 'Reconstrucción', value: 'reconstruccion'}, 
        {id: 10, option: 'Cerramiento', value: 'cerramiento'},
    ];

    const parcelacionObj = [
        {id: 1, option: 'Saneamiento', value: 'saneamiento'},
    ];

    const otrasActuacionesObj = [
        {id: 1, option: 'Ajuste de cotas de areas por proyecto', value: 'proyecto'},
        {id: 2, option: 'Aprobacion de planos de prop. horizontal', value: 'prop_horizontal'},
        {id: 3, option: 'Modificación de plano urbanistico', value: 'plano'},
        {id: 4, option: 'Concepto de norma urbanistica', value: 'norma'},
        {id: 5, option: 'Concepto de uso de suelo', value: 'suelo'},
        {id: 6, option: 'Aprobación de proyecto urbanistico', value: 'aprobacion_urbanistico'}
    ];

    const tipotramiteObj = [
        {id: 1, option: 'Licencia de construcción', value: 'Construcción'},
        {id: 2, option: 'Urbanización', value: 'Urbanización'},
        {id: 3, option: 'Subdivisión', value: 'Subdivisión'},
        {id: 4, option: 'Otras Actuaciones', value: 'Otros'},
        {id: 5, option: ' Parcelación', value: 'Parcelación'},
        {id: 6, option: 'VIS', value: 'VIS'},
    ] 

    const optionsPago = [
        { option: 'Realizado', value: true },
        { option: 'Pendiente', value: false }
    ]

    const estratos = [
        {id: 1, option: 'Estrato 1', value: '1'},
        {id: 2, option: 'Estrato 2', value: '2'},
        {id: 3, option: 'Estrato 3', value: '3'},
        {id: 4, option: 'Estrato 4', value: '4'},
        {id: 5, option: 'Estrato 5', value: '5'},
        {id: 6, option: 'Estrato 6', value: '6'},
    ]

    const usosObj= [
        {id: 1, option: 'Vivienda', value: 'Vivienda'},
        {id: 2, option: 'Comercial', value: 'Comercial'},
        {id: 3, option: 'Industrial', value: 'Industrial'},
        {id: 4, option: 'Institucional', value: 'Institucional'},
        {id: 5, option: 'Otros', value: 'Otros'},
    ]

    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const tramiteIniciado = useRef(true);

    const handleCloseModal = () => {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            closeModal();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        closeModal();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)
    }

    console.log(descripcion_tramite)

    return (
        <>
            <ModalBasicNew title='Guardar Liquidacion' propFunctionCloseModal={handleCloseModal}>
                <BoxContainerInputsByInfoBigScroll>
                    <NumeroRadicacionFechaNR>
                        <NumeroRadicacion numeroRadicacion={numero_radicacion} />
                    </NumeroRadicacionFechaNR>
                    <PickList 
                        name={'descripcion_tramite'}
                        onChange={handleChange}
                        value={descripcion_tramite || ''}
                        options={tipotramiteObj}
                        label={'Tipo de Trámite *'}
                        optionSelected={'Seleccione una Opcion'}
                    />
            <PickList 
                label='Modalidad *'
                name={'descripcion_modalidad'}
                onChange={handleChange}
                value={descripcion_modalidad}
                options={
                    descripcion_tramite === 'Urbanización' ? urbanizacionObj :
                    descripcion_tramite === 'Subdivisión' ? subdivisionObj :
                    descripcion_tramite === 'Otros' ? otrasActuacionesObj :
                    descripcion_tramite === 'Parcelación' ? parcelacionObj :
                    descripcion_tramite === 'Construcción' ? construccionObj :
                    []
                }
                
            />

            <PickList
                name={'usos'}
                onChange={handleChange}
                value={usos}
                options={usosObj}
                label={'Usos *'}
                optionSelected={'Seleccione una Opcion'}
            />
            <PrimaryInputNumberValidator 
                name={'area_residencial'}
                onChange={handleChange}
                value={area_residencial}
                textLabel='Área Residencial *'
                placeholder='Ingrese Área'
                className='liquidacionesexpensas__inputnum'
                classNameContainer='liquidacionesexpensas__inputnum--container'
                classNameLabel='liquidacionesexpensas__inputnum--label'
            />
            <PrimaryInputNumberValidator 
                name={'area_comercial'}
                onChange={handleChange}
                value={area_comercial}
                textLabel='Área Comercial *'
                placeholder='Ingrese Área'
                className='liquidacionesexpensas__inputnum'
                classNameContainer='liquidacionesexpensas__inputnum--container'
                classNameLabel='liquidacionesexpensas__inputnum--label'
            />
            <PrimaryInputNumberValidator 
                name={'area_industrial'}
                onChange={handleChange}
                value={area_industrial}
                textLabel='Área Industrial *'
                placeholder='Ingrese Área'
                className='liquidacionesexpensas__inputnum'
                classNameContainer='liquidacionesexpensas__inputnum--container'
                classNameLabel='liquidacionesexpensas__inputnum--label'
            />
            <PrimaryInputNumberValidator 
                name={'area_institucional'}
                onChange={handleChange}
                value={area_institucional}
                textLabel='Área Institucional *'
                placeholder='Ingrese Área'
                className='liquidacionesexpensas__inputnum'
                classNameContainer='liquidacionesexpensas__inputnum--container'
                classNameLabel='liquidacionesexpensas__inputnum--label'
            />
            <PickList 
                name={'estrato'}
                onChange={handleChange}
                value={estrato}
                options={estratos}
                label={'Estrato *'}
                optionSelected={'Seleccione una Opcion'}
            />
            <PickList
                name={'pago'}
                onChange={handleChangeGuardarLiquidacionPago}
                value={pago}
                options={optionsPago}
                label='Pago *'
                optionSelected={'Selecciona una opcion'}
            />

                </BoxContainerInputsByInfoBigScroll>
            
    
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall onClick={handleGuardarLiquidacion} text='Guardar' />
            </ContainerButtonsBackandNext>
                
            
                
            </ModalBasicNew>
            
        {
                abandonandoTramiteModal && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, no se guardara la liquidacion."
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

export default FormGuardarLiquidacion
