import { useContext, useRef, useState } from 'react';
import PrimaryButton from '../../../../Components/PrimaryButton';
import SectionCloserFormsModal from '../../../../Components/SectionCloserFormsModal'
import SectionShowNumeroRadicacion from '../../../../Components/SectionShowNumeroRadicacion';
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';


import './formulariocrearnuevoresponsable.scss'
import { useFetchPostNuevoResponsables, } from '../../Hooks/useFetchPostNuevoResponsables';
import { useCerraModalNuevoResponsables } from '../../Hooks/useCerraModalNuevoResponsables';
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import { GlobalState } from '@/Context/GlobalContext';
import Modal from '@/Components/Modal';
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import { Input } from '@/Components/Atoms/Input/Input';
import PickList from '@/Components/Molecules/PickList';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';


function FormularioCrearNuevoResponsable() {

    const { cerrarModalNuevoResponsable } = useCerraModalNuevoResponsables();
    const numeroRadicacion = getNumeroRadicacion();
    const { fetchPostNuevoResponsable } = useFetchPostNuevoResponsables();
    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const dataInicial =  {
        numero_radicacion: numeroRadicacion,
        email: '',
        nombre: '',
        phone: '',
        dni: '',
        matricula: '',
        fecha: '',
        fecha_expdicion_matricula: '',
        tipo_responsable: '',

    };
    
    const [ dataNuevoResponsable, setDataNuevoResponsable ] = useState(dataInicial);
    const [ errorInputData, setErrorInputData ] = useState({
        phone: 'false',
        dni: 'false',
        matricula: 'false',
    });
    

    // Validar entrada solo numérica
    function handleNumericChange({ target }) {
        const { name, value } = target;
        // Permitir solo números
        if (/^[0-9]*$/.test(value)) {
            setDataNuevoResponsable({
                ...dataNuevoResponsable,
                [name]: value
            });
            setErrorInputData({
                ...errorInputData,
                [name]: false,
            });
        }else {
            setErrorInputData({
                ...errorInputData,
                [name]: true,
            });
        }
    }

    function handleChange({ target }) {
        const { name, value } = target;
        setDataNuevoResponsable({
            ...dataNuevoResponsable,
            [name]: value
        });
    }

    console.log(dataNuevoResponsable);

    function handleCrearNuevoResponsable() {
        fetchPostNuevoResponsable(dataNuevoResponsable);
    }

    // Función para manejar la fecha del nuevo responsable
    function handleNuevaObservacionFecha(event) {
        const { name, value } = event.target;
        setDataNuevoResponsable((prev) => ({
            ...prev,
            [name]: prev[name] // Verificar si ya hay un valor previo
                ? `${prev[name]},${value}T00:00:00+00:00` // Si existe, concatenar con coma
                : `${value}T00:00:00+00:00`, // Si no existe, asignar el nuevo valor
        }));
    }


    // Función para obtener la fecha formateada para poder mostrar en el input
    function getFormattedDate(value) {
        // Si el valor es una cadena concatenada por comas, toma la primera parte
        const firstDate = value.split(',')[0]; // Tomar la primera fecha
        return firstDate ? firstDate.split('T')[0] : ''; // Convertir a 'YYYY-MM-DD'
    }

    const tramiteIniciado = useRef(true);

    const handleCloseModal = () => {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            cerrarModalNuevoResponsable();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        cerrarModalNuevoResponsable();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)
    }
    
    return (
        <>
            <ModalBasicNew title='Agregar Responsables' propFunctionCloseModal={handleCloseModal}>
                <BoxContainerInputsByInfoBigScroll>
                    <PrimaryInputDate 
                        label='Fecha *'
                        className={'input-base__input agregarrequisito--input'}
                        value={dataNuevoResponsable.fecha ? getFormattedDate(dataNuevoResponsable.fecha) : ''}
                        name={'fecha'}
                        onChangeFn={(e) => handleNuevaObservacionFecha(e)}
                        blockWriteInput={true}
                    />

                    <Input
                        textlabel='Nombre Completo *'
                        value={dataNuevoResponsable.nombre || ""}
                        name={'nombre'}
                        onChange={handleChange}
                        placeholder='Ingrese Nombre Completo'
                    />

                    <Input
                        textlabel='C.C. o NIT *'
                        value={dataNuevoResponsable.dni || ""}
                        name={'dni'}
                        onChange={handleNumericChange}
                        placeholder='Ingrese C.C. o NIT'
                    />

                    <Input
                        textlabel='Email *'
                        value={dataNuevoResponsable.email || ""}
                        name={'email'}
                        onChange={handleChange}
                        placeholder='Ingrese Email'
                    />
                    <Input
                        textlabel='Teléfono / Celular *'
                        value={dataNuevoResponsable.phone || ""}
                        name={'phone'}
                        onChange={handleNumericChange}
                        placeholder='Ingrese Teléfono / Celular'
                        maxLength={19}
                    />

                    <PickList 
                        label='Tipo de Responsable *'
                        options={[
                            {
                                option: 'Urbanizador',
                                value: 'urbanizador'
                            },
                            {
                                option: 'Parcelador',
                                value: 'parcelador'
                            },
                            {
                                option: 'Director de la Construcción',
                                value: 'director de la construccion'
                            },
                            {
                                option: 'Arquitecto Proyectista',
                                value: 'arquitecto proyectista'
                            },
                            {
                                option: 'Ingeniero Civil',
                                value: 'ingeniero civil'
                            },
                            {
                                option: 'Diseñador Estructural',
                                value: 'diseñador estructural'
                            },
                            {
                                option: 'Diseñador de elementos no estructurales',
                                value: 'diseñador de elementos no estructurales'
                            },
                            {
                                option: 'Geotecnista',
                                value: 'geotecnista'
                            },
                            {
                                option: 'Ingeniero de segunda revisión',
                                value: 'ingeniero de segunda revisión'
                            },
                            {
                                option: 'Topógrafo',
                                value: 'topografo'
                            },
                        ]}
                        value={dataNuevoResponsable.tipo_responsable || ""}
                        onChange={handleChange}
                        placeholder='Seleccione Tipo Responsable'
                        optionSelected={'Seleccione Tipo Responsable'}
                        name='tipo_responsable'
                    />

                    <Input
                        textlabel='No. Matricula Profesional *'
                        value={dataNuevoResponsable.matricula || ""}
                        name={'matricula'}
                        onChange={handleNumericChange}
                        placeholder='Ingrese No. Matricula Profesional'
                    />

                    <PrimaryInputDate 
                        label='Fecha Exp Matrícula *'
                        className={'input-base__input agregarrequisito--input'}
                        value={dataNuevoResponsable.fecha_expdicion_matricula ? getFormattedDate(dataNuevoResponsable.fecha_expdicion_matricula) : ''}
                        name={'fecha_expdicion_matricula'}
                        onChangeFn={(e) => handleNuevaObservacionFecha(e)}
                        blockWriteInput={true}
                    />


                </BoxContainerInputsByInfoBigScroll>
            
           
    
                       
           
                <ContainerButtonsBackandNext>
                    <PrimaryButtonNewSmall text='Guardar Responsable' onClick={handleCrearNuevoResponsable} />
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

export default FormularioCrearNuevoResponsable
