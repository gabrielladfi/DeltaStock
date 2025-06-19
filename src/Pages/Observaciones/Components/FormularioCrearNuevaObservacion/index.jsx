/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import '../../../../Sass/globalSass.scss'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ObservacionesState } from '../../Context/ObservacionesContext';
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import { useServicesPost } from '../../../../Hooks/useServicesPost';
import { urlPostNuevaObservacion } from '../../../../Utils/UrlData';
import PrimaryButton from '../../../../Components/PrimaryButton';
import './formulariocrearnuevaobservacion.scss'
import { useServicesGet } from '../../../../Hooks/useServicesGet';
import { urlHistorialDeCategorias } from '../../../../Utils/UrlData';
import DropdownSearch from '../../../../Components/DropdownSearch';
import { GlobalState } from '../../../../Context/GlobalContext';
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate';
import { useRef } from 'react';
import Modal from '@/Components/Modal';
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave';
import warning from '@/assets/warninglogo.svg';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import PickList from '@/Components/Molecules/PickList';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';

function FormularioCrearNuevaObservacion({ title, propArea, propAreaLabel, fncloseModal }) {

    console.log(propArea)

    const { setReload } = useContext(ObservacionesState);
    const { valorDropdown, setAbandonandoTramiteModal, abandonandoTramiteModal } = useContext(GlobalState);

    const numeroRadicacion = getNumeroRadicacion();

    const { fetchPostGlobal } = useServicesPost(); // Función para hacer el fetch extraída del hook useServicesPost
    const { fetchGetHook } = useServicesGet(); // Función para hacer el fetch tipo get, extraída del hook useServicesGet
    const [ historialDeCategorias, setHistorialDeCategorias ] = useState({}); // Estado para guardar el historial de categorias
    
    async function handleObtenerHistorialDeCategorias() {
        const respuesta = await fetchGetHook( urlHistorialDeCategorias, numeroRadicacion);
        try {
            setHistorialDeCategorias(respuesta);
        }catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleObtenerHistorialDeCategorias();
    }, [ numeroRadicacion ]);

    const [ inputVacio, setInputVacio ] = useState({
        fecha_creacion: false,
        estado: false,
        categoria: false,
    }); // Estado para manejar si el input está vacío o no
    // Estado para manejar las observaciones, en este array se guardan las observaciones que se van creando
    const [arrayObservaciones, setArrayObservaciones] = useState([]);

    const initialObservacion = {
        fecha_creacion: null,
        area: propArea,
        estado: null,
        id: "",
        observacion: "",
        categoria: valorDropdown,
        numero_radicacion: numeroRadicacion,
        username: "Monica Villalobos",
        ultima_modificacion: "2025-01-22T00:00:00Z",
        aprobado: false,
        impreso: false,
        modificado_por: "Monica Villalobos",
        modificado_desde: propArea
    };

    const [ newObservacion, setNewObservacion ] = useState({
        fecha_creacion: null,
        area: propArea,
        estado: null,
        id: "",
        observacion: "",
        categoria: valorDropdown,
        numero_radicacion: numeroRadicacion,
        username: "Monica Villalobos",
        ultima_modificacion: "2025-01-22T00:00:00Z",
        aprobado: false,
        impreso: false,
        modificado_por: "Monica Villalobos",
        modificado_desde: propArea
    });

    useEffect(() => {
        setNewObservacion({
            ...newObservacion,
            categoria: valorDropdown,
        })
    }, [valorDropdown, newObservacion.categoria]);

    useEffect(() => {
        setNewObservacion((prev) => ({
            ...prev,
            categoria: valorDropdown,
        }));
        
        setInputVacio((prev) => ({
            ...prev,
            categoria: false// Actualizar el estado de error basado en el valor de valorDropdown
        }));
    }, [valorDropdown]);

     // Función para agregar un nuevo objeto al array
     const handleAddObservacion = () => {
        if(newObservacion.fecha_creacion !== null && newObservacion.estado !== null && newObservacion.categoria !== '' ) {
            setArrayObservaciones([...arrayObservaciones, newObservacion]);
        } else {
            const { fecha_creacion, estado, categoria } = newObservacion;
            let hasError = false;

            if (!fecha_creacion) {
                setInputVacio((prev) => ({ ...prev, fecha_creacion: true }));
                hasError = true;
            }
            if (!estado) {
                setInputVacio((prev) => ({ ...prev, estado: true }));
                hasError = true;
            }
            if (!categoria) {
                setInputVacio((prev) => ({ ...prev, categoria: true }));
                hasError = true;
            }
    
            if (!hasError) {
                setArrayObservaciones([...arrayObservaciones, newObservacion]);
            }
        }

        setInputVacio((prev) => ({
            ...prev,
            categoria: valorDropdown === '' // Actualizar el estado de error basado en el valor de valorDropdown
        }));

    };

    useEffect(() => {
        setNewObservacion({
            ...newObservacion,
            id: Math.floor(Math.random() * 900) + 100
        })
    }, [arrayObservaciones]);

    // Función para manejar cambios en los `textarea`
    const handleInputChange = (id, value) => {
        setArrayObservaciones((prevObservaciones) =>
            prevObservaciones.map((observacion) =>
                observacion.id === id
                    ? { ...observacion, observacion: value }
                    : observacion
            )
        );
    };

    const handleGetDataInputsNuevaObservacionCheckBox = (event) => {
        const { checked } = event.target;
    
        setNewObservacion({
            ...newObservacion,
            aprobado: checked, // Actualiza dinámicamente el campo con el valor del checkbox
            impreso: checked, // Actualiza dinámicamente el campo con el valor del checkbox
        });
    };

    // Función para eliminar una observación del array
    const handleDeleteObservacion = (id) => {
        setArrayObservaciones((prevObservaciones) =>
            prevObservaciones.filter((observacion) => observacion.id !== id)
        );
    };

    // Función para manejar los cambios en los inputs
    function handleGetDataInputsNuevaObservacion({ target}) {
        const { name, value } = target;
        setNewObservacion({
            ...newObservacion,
            [name]: value
        })

        setInputVacio((prev) => ({
            ...prev,
            [name]: false, // Eliminar el error correspondiente
        }));

    }

    useEffect(() => {
        setArrayObservaciones((prevObservaciones) =>
            prevObservaciones.map((observacion) => ({
                ...observacion,
                estado: newObservacion.estado,
                categoria: newObservacion.categoria,
                fecha_creacion: newObservacion.fecha_creacion,
                aprobado: newObservacion.aprobado,
            }))
        );
    }, [newObservacion.aprobado, newObservacion.categoria, newObservacion.estado, newObservacion.fecha_creacion]);

    // Función para manejar la fecha de la nueva observación
    function handleNuevaObservacionFecha(event) {
        const { name, value } = event.target;
        setNewObservacion((prev) => ({
            ...prev,
            [name]: `${value}T00:00:00Z`, // Reemplazar el valor existente
        }));

        setInputVacio((prev) => ({
            ...prev,
            [name]: false, // Eliminar el error correspondiente
        }));
    }

    // Función para obtener la fecha formateada para poder mostrar en el input
    function getFormattedDate(value) {
        // Si el valor es una cadena concatenada por comas, toma la primera parte
        const firstDate = value.split(',')[0]; // Tomar la primera fecha
        return firstDate ? firstDate.split('T')[0] : ''; // Convertir a 'YYYY-MM-DD'
    }

    // Función para hacer el fetch tipo POST de la nueva observación y recargar la tabla de observaciones con el nuevo dato creado cambiando el estado de reload
    async function handleCrearNuevaObservacionFetch(propfncloseModal) {
        await fetchPostGlobal(urlPostNuevaObservacion, arrayObservaciones);
        setReload(state => !state);
        alert('Observaciones creadas con éxito');
        propfncloseModal();
    }

     // useEffect para limpiar los valores al desmontar el componente
     useEffect(() => {
        return () => {
            setNewObservacion(initialObservacion);
            setInputVacio({ fecha_creacion: false, estado: false, categoria: false });
        };
    }, []);

    console.log(arrayObservaciones)

    const tramiteIniciado = useRef(true);

    const handleCloseModal = () => {
        if(tramiteIniciado) {
            setAbandonandoTramiteModal(true);
        } else {
            fncloseModal();
        }
    }

    function handleAbandonarProcesoModal() {
        setAbandonandoTramiteModal(false)
        fncloseModal();
    }

    function handleCancelar() {
        setAbandonandoTramiteModal(false)
    }


    return (
        <>
        <ModalBasicNew title={title} propFunctionCloseModal={handleCloseModal}>

            {/*<section className='formulariocrearnuevaobservacion-container__numero-radicacion'>
                <p className='formulariocrearnuevaobservacion-container__numero-radicacion__p'>numero de radicacion:</p>
                <span className='formulariocrearnuevaobservacion-container__numero-radicacion__span'>{numeroRadicacion}</span>
            </section>*/}

            <section className='formulariocrearnuevaobservacion-container__inputs'>
                <div className='formulariocrearnuevaobservacion-container__inputs__div'>
                        <PrimaryInputDate 
                            label='Fecha *'
                            value={newObservacion.fecha_creacion ? getFormattedDate(newObservacion.fecha_creacion) : ''}
                            name={'fecha_creacion'}
                            onChangeFn={(e) => handleNuevaObservacionFecha(e)}
                            blockWriteInput={true}
                        />
                        {
                            inputVacio.fecha_creacion && <p className='error-input-text'>La fecha de creación es obligatoria</p>
                        }
                </div>

                <div className='formulariocrearnuevaobservacion-container__inputs__div'>
                    <DropdownSearch label='Categoria Observación *' dataObject={historialDeCategorias}/>
                    {
                        inputVacio.categoria && <p className='error-input-text'>La categoría es obligatoria</p>
                    }
                </div>

                <div className='formulariocrearnuevaobservacion-container__inputs__div'>
                    <PickList
                        optionSelected={'Estado de la observacion'}
                        optionSelectedvalue=''
                        options={[
                            {
                                option: 'Pendiente',
                                value: 'pendiente'
                            },
                            {
                                option: 'Resuelta',
                                value: 'resuelta'
                            },
                            {
                                option: 'No Resuelta',
                                value: 'no resuelta'
                            },
                            {
                                option: 'Completado',
                                value: 'completado'
                            },
                            {
                                option: 'Aprobó',
                                value: 'aprobó'
                            },
                        ]}
                        onChange={handleGetDataInputsNuevaObservacion}
                        value={newObservacion.estado || ''}
                        name='estado'
                        label='Estado de la observacion'
                        placeholder='Selecciona una categoria'
                    />
                    {/*<select 
                        onChange={handleGetDataInputsNuevaObservacion}
                        value={newObservacion.estado || ''}
                        className='formulariocrearnuevaobservacion-container__inputs__div__input' 
                        name='estado'
                    >
                        <option selected value="">Estado de la observacion</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="resuelta">Resuelta</option>
                        <option value="no resuelta">No Resuelta</option>
                        <option value="completado">Completado</option>
                        <option value="aprobó">Aprobó</option>
                    </select>*/}
                    {
                        inputVacio.estado && <p className='error-input-text'>El estado es obligatorio</p>
                    }
                </div>

                

                <div className='formulariocrearnuevaobservacion-container__checkbox'>
                    <label className='formulariocrearnuevaobservacion-container__checkbox__label' htmlFor="">Aprobado</label>
                    <div className='formulariocrearnuevaobservacion-container__checkbox__div'>
                        <input
                            onChange={(e) => handleGetDataInputsNuevaObservacionCheckBox(e)}
                            checked={newObservacion.aprobado}
                            className='formulariocrearnuevaobservacion-container__checkbox__div__input' 
                            type="checkbox"
                            name='aprobado'
                        />
                    </div>
                    
                </div>

                <div className='formulariocrearnuevaobservacion-container__text-div'>
                    <label className='formulariocrearnuevaobservacion-container__text-div__label' htmlFor="">Impreso</label>
                    <p className='formulariocrearnuevaobservacion-container__text-div__p'>{newObservacion.impreso === true ? 'El documento ha sido impreso' : 'No Impreso'}</p>
                </div>

                <div className='formulariocrearnuevaobservacion-container__text-div'>
                    <label className='formulariocrearnuevaobservacion-container__text-div__label' htmlFor="">Área:</label>
                    <p className='formulariocrearnuevaobservacion-container__text-div__p'>{propAreaLabel}</p>
                </div>
                <div className='formulariocrearnuevaobservacion-container__textarea-div'> 
                    {
                        arrayObservaciones.map((observacion) => (
                            <div key={observacion.id} className='agregarrequisito--form-div agregarObservacion--form-div-textarea'>
                                <div className='agregarObservacion--form-div-textarea__header'>
                                    <label className='input-base__label' htmlFor="">{`Observacion`}</label>
                                    <button onClick={() => handleDeleteObservacion(observacion.id)} className='agregarObservacion--form-div-textarea__header__button'> 
                                            Eliminar observacion
                                    </button>
                                </div>
                                
                                <textarea
                                    onChange={(e) => handleInputChange(observacion.id, e.target.value)}
                                    value={observacion.observacion || ''}
                                    className='agregarObservacion--form-div-textarea__textarea' 
                                    type="text"
                                    name='observacion'
                                />
                            </div>
                        ))
                    }

                </div>

                

                <div className='formulariocrearnuevaobservacion-container__buttons'>
                    <PrimaryButtonNewSmall text={'Agregar Observaciones'} onClick={handleAddObservacion} />
                    
                    {
                        arrayObservaciones.length > 0 && <PrimaryButtonNewSmall backgroundColor='#D7A100' text={'Guardar Observaciones'} onClick={() => handleCrearNuevaObservacionFetch(fncloseModal)} />
                    }
                </div>
            </section>
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
                            hoverColor='AlertLeave'
                        />
                    </Modal>
                )
            }
        </>
    )
}

export default FormularioCrearNuevaObservacion
