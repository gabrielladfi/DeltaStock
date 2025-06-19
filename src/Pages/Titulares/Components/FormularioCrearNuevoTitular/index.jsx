import { useContext, useRef, useState } from 'react';
import PrimaryButton from '../../../../Components/PrimaryButton';
import SectionCloserFormsModal from '../../../../Components/SectionCloserFormsModal'
import SectionShowNumeroRadicacion from '../../../../Components/SectionShowNumeroRadicacion';
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import { useCerraModalNuevoTitular } from '../../Hooks/useCerraModalNuevoTitular';
import './formulariocrearnuevotitular.scss'
import { useFetchPostNuevoTitular } from '../../Hooks/useFetchPostNuevoTitular';
import { GlobalState } from '@/Context/GlobalContext';
import Modal from '@/Components/Modal';
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import { Input } from '@/Components/Atoms/Input/Input';
import PickList from '@/Components/Molecules/PickList';


function FormularioCrearNuevoTitular() {

    const { cerrarModalNuevoTitular } = useCerraModalNuevoTitular();
    const numeroRadicacion = getNumeroRadicacion();
    const { fetchPostNuevoTitular } = useFetchPostNuevoTitular();
    const { setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const dataInicial =  {
        numero_radicacion: numeroRadicacion,
        nombre: "",
        email: "",
        phone: "",
        dni: ""
    };

    const [ dataNuevoTitular, setDataNuevoTitular ] = useState(dataInicial);

    function handleChange({ target }) {
        const { name, value } = target;
        setDataNuevoTitular({
            ...dataNuevoTitular,
            [name]: value
        });
    }

    console.log(dataNuevoTitular);

    function handleCrearNuevoTitular() {
        fetchPostNuevoTitular(dataNuevoTitular);
    }

    const tramiteIniciado = useRef(true);
    
    const handleCloseModal = () => {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            cerrarModalNuevoTitular();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        cerrarModalNuevoTitular();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)
    }



    return (
        <>
        <ModalBasicNew title='Agregar Titulares' propFunctionCloseModal={handleCloseModal}>
            <BoxContainerInputsByInfoBigScroll>

                <Input
                    textlabel='Nombre Completo *'
                    placeholder='Nombre Completo'
                    name='nombre'
                    onChange={handleChange}
                    value={dataNuevoTitular.nombre || ""}
                    required={true}
                />

                <Input
                    textlabel='Email *'
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                    value={dataNuevoTitular.email || ""}
                    required={true}
                />

                <Input
                    textlabel='Teléfono / Celular *'
                    placeholder='Teléfono / Celular'
                    name='phone'
                    onChange={handleChange}
                    value={dataNuevoTitular.phone || ""}
                    required={true}
                />

                <Input
                    textlabel='C.C. o NIT *'
                    placeholder='C.C. o NIT'
                    name='dni'
                    onChange={handleChange}
                    value={dataNuevoTitular.dni || ""}
                    required={true}
                />
                <PickList
                    optionSelected='Seleccione Tipo de Titular'
                    label='Tipo de Titular *'
                    placeholder='Tipo de Titular'
                    name='tipo_titular'
                    onChange={handleChange}
                    value={dataNuevoTitular.tipo_titular || ""}
                    options={[{
                        option: 'Personal',
                        value: 'personal'
                    }, {
                        option: 'Jurídico',
                        value: 'juridico'
                    }, {
                        option: 'Apoderado',
                        value: 'apoderado'
                    }]}
                    required={true}
                />
            </BoxContainerInputsByInfoBigScroll>
            

            {/*<section className='formulariocrearnuevotitular__section'>
                    
                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Nombre Completo *</label>
                                <input
                                    onChange={handleChange}
                                    value={dataNuevoTitular.nombre || ""}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='nombre'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Email *</label>
                                <input
                                    onChange={handleChange}
                                    value={dataNuevoTitular.email || ""}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='email'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Teléfono / Celular *</label>
                                <input
                                    onChange={handleChange}
                                    value={dataNuevoTitular.phone || ""}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='phone'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">C.C. o NIT *</label>
                                <input
                                    onChange={handleChange}
                                    value={dataNuevoTitular.dni || ""}
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='dni'
                                />
                            </div>

                            

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Tipo de Titular *</label>
                                <select 

                                    className='input-base__select agregarrequisito--input' 
                                    name='estado'
                                >
                                    <option selected value="">Seleccione Tipo de Titular</option>
                                    <option value="pendiente">Personal</option>
                                    <option value="resuelta">Jurídico</option>
                                    <option value="resuelta">Apoderado</option>
                                </select>
                            </div>
                       
            </section>*/}
            <ContainerButtonsBackandNext>
                <PrimaryButtonNewSmall text='Guardar Titular' onClick={handleCrearNuevoTitular} />
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

export default FormularioCrearNuevoTitular
