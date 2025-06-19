import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { NuevaRadicacionProvider } from './Context/NuevaRadicacionContext'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import { useServicesGet } from '../../Hooks/useServicesGet'
import { useServicesPost } from '../../Hooks/useServicesPost'
import { 
    valorInicualTareasPendientesObjeto,
    valorUrbanizacionobjeto,
    valorSubdivisionobjeto,
    valorReconocimientoobjeto,
    valorConstruccionobjeto,
    valorParcelacionobjeto,
    valorInicualTareasPendientes,
    urbanizacionTasks,
    subdivisionTasks,
    reconocimientoTasks,
    construccionTasks,
    parcelacionTasks,
    valorInicialMatriculaProfesionales,
    valorInicialCertificadoExperienciaProfesionales,
    tipoPersonaOptions,
} from '../../Utils/dataInputsNuevaRadicacion';
import ListadoMatriculaProfesionales from './Components/ListadoMatriculaProfesionales'
import PrimaryInputDate from '@/Components/Atoms/PrimaryInputDate'
import PrimaryInputTextValidator from '@/Components/Atoms/PrimaryInputTextValidator'
import PrimaryInputNumberValidator from '@/Components/Atoms/PrimaryInputNumberValidator'
import PrimaryInputEmailValidator from '@/Components/Atoms/PrimaryInputEmailValidator'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import PrimaryButton from '@/Components/PrimaryButton'
import '../../Sass/globalSass.scss'
import './nuevaradicacion.scss'
import Modal from '@/Components/Modal'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import warningLogo from '@/assets/warninglogo.svg'
import successLogo from '@/assets/checkLogo.svg'
import { getNumeroRadicacion } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { driver } from 'driver.js'
import "driver.js/dist/driver.css";
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import useLeaveTask from '@/Hooks/useLeaveTask'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import InputDateNR from '@/Components/Atoms/InputDateNR'
import ProgressiveStep from '@/Components/Molecules/ProgressiveStep'
import StepContentNR from '@/Components/Atoms/StepContentNR'
import PrimaryButtonNew from '@/Components/Atoms/PrimaryButtonNew'
import SecondaryButtonNew from '@/Components/Atoms/SecondaryButtonNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import PickList from '@/Components/Molecules/PickList'
import BoxContainerInputsByInfoBig from '@/Components/Atoms/BoxContainerInputsByInfoBig'
import TextAreaComponent from '@/Components/Molecules/TextAreaComponent'
import SubTitleSectionInfo from '@/Components/Atoms/SubTitleSectionInfo'
import InputCheckBoxNew from '@/Components/Atoms/InputCheckBoxNew'
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk'



function NuevaRadicacion() {
    return (
        <>
            <NuevaRadicacionProvider>
                <NuevaRadicacionContent />
            </NuevaRadicacionProvider>
        </>
    )
}

// El spread operator (...) en JavaScript (y TypeScript) 
// es una sintaxis muy útil para copiar, clonar o combinar estructuras de datos como arrays, objetos o incluso props en React.

    // Ejemplo de uso del spread operator
    // const array1 = [1, 2, 3];
    // const array2 = [4, 5, 6];
    // const arrayCombinado = [...array1, ...array2];
    // console.log(arrayCombinado); // [1, 2, 3, 4, 5, 6]}

// AGREGAR NUEVAS OPCIONES:
// Para agregar nuevas opciones en Tipo de tramite, Modalidad de tramite, requisitos del tramite, matricula y certificados profesionales 
// Las nuevas opciones se agregan en el archivo dataInputsNuevaRadicacion.js ubicado en la carpeta Utils, buscas el array que te interesa y agregas la nueva opcion en el array.


function NuevaRadicacionContent() {

    const driverObj = driver({
        showProgress: true,
        steps: [
            { element: '.drive-nuevaradicacion', popover: { title: 'Nueva Radicación', description: 'Esta es la página para crear una nueva radicación.' } },
            { element: '.numero-radicacion-driver', popover: { title: 'Número de radicación', description: 'Este es el número de radicación que se generará para la nueva radicación.' } },
            { element: '.fecha-driver', popover: { title: 'Fecha', description: 'Esta es la fecha de la nueva radicación.' } },
            { element: '.driver-nuevaradicacion-datos-genarales', popover: { title: 'Datos Generales', description: 'Esta es la sección para ingresar los datos generales de la nueva radicación, solo se debe selecionar el tipo de persona el departamento y estado se cargan automaticamente.' } },
        ],
        showButtons: ['next', 'previous', 'close'],
      });

    function runDriver() {
        driverObj.drive();
    }


    const { navigateToNuevaSolicitud, navigateToMenu } = useNavigateProvider() // Hook para navegar entre páginas
    const { fetchNumeroRadicacion, numeroRadicacion } = useServicesGet() // Hook para obtener datos de la API
    const { fetchPostNuevaRadicacion } = useServicesPost() // Hook para enviar datos a la API
    const [selectedItems, setSelectedItems] = useState(''); // Estado para almacenar los items seleccionados
    const [ radicacionEstaIncompleta, setRadicacionEstaIncompleta ] = useState(false)
    const [ radicacionCompletada, setRadicacionCompletada ] = useState(false)

    // Hook para obtener el estado global
    const { setNuevaRadicacion, nuevaRadicacion, isOpenVideo, setIsOpenVideo, setProgressiveStepStatus } = useContext(GlobalState);

    console.log(nuevaRadicacion)

    localStorage.setItem('numeroRadicacionLocalStorage', numeroRadicacion.numero_radicacion)

    const [ intentarCrearRadicacion, setIntentarCrearRadicacion ] = useState(false)
    const [ errorInputVacio, setErrorInputVacio ] = useState({
        fecha: false,
        descripcion_modalidad: false,
        descripcion_tramite: false,
        nombre_solicitante: false,
        dni_solicitante: false,
        email_solicitante: false,
        phone_solicitante: false,
        usos: false,
        tipo_persona: false,
    })
      
    // Función para manejar el cambio de los checkboxes
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
    
        setSelectedItems((prevItems) => {
            const itemsArray = prevItems ? prevItems.split(',') : [];
    
            if (itemsArray.includes(value)) {
                // Si el valor ya existe, lo eliminamos
                return itemsArray.filter((item) => item !== value).join(',');
            } else {
                // Si no existe, lo agregamos
                return [...itemsArray, value].join(',');
            }
        });

        setIntentarCrearRadicacion(false)

        setErrorInputVacio({
            ...errorInputVacio,
            descripcion_tramite: true,
        })
    };

    // Estado para almacenar los items seleccionados
    const [selectedModalidad, setSelectedModalidad] = useState('');

    // Función para manejar el cambio de los checkboxes
    const handleCheckboxChangeModalidad = (event) => {
        const value = event.target.value;
    
        setSelectedModalidad((prevItems) => {
            const itemsArray = prevItems ? prevItems.split(',') : [];
    
            if (itemsArray.includes(value)) {
                // Si el valor ya existe, lo eliminamos
                return itemsArray.filter((item) => item !== value).join(',');
            } else {
                // Si no existe, lo agregamos
                return [...itemsArray, value].join(',');
            }
        });

        setErrorInputVacio({
            ...errorInputVacio,
            descripcion_modalidad: true,
        })
    };

    // Estado para almacenar los items seleccionados
    useEffect(() => {
        fetchNumeroRadicacion()
    }, []);

    // Estado para almacenar los items seleccionados en este caso el numero de radicacion
    useEffect(() => {
        if(numeroRadicacion) {
            setNuevaRadicacion((prev) => ({
                ...prev,
                departamento: 'Magdalena',
                municipio: 'Santa Marta',
            }));
        }
    }, [numeroRadicacion]);

    const userData = localStorage.getItem('userData')
    const userDataParse = JSON.parse(userData)
    console.log(userDataParse)

    useEffect(() => {
        if(numeroRadicacion) {
            setNuevaRadicacion((prev) => ({
                ...prev,
                numero_radicacion: numeroRadicacion.numero_radicacion,
                organization: userDataParse.organization,
            }));
        }
    }, [numeroRadicacion]);

    
    // Función para manejar el cambio de los inputs
    function handleNuevaRadicacion(event) {
        const { name, value } = event.target;
        setNuevaRadicacion((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrorInputVacio({
            ...errorInputVacio,
            [name]: true,
        })
    }

    // Función para manejar el cambio de los inputs de fecha
    function handleNuevaRadicacionFecha(event) {
        const { name, value } = event.target;
        setNuevaRadicacion((prev) => ({
            ...prev,
            [name]: `${value}T00:00:00Z`, // Reemplazar el valor existente
        }));
        setErrorInputVacio({
            ...errorInputVacio,
            fecha: true,
        })
    }

    // Función para obtener la fecha formateada para poder mostrar en el input
    function getFormattedDate(value) {
        // Si el valor es una cadena concatenada por comas, toma la primera parte
        const firstDate = value.split(',')[0]; // Tomar la primera fecha
        return firstDate ? firstDate.split('T')[0] : ''; // Convertir a 'YYYY-MM-DD'
    }

    //useEffect para agregar elemntos a la descripcion del tramite
    useEffect(() => {
        setNuevaRadicacion((prev) => ({
            ...prev,
            descripcion_tramite: selectedItems,
        }));
    }, [selectedItems])

    //useEffect para agregar elemntos a la descripcion de la modalidad
    useEffect(() => {
        setNuevaRadicacion((prev) => ({
            ...prev,
            descripcion_modalidad: selectedModalidad,
        }));
    }
    , [selectedModalidad]);

    const [ tareasPendientes, setTareasPendientes ] = useState(valorInicualTareasPendientes); // Estado para almacenar las tareas pendientes
    const [ tareasCompletadas, setTareasCompletadas ] = useState([]); // Estado para almacenar las tareas completadas
    const [ tareasCompletadasNum, setTareasCompletadasNum ] = useState([]); // Estado para almacenar las tareas completadas
    const [ listadoNoAplica, setListadoNoAplica ] = useState([]); // Estado para almacenar las que no aplican 

    //useEffect para agregar elemntos a la descripcion de los requisitos
    useEffect(() => {
        setNuevaRadicacion((prev) => ({
            ...prev,
            requisitos_pendientes: tareasPendientes,
        }));
    }, [selectedItems, tareasPendientes])

    //useEffect para agregar elementos de urbanizacion a la descripcion de los requisitos
    useEffect(() => {
        setTareasPendientes((prev) => {
            // Si 'urbanizacion' está seleccionado, aseguramos que las tareas estén en el estado
            if (selectedItems.includes('urbanizacion')) {
                return [...new Set([...prev, ...urbanizacionTasks])]; // Agregamos tareas sin duplicados
            } else {
                // Si 'urbanizacion' no está seleccionado, eliminamos las tareas relacionadas
                return prev.filter((task) => !urbanizacionTasks.includes(task));
            }
        });
    }, [selectedItems]);

    //useEffect para agregar elementos de subdivision a la descripcion de los requisitos
    useEffect(() => {
        setTareasPendientes((prev) => {
            // Si 'subdivision' está seleccionado, aseguramos que las tareas estén en el estado
            if (selectedItems.includes('subdivision')) {
                return [...new Set([...prev, ...subdivisionTasks])]; // Agregamos tareas sin duplicados
            } else {
                // Si 'subdivision' no está seleccionado, eliminamos las tareas relacionadas
                return prev.filter((task) => !subdivisionTasks.includes(task));
            }
        });
    }, [selectedItems]);

    //useEffect para agregar elementos de reconocimiento a la descripcion de los requisitos
    useEffect(() => {
        // Se usa prev para asegurar que estamos trabajando con el estado más actualizado de tareasPendientes
        // y evitar problemas de sincronización al modificar el estado basado en su valor anterior
        setTareasPendientes((prev) => {
            // Si 'reconocimiento' está seleccionado, aseguramos que las tareas estén en el estado
            if (selectedItems.includes('reconocimiento')) {
                return [...new Set([...prev, ...reconocimientoTasks])]; // Agregamos tareas sin duplicados
            } else {
                // Si 'reconocimiento' no está seleccionado, eliminamos las tareas relacionadas
                return prev.filter((task) => !reconocimientoTasks.includes(task));
            }
        });
    }, [selectedItems]);

    //useEffect para agregar elementos de construccion a la descripcion de los requisitos
    useEffect(() => {
        setTareasPendientes((prev) => {
            // Si 'construccion' está seleccionado, aseguramos que las tareas estén en el estado
            if (selectedItems.includes('construccion')) {
                return [...new Set([...prev, ...construccionTasks])]; // Agregamos tareas sin duplicados
            } else {
                // Si 'construccion' no está seleccionado, eliminamos las tareas relacionadas
                return prev.filter((task) => !construccionTasks.includes(task));
            }
        });
    }, [selectedItems]);

    //useEffect para agregar elementos de parcelacion a la descripcion de los requisitos
    useEffect(() => {
        setTareasPendientes((prev) => {   
            // Si 'parcelacion' está seleccionado, aseguramos que las tareas estén en el estado
            if (selectedItems.includes('parcelacion')) {
                return [...new Set([...prev, ...parcelacionTasks])]; // Agregamos tareas sin duplicados
            } else {
                // Si 'parcelacion' no está seleccionado, eliminamos las tareas relacionadas
                return prev.filter((task) => !parcelacionTasks.includes(task));
            }
        });
    }, [selectedItems]);

    //useEffect para agregar elementos de urbanizacion a la descripcion de los requisitos
    useEffect(() => {
        setNuevaRadicacion((prev) => ({
            ...prev,
            requisitos_completados: tareasCompletadas,
            lista_requisitos: tareasCompletadasNum,
        }));
    }
    , [tareasCompletadas]);

    // Función para manejar el cambio de los checkboxes de los requisitos del tramite filtrando si estan o no completados
    const handleCheckboxChangeRequisitos = (event) => {
        const { value, checked } = event.target;
        
        const parseObject = JSON.parse(value)

        console.log(parseObject)
        setTareasCompletadas((prevItems) => {
            if (checked) {
                // Agregar la tarea a tareas completadas
                return [...prevItems, parseObject.titulo];
            } else {
                // Eliminar la tarea de tareas completadas
                return prevItems.filter((item) => item !== parseObject.titulo);
            }
        });
    
        setTareasCompletadasNum((prevItems) => {
            if (checked) {
                // Agregar la tarea a tareas completadas
                return [...prevItems, parseObject.num];
            } else {
                // Eliminar la tarea de tareas completadas
                return prevItems.filter((item) => item !== parseObject.num);
            }
        });

        // Actualizar tareas pendientes
        setTareasPendientes((prevTareasPendientes) => {
            if (!checked) {
                // Agregar la tarea de vuelta a pendientes si se deselecciona
                return [...prevTareasPendientes, parseObject.titulo];
            } else {
                // Si se selecciona, eliminarla de pendientes
                return prevTareasPendientes.filter((tarea) => tarea !== parseObject.titulo);
            }
        });
    
    };

    const handleCheckboxChangeRequisitosButton = (item) => {
        const parseObject = item;

        console.log(parseObject)
        
        // Check if task is already completed
        const isCompleted = tareasCompletadas.includes(parseObject.titulo);
        
        setTareasCompletadas((prevItems) => {
            if (!isCompleted) {
                // Add task if not completed
                return [...prevItems, parseObject.titulo];
            } else {
                // Remove task if already completed
                return prevItems.filter((item) => item !== parseObject.titulo);
            }
        });
    
        setTareasCompletadasNum((prevItems) => {
            if (!isCompleted) {
                // Add task number if not completed
                return [...prevItems, parseObject.num];
            } else {
                // Remove task number if already completed
                return prevItems.filter((item) => item !== parseObject.num);
            }
        });

        // Update pending tasks
        setTareasPendientes((prevTareasPendientes) => {
            if (isCompleted) {
                // Add back to pending if removing from completed
                return [...prevTareasPendientes, parseObject.titulo];
            } else {
                // Remove from pending if adding to completed
                return prevTareasPendientes.filter((tarea) => tarea !== parseObject.titulo);
            }
        });
    
    };

   
    

    function handleAgregarNoAplica(item) {
        console.log(item);
    
        setListadoNoAplica((prev) => {
            if (prev.includes(item.num)) {
                // Si el valor ya existe, lo eliminamos
                return prev.filter((num) => num !== item.num);
            } else {
                // Si no existe, lo agregamos
                return [...prev, item.num];
            }
        });
    }
    
    useEffect(() => {
        setNuevaRadicacion((prev) => ({
            ...prev,
            no_aplica: listadoNoAplica,
        }));
    }, [listadoNoAplica])

    // Función para manejar el envio de la nueva radicacion a la API y navegar a la pagina de nueva solicitud 
    async function handleSubmit(event) {
        event.preventDefault();
        
        setIntentarCrearRadicacion(true)
        const valores = Object.values(errorInputVacio);
        console.log(valores)

        if(!valores.includes(false)) {
            await fetchPostNuevaRadicacion()
            setRadicacionCompletada(true)
            //navigateToNuevaSolicitud()
        }else {
            setRadicacionEstaIncompleta(true)
        }
    };

    function handleNavigateTocreatePredio() {
        setRadicacionCompletada(false)
        navigateToNuevaSolicitud()
    }

    const valorInicialNuevaRadicacion = { 
        "numero_radicacion": "47001-2-24-0014", 
        "departamento": "", 
        "municipio": "", 
        "fecha": "", 
        "objeto_tramite": null, 
        "nombre_solicitante": "", 
        "email_solicitante": "", 
        "dni_solicitante": "", 
        "phone_solicitante": "", 
        "usos": null, 
        "area": null, 
        "tipo_vivienda": null, 
        "is_cultural": false, 
        "requisitos_completados": [],
        "requisitos_pendientes": [],
        "descripcion_tramite": "", 
        "descripcion_modalidad": "",
        "lista_requisitos": []
    };

    function handleAlertNotification() {
        setRadicacionEstaIncompleta(false)
    }

    const numeroDeRadicacion  = getNumeroRadicacion()

    //useEffect para limpiar el formulario en cuanto se desmonta el componente
    useEffect(() => {
        return () => {
            setNuevaRadicacion(valorInicialNuevaRadicacion)
        }
    }, [])


    

    const handleClickOpenVideo = () => { 
        setIsOpenVideo(true)
    }


   {/* // Este useEffect se ejecuta cuando se monta el componente y establece que el proceso está iniciando
    useEffect(() => {
        setIniciandoProceso(true)
    }, [])

    // Esta función maneja la navegación al menú principal
    // Si el proceso está iniciando, muestra una alerta de confirmación antes de abandonar
    // Si no está iniciando, navega directamente al menú
    const handlefnmenu = () => {
        if(iniciandoProceso) {
            setAbandonandoProceso(true)
        }else {
            navigateToMenu()
        }
    }
*/}
    const { handlefnmenu } = useLeaveTask()



    const [ step, setStep ] = useState(1);
    const [ stepMini, setStepMini ] = useState(1);

    function handleBackStepOne() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step2: false,
        }));
        setStep(1);
    }

    function handleBackStepTwo() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step3: false,
        }));
        setStep(2);
    }

    function handleBackStepThree() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step4: false,
        }));
        setStep(3);
    }

    function handleBackStepFour() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step5: false,
        }));
        setStepMini(1);
    }

    function handleBackStepFive() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step6: false,
            step7: false,
            step8: false,
            step9: false,
            step10: false,
            step11: false,
            step12: false,
        }));
        setStepMini(2);
    }




    function handleNextStepone() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step2: true,
        }));
        setStep(2);
    }

    function handleNextStepTwo() {
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step3: true,
        }));
        setStep(3);
    }

    function handleNextStepThree() {        
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step4: true,
            step5: false,
            step6: false,
            step7: false,
            step8: false,
        }));
        setStep(4);
    }

    function handleNextStepFive() {        
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step5: true,
        }));
        setStepMini(2);
    }

    function handleNextStepSix() {        
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step6: true,
        }));
        setStepMini(3);
    }

    function handleNextStepSeven() {        
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step7: true,
        }));
        setStepMini(4);
    }

    function handleBackStepSix() {        
        setProgressiveStepStatus((prev) => ({
            ...prev,
            step7: false,
            step6: true,
        }));
        setStepMini(3);
    }

   
    useEffect(() => {
        return () => {
            setProgressiveStepStatus((prev) => ({
                ...prev,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
                step7: false,
                step8: false
            }));
        }
    }, [])
    
    
   

    return (
        <PrincipalPage drivePage='drive-nuevaradicacion' onClick={handleClickOpenVideo} runDriver={runDriver} handlefnmenu={handlefnmenu} pathActive='Radicación'>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion.numero_radicacion} />
                <InputDateNR 
                    label='Fecha *'
                    name='fecha'
                    value={getFormattedDate(nuevaRadicacion.fecha)}
                    onChange={handleNuevaRadicacionFecha}
                    blockWriteInput={true}
                />
            </NumeroRadicacionFechaNR>
            <ProgressiveStep />

            {step === 1 && 
                <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfo> 
                            <TitleSectionInfo text='Información General' />
                            <PickList 
                                label='Tipo de persona *'
                                options={tipoPersonaOptions}
                                value={nuevaRadicacion.tipo_persona || ''}
                                onChange={handleNuevaRadicacion}
                                name='tipo_persona'
                                optionSelected='Seleccione el Tipo de Persona'
                            />
                            <PickList 
                                label='Departamento *'
                                value={nuevaRadicacion.departamento || ''}
                                onChange={handleNuevaRadicacion}
                                name='departamento'
                                optionSelected='Selecciona el Departamento'
                            />
                            <PickList 
                                label='Municipio *'
                                value={nuevaRadicacion.municipio || ''}
                                onChange={handleNuevaRadicacion}
                                name='municipio'
                                optionSelected='Selecciona el Municipio'
                            />
                        </BoxContainerInputsByInfo>
                        <BoxContainerInputsByInfo> 
                            <TitleSectionInfo text='Datos del solicitante' />
                                <PrimaryInputTextValidator 
                                    value={nuevaRadicacion.nombre_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'nombre_solicitante'}
                                    maxLength={250}
                                    textLabel={'Nombre Completo *'}
                                    placeholder={'Nombre Completo'}
                                />
                                <PrimaryInputNumberValidator 
                                    value={nuevaRadicacion.dni_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'dni_solicitante'}
                                    maxLength={120}
                                    textLabel={nuevaRadicacion.tipo_persona === 'natural' ? 'Cedula de Ciudadania *' : nuevaRadicacion.tipo_persona === 'juridica' ? 'NIT *' : 'Identificacion *'}
                                    placeholder={nuevaRadicacion.tipo_persona === 'natural' ? 'Ejemlo: 1018054972' : nuevaRadicacion.tipo_persona === 'juridica' ? 'Ejemlo: 76506932-3' : 'Identificacion *'}
                                />
                                <PrimaryInputEmailValidator 
                                    value={nuevaRadicacion.email_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'email_solicitante'}
                                    textLabel={'Correo *'}
                                    placeholder={'Correo'}
                                />
                                <PrimaryInputNumberValidator 
                                    value={nuevaRadicacion.phone_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'phone_solicitante'}
                                    maxLength={15}
                                    textLabel={'Telefono *'}
                                    placeholder={'Telefono'}
                                    classNameLabel={'input-base__label'}
                                    className={'input-base__input'}
                                    classNameContainer='primary-container'
                                    classNameError='primary-validator-error-span'
                                />
                        </BoxContainerInputsByInfo>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepone} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
            }

            {step === 2 && 
                <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfoBig>
                            <TitleSectionInfo text='Tipos de Usos' />
                            <TextAreaComponent 
                                value={nuevaRadicacion.usos || ''}
                                onChange={handleNuevaRadicacion}
                                name='usos'
                                placeholder='Usos'
                                textLabel='Usos *'
                                maxLength={500}
                            />
                        </BoxContainerInputsByInfoBig>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepOne} />
                        <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepTwo} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
            }

            {step === 3 && 
                <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='Tipo de trámite' />
                            <SubTitleSectionInfo text='Seleccione una Opción *' />
                            <InputCheckBoxNew 
                                checked={selectedItems.includes("Licencia de Urbanización")} 
                                onChange={handleCheckboxChange} 
                                value='Licencia de Urbanización' 
                                label='Licencia de Urbanización' 
                            />
                            <InputCheckBoxNew 
                                checked={selectedItems.includes("licencia de Subdivisión")} 
                                onChange={handleCheckboxChange} 
                                value='licencia de Subdivisión' 
                                label='Licencia de Subdivisión' 
                            />
                            <InputCheckBoxNew 
                                checked={selectedItems.includes("reconocimiento")} 
                                onChange={handleCheckboxChange} 
                                value='reconocimiento' 
                                label='Reconocimiento' 
                            />
                            <InputCheckBoxNew 
                                checked={selectedItems.includes("Licencia de Construcción")} 
                                onChange={handleCheckboxChange} 
                                value='Licencia de Construcción' 
                                label='Licencia de Construcción' 
                            />
                            <InputCheckBoxNew 
                                checked={selectedItems.includes("Licencia de Parcelación")} 
                                onChange={handleCheckboxChange} 
                                value='Licencia de Parcelación' 
                                label='Licencia de Parcelación' 
                            />
                        </BoxContainerInputsByInfo>
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='Modalidad' />
                            <SubTitleSectionInfo text='Seleccione un Tipo de Tramite *' />
                            {
                                !selectedItems.includes('reconocimiento') ? 
                                null
                                : 
                                <SubTitleSectionInfo text='La modalidad de Reconocimiento no aplica' />
                            }
                            {
                                selectedItems.includes('Licencia de Parcelación') ?
                                <>
                                    <SubTitleSectionInfo text='Modalidad Parcelación' />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("saneamiento")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='saneamiento' 
                                        label='Saneamiento' 
                                        name='saneamiento'
                                    />
                                </>
                                :
                                null 
                            }
                            {
                                selectedItems.includes('Licencia de Urbanización') ?
                                <>
                                    <SubTitleSectionInfo text='Modalidad Urbanización' />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("desarrollo")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='desarrollo' 
                                        label='Desarrollo' 
                                        name='desarrollo'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("reurbanizacion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='reurbanizacion' 
                                        label='Reurbanización' 
                                        name='reurbanizacion'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("regularizacion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='regularizacion' 
                                        label='Regularización' 
                                        name='regularizacion'
                                    />
                                </>
                                :
                                null 
                            }
                            {
                                selectedItems.includes('Licencia de Construcción') ?
                                <>
                                    <SubTitleSectionInfo text='Modalidad Construcción' />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("obra_nueva")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='obra_nueva' 
                                        label='Obra nueva' 
                                        name='obra_nueva'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("ampliacion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='ampliacion' 
                                        label='Ampliación' 
                                        name='ampliacion'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("adecuacion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='adecuacion' 
                                        label='Adecuación' 
                                        name='adecuacion'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("modificacion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='modificacion' 
                                        label='Modificación' 
                                        name='modificacion'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("restauracion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='restauracion' 
                                        label='Restauración' 
                                        name='restauracion'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("reforzamiento")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='reforzamiento' 
                                        label='Reforzamiento estructural' 
                                        name='reforzamiento'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("demolicion_parcial")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='demolicion_parcial' 
                                        label='Demolición parcial' 
                                        name='demolicion_parcial'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("demolicion_total")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='demolicion_total' 
                                        label='Demolición total' 
                                        name='demolicion_total'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("reconstruccion")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='reconstruccion' 
                                        label='Reconstrucción' 
                                        name='reconstruccion'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("cerraiento")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='cerraiento' 
                                        label='Cerramiento' 
                                        name='cerraiento'
                                    />
                                </>
                                :
                                null 
                            }
                            {
                                selectedItems.includes('licencia de Subdivisión') ?
                                <>
                                    <SubTitleSectionInfo text='Modalidad Subdivisión' />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("rural")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='rural' 
                                        label='Rural' 
                                        name='rural'
                                    />
                                    <InputCheckBoxNew 
                                        checked={selectedModalidad.includes("urbano")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='urbano' 
                                        label='Urbano' 
                                        name='urbano'
                                    />
                                    <InputCheckBoxNew   
                                        checked={selectedModalidad.includes("reloteo")} 
                                        onChange={handleCheckboxChangeModalidad} 
                                        value='reloteo' 
                                        label='Reloteo' 
                                        name='reloteo'
                                    />
                                </>
                                :
                                null 
                            }
                        </BoxContainerInputsByInfo>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepTwo} />
                        <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepThree} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
            }

            {step === 4 && 
                    <>
                        {
                            stepMini === 1 &&
                            <StepContentNR>
                                <ContainerInputsNRNew>
                                    <BoxContainerInputsByInfoBig>
                                        <TitleSectionInfo text='Requisitos Generales *' />
                                        <SubTitleSectionInfo text='Seleccione los requisitos generales *' />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes('Formulario único nacional')} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[0])} 
                                            name={'Formulario único nacional'}
                                            label='Formulario Único Nacional' 
                                        />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes("Copia del certificado de libertad y tradición del inmueble")} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[1])} 
                                            name={'Copia del certificado de libertad y tradición del inmueble'}
                                            label='Copia del certificado de libertad y tradición del inmueble' 
                                        />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes("Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal")} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[2])} 
                                            name={'Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal'}
                                            label='Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal' 
                                        />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes("Copia de la matricula profesional de los profesionales intervinientes")} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[3])} 
                                            name={'Copia de la matricula profesional de los profesionales intervinientes'}
                                            label='Copia de la matricula profesional de los profesionales intervinientes' 
                                        />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes("Copia simple de la escritura publica")} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[4])} 
                                            name={'Copia simple de la escritura pública'}
                                            label='Copia simple de la escritura pública' 
                                        />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes("Copia del recibo del impuesto predial")} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[5])} 
                                            name={'Copia del recibo del impuesto predial'}
                                            label='Copia del recibo del impuesto predial' 
                                        />
                                        <InputCheckBoxNew 
                                            checked={tareasCompletadas.includes("Poder especial")} 
                                            onChange={handleCheckboxChangeRequisitos} 
                                            value={JSON.stringify(valorInicualTareasPendientesObjeto[6])} 
                                            name={'Poder especial'}
                                            label='Poder especial' 
                                        />
                                    </BoxContainerInputsByInfoBig>
                                </ContainerInputsNRNew>
                                <ContainerButtonsBackandNextSmall>  
                                    <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepThree} />
                                    <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepFive} />
                                </ContainerButtonsBackandNextSmall>
                            </StepContentNR>
                            
                        }
                        {
                            stepMini === 2 &&
                            <StepContentNR> 
                                <ContainerInputsNRNew>
                                    <BoxContainerInputsByInfoBig> 
                                    <TitleSectionInfo text='Requisitos Modalidad *' />
                                        {
                                            selectedItems.includes('Licencia de Urbanización') &&
                                            <>
                                                <TitleSectionInfo text='Requisitos Para Licencia de Urbanización' />
                                                <InputCheckBoxNew 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorUrbanizacionobjeto[0])} 
                                                    checked={tareasCompletadas.includes("Documentación del proyecto urbanístico")} 
                                                    name={'Documentación del proyecto urbanístico'}
                                                    label='Documentación del proyecto urbanístico' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano topográfico")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorUrbanizacionobjeto[1])} 
                                                    name={'Plano topográfico'}
                                                    label='Plano topográfico' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Certificación de servicios públicos")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorUrbanizacionobjeto[2])} 
                                                    name={'Certificación de servicios públicos'}
                                                    label='Certificación de servicios públicos' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Estudio de amenaza y riesgo (Opcional)")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorUrbanizacionobjeto[3])} 
                                                    name={'Estudio de amenaza y riesgo (Opcional)'}
                                                    label='Estudio de amenaza y riesgo (Opcional)' 
                                                />
                                            </>
                                        }
                                        {
                                            selectedItems.includes('licencia de Subdivisión') &&
                                            <>
                                                <TitleSectionInfo text='Requisitos Para Licencia de Subdivisión' />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano del levantamiento topográfico firmado por el ingeniero topográfico")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorSubdivisionobjeto[0])} 
                                                    name={'Plano del levantamiento topográfico firmado por el ingeniero topográfico'}
                                                    label='Plano del levantamiento topográfico firmado por el ingeniero topográfico' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano con base en el cual se urbanizaron los predios objeto de la solicitud")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorSubdivisionobjeto[1])} 
                                                    name={'Plano con base en el cual se urbanizaron los predios objeto de la solicitud'}
                                                    label='Plano con base en el cual se urbanizaron los predios objeto de la solicitud' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano firmado por un arquitecto con matrícula profesional")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorSubdivisionobjeto[2])} 
                                                    name={'Plano firmado por un arquitecto con matrícula profesional'}
                                                    label='Plano firmado por un arquitecto con matrícula profesional' 
                                                />
                                            </>
                                        }
                                        {
                                            selectedItems.includes('reconocimiento') &&
                                            <>
                                                <TitleSectionInfo text='Requisitos de Reconocimiento' />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Levantamiento arquitectónico firmado")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorReconocimientoobjeto[0])} 
                                                    name={'Levantamiento arquitectónico firmado'}
                                                    label='Levantamiento arquitectónico firmado' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Declaración de antigüedad de la construcción")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorReconocimientoobjeto[1])} 
                                                    name={'Declaración de antigüedad de la construcción'}
                                                    label='Declaración de antigüedad de la construcción' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Peritaje técnico de estabilidad y vulnerabilidad sísmica")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorReconocimientoobjeto[2])} 
                                                    name={'Peritaje técnico de estabilidad y vulnerabilidad sísmica'}
                                                    label='Peritaje técnico de estabilidad y vulnerabilidad sísmica' 
                                                />
                                            </>
                                        }
                                        {
                                            selectedItems.includes('Licencia de Construcción')  &&
                                            <>
                                                <TitleSectionInfo text='Requisitos de Licencia de Construcción' />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Planos estructurales")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[0])} 
                                                    name={'Planos estructurales'}
                                                    label='Planos estructurales' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Estudios de suelos")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[1])} 
                                                    name={'Estudios de suelos'}
                                                    label='Estudios de suelos' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Segunda revisión estructural (para proyectos de mas de 2.000 mts)")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[2])} 
                                                    name={'Segunda revisión estructural (para proyectos de mas de 2.000 mts)'}
                                                    label='Segunda revisión estructural (para proyectos de mas de 2.000 mts)' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Planos arquitectónicos")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[3])} 
                                                    name={'Planos arquitectónicos'}
                                                    label='Planos arquitectónicos' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Autorización de propiedad horizontal")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[4])} 
                                                    name={'Autorización de propiedad horizontal'}
                                                    label='Autorización de propiedad horizontal' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Memorias de cálculo y diseños estructurales")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[5])} 
                                                    name={'Memorias de cálculo y diseños estructurales'}
                                                    label='Memorias de cálculo y diseños estructurales' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Memorias de cálculo de elementos no estructurales")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorConstruccionobjeto[6])} 
                                                    name={'Memorias de cálculo de elementos no estructurales'}
                                                    label='Memorias de cálculo de elementos no estructurales' 
                                                />
                                            </>
                                        }
                                        {
                                            selectedItems.includes('Licencia de Parcelación') &&
                                            <>
                                                <TitleSectionInfo text='Requisitos de Licencia de Parcelación' />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano topográfico georreferenciado")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[0])} 
                                                    name={'Plano topográfico georreferenciado'}
                                                    label='Plano topográfico georreferenciado' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano del proyecto de parcelación firmado por el arquitecto matriculado")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[1])} 
                                                    name={'Plano del proyecto de parcelación firmado por el arquitecto matriculado'}
                                                    label='Plano del proyecto de parcelación firmado por el arquitecto matriculado' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Autorización para servicios públicos y permisos ambientales")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[2])} 
                                                    name={'Autorización para servicios públicos y permisos ambientales'}
                                                    label='Autorización para servicios públicos y permisos ambientales' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Estudio de amenaza y riesgo")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[3])} 
                                                    name={'Estudio de amenaza y riesgo'}
                                                    label='Estudio de amenaza y riesgo' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Copia de licencia vencida de parcelación incluyendo modificaciones")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[4])} 
                                                    name={'Copia de licencia vencida de parcelación incluyendo modificaciones'}
                                                    label='Copia de licencia vencida de parcelación incluyendo modificaciones' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Certificación del solicitante bajo juramento")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[5])} 
                                                    name={'Certificación del solicitante bajo juramento'}
                                                    label='Certificación del solicitante bajo juramento' 
                                                />
                                                <InputCheckBoxNew 
                                                    checked={tareasCompletadas.includes("Plano actualizado de la parcelación")} 
                                                    onChange={handleCheckboxChangeRequisitos} 
                                                    value={JSON.stringify(valorParcelacionobjeto[6])} 
                                                    name={'Plano actualizado de la parcelación'}
                                                    label='Plano actualizado de la parcelación' 
                                                />
                                            </>
                                        }
                                    </BoxContainerInputsByInfoBig>
                                </ContainerInputsNRNew>
                                <ContainerButtonsBackandNextSmall>  
                                    <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepFour} />
                                    <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepSix} />
                                </ContainerButtonsBackandNextSmall>
                            </StepContentNR>
                        }
                        {
                            stepMini === 3 &&
                            <StepContentNR> 
                                <ContainerInputsNRNew>
                                    <BoxContainerInputsByInfoBig>
                                        <TitleSectionInfo text='Copia de la matricula profesional de los profesionales intervinientes' />
                                        <ListadoMatriculaProfesionales 
                                            tareasCompletadas={tareasCompletadas} 
                                            handleCheckboxChangeRequisitos={handleCheckboxChangeRequisitosButton} 
                                            dataInicial={ valorInicialMatriculaProfesionales} 
                                            functionAddNoAplica={handleAgregarNoAplica}
                                        />
                                    </BoxContainerInputsByInfoBig>
                                </ContainerInputsNRNew>
                                <ContainerButtonsBackandNextSmall>  
                                    <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepFive} />
                                    <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepSeven} />
                                </ContainerButtonsBackandNextSmall>
                            </StepContentNR>
                        }
                        {
                            stepMini === 4 &&
                            <StepContentNR> 
                                <ContainerInputsNRNew>
                                    <BoxContainerInputsByInfoBig>
                                        <TitleSectionInfo text='Copia de los certificados de experiencia de los profesionales intervinientes' />
                                        <ListadoMatriculaProfesionales 
                                            tareasCompletadas={tareasCompletadas} 
                                            handleCheckboxChangeRequisitos={handleCheckboxChangeRequisitosButton} 
                                            dataInicial={ valorInicialCertificadoExperienciaProfesionales } 
                                            functionAddNoAplica={handleAgregarNoAplica}
                                        />
                                    </BoxContainerInputsByInfoBig>
                                </ContainerInputsNRNew>
                                <ContainerButtonsBackandNextSmall>  
                                    <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepSix} />
                                    <PrimaryButtonNewSmall text='Generar Radicación' onClick={handleSubmit} />
                                </ContainerButtonsBackandNextSmall>
                            </StepContentNR>
                        }
                    </>
            }

            {step === 5 && (
                <>
                <section className='nuevaradicacion-genarales driver-nuevaradicacion-datos-genarales'>
                    <article className='nuevaradicacion-genarales__article'>
                        <h2 className='nuevaradicacion-genarales__article__h2'>Datos Generales</h2>

                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Tipo de persona *</label>
                            <PrimaryDropDown 
                                propOptions={tipoPersonaOptions}
                                propName='tipo_persona'
                                propValue={nuevaRadicacion.tipo_persona || ''}
                                propOnchangeFn={handleNuevaRadicacion}
                                propPlaceholderOption='Seleccione tipo de persona'
                            />
                            {/* <select 
                                value={nuevaRadicacion.tipo_persona || ''}
                                onChange={handleNuevaRadicacion}
                                className='input-base__select' 
                                name='tipo_persona'
                            >
                                <option selected value="">Seleccione tipo de persona</option>
                                <option value="natural">Natural</option>
                                <option value="juridica">Juridica</option>
                            </select> */}
                            { !errorInputVacio.tipo_persona && intentarCrearRadicacion && <p className='error-p'>!Este campo no puede estar vacio¡</p> }
                        </div>

                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Departamento</label>
                            <p className='nueva-radicacion-p-basico'>{nuevaRadicacion.departamento}</p>
                            {/*<input
                                value={nuevaRadicacion.departamento || ''}
                                onChange={handleNuevaRadicacion}
                                className='input-base__input' 
                                type="text"
                                name='departamento'
                            />*/}
                        </div>

                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Municipio</label>
                            <p className='nueva-radicacion-p-basico'>{nuevaRadicacion.municipio}</p>
                            {/*<input
                                value={nuevaRadicacion.municipio || ''}
                                onChange={handleNuevaRadicacion}
                                className='input-base__input' 
                                type="text"
                                name='municipio'
                            />*/}
                        </div>
                    </article>
                </section>
                        
                {/*Seccion inicial datos del solicitante*/}
                <section className='nuevaradicacion-solicitantes'>
                    <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                            <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Datos del Solicitante</h2>
                        </div>

                        <div className='nuevaradicacion-solicitantes-div'>
                            {/*Input que recibe el nombre del solicitante*/}
                            <div className='input-base'>
                                <PrimaryInputTextValidator 
                                    value={nuevaRadicacion.nombre_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'nombre_solicitante'}
                                    maxLength={250}
                                    textLabel={'Nombre Completo *'}
                                    placeholder={'Nombre Completo'}
                                    classNameLabel={'input-base__label'}
                                    className={'input-base__input'}
                                    classNameContainer='primary-container'
                                    classNameError='primary-validator-error-span'
                                />
                                { !errorInputVacio.nombre_solicitante && intentarCrearRadicacion && <p className='error-p'>!Este campo no puede estar vacio¡</p> }
                            </div>
                            
                            {/*Input que recibe el dni del solicitante*/}
                            <div className='input-base'>
                                <PrimaryInputNumberValidator 
                                    value={nuevaRadicacion.dni_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'dni_solicitante'}
                                    maxLength={120}
                                    textLabel={nuevaRadicacion.tipo_persona === 'natural' ? 'Cedula de Ciudadania *' : nuevaRadicacion.tipo_persona === 'juridica' ? 'NIT *' : 'Identificacion *'}
                                    placeholder={nuevaRadicacion.tipo_persona === 'natural' ? 'Ejemlo: 1018054972' : nuevaRadicacion.tipo_persona === 'juridica' ? 'Ejemlo: 76506932-3' : 'Identificacion *'}
                                    classNameLabel={'input-base__label'}
                                    className={'input-base__input'}
                                    classNameContainer='primary-container'
                                    classNameError='primary-validator-error-span'
                                />
                                { !errorInputVacio.dni_solicitante && intentarCrearRadicacion && <p className='error-p'>!Este campo no puede estar vacio¡</p> }
                            </div>
                            
                            {/*Input que recibe el email del solicitante*/}
                            <div className='input-base'>                    
                                <PrimaryInputEmailValidator 
                                    value={nuevaRadicacion.email_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'email_solicitante'}
                                    textLabel={'Correo *'}
                                    placeholder={'Correo'}
                                    classNameLabel={'input-base__label'}
                                    className={'input-base__input'}
                                    classNameContainer='primary-container'
                                    classNameError='primary-validator-error-span'
                                    autoComplete='off'
                                    maxLength={150}
                                />
                                { !errorInputVacio.email_solicitante && intentarCrearRadicacion && <p className='error-p'>!Este campo no puede estar vacio¡</p> }
                            </div>

                            {/*Input que recibe el telefono del solicitante*/}
                            <div className='input-base'>
                                <PrimaryInputNumberValidator 
                                    value={nuevaRadicacion.phone_solicitante || ''}
                                    onChange={handleNuevaRadicacion}
                                    name={'phone_solicitante'}
                                    maxLength={15}
                                    textLabel={'Telefono *'}
                                    placeholder={'Telefono'}
                                    classNameLabel={'input-base__label'}
                                    className={'input-base__input'}
                                    classNameContainer='primary-container'
                                    classNameError='primary-validator-error-span'
                                />
                                { !errorInputVacio.phone_solicitante && intentarCrearRadicacion && <p className='error-p'>!Este campo no puede estar vacio¡</p> }
                            </div>      
                        </div>
                            
                        
                    </article>
                </section>

                <section className='nuevaradicacion-solicitantes'>
                    <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                            <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Tipo de Usos</h2>
                        </div>
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Usos *</label>
                            <textarea 
                                value={nuevaRadicacion.usos || ''}
                                onChange={handleNuevaRadicacion}
                                className='input-base__input input-base__input--textarea' 
                                type="text" 
                                name='usos'
                                maxLength={500}
                            />
                            { !errorInputVacio.usos && intentarCrearRadicacion && <p className='error-p'>!Este campo no puede estar vacio¡</p> }
                        </div>
                    </article>
                </section>

                {/*Seccion inicial tipo de tramite*/}
                <section className='nuevaradicacion-solicitantes'>
                    <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                            <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Tipo de Trámite</h2>
                        </div>
                        <article className='nuevaradicacion-modalidad__article'>
                            <span className='nuevaradicacion-modalidad__article__span'>Seleccione Tramites *</span>
                            <div className='input-checkbox'>
                                <input 
                                    checked={selectedItems.includes("Licencia de Urbanización")} 
                                    onChange={handleCheckboxChange} 
                                    value='Licencia de Urbanización' 
                                    className='input-checkbox__input' 
                                    type="checkbox" 
                                />
                                <label className='input-checkbox__label' htmlFor="">Licencia de Urbanización</label>
                            </div>
                            <div className='input-checkbox'>
                                <input 
                                    checked={selectedItems.includes("licencia de Subdivisión")} 
                                    onChange={handleCheckboxChange} 
                                    value='licencia de Subdivisión' 
                                    className='input-checkbox__input' 
                                    type="checkbox" 
                                />
                                <label className='input-checkbox__label' htmlFor="">Licencia de Subdivisión</label>
                            </div>
                            <div className='input-checkbox'>
                                <input checked={selectedItems.includes("reconocimiento")} onChange={handleCheckboxChange}  value='reconocimiento' className='input-checkbox__input' type="checkbox" />
                                <label className='input-checkbox__label' htmlFor="">Reconocimiento</label>
                            </div>
                            <div className='input-checkbox'>
                                <input checked={selectedItems.includes("Licencia de construcción")} onChange={handleCheckboxChange} value='Licencia de construcción' className='input-checkbox__input' type="checkbox" />
                                <label className='input-checkbox__label' htmlFor="">Licencia de construcción</label>
                            </div>
                            <div className='input-checkbox'>
                                <input checked={selectedItems.includes("Licencia de Parcelación")} onChange={handleCheckboxChange} value='Licencia de Parcelación' className='input-checkbox__input' type="checkbox" />
                                <label className='input-checkbox__label' htmlFor="">Licencia de Parcelación</label>
                            </div>
                            { !errorInputVacio.descripcion_tramite && intentarCrearRadicacion && <p className='error-p'>!Tienes que elegir un tipo de tramite¡</p> }
                        </article>    
                    </article>
                </section>

                {/*Seccion inicial modalidad del tramite*/}
                <section className='nuevaradicacion-solicitantes'>
                    <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                            <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Modalidad del Trámite</h2>
                        </div>
                        {
                            selectedItems.length > 0 ? 
                            null
                            : 
                            <p className='no-aplica-p'>Selecciona Tipo de Tramite</p>
                        }

                        {
                            !selectedItems.includes('reconocimiento') ? 
                            null
                            : 
                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Modalidad Reconocimiento</span>
                                <div className='input-checkbox'>
                                    <p className='no-aplica-p'>No aplica</p>
                                </div>
                            </article>
                        }
                                    
                        {
                            selectedItems.includes('Licencia de Parcelación') ?

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Modalidad Parcelación</span>
                                <div className='input-checkbox'>
                                    <input 
                                        onChange={handleCheckboxChangeModalidad}
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        value={'saneamiento'}
                                        checked={selectedModalidad.includes("saneamiento")}
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Saneamiento</label>
                                </div>
                            </article>
                            :
                            null
                        }

                        {
                            selectedItems.includes('Licencia de Urbanización')  &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Modalidad Urbanización</span>
                                <div className='input-checkbox'>
                                    <input 
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'desarrollo'}
                                        checked={selectedModalidad.includes("desarrollo")}
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Desarrollo</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input 
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'reurbanizacion'}
                                        checked={selectedModalidad.includes("reurbanizacion")}
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Reurbanización</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'regularizacion'}
                                        checked={selectedModalidad.includes("regularizacion")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Saneamiento</label>
                                </div>
                            </article>
                        }

                                

                        {
                            selectedItems.includes('Licencia de construcción')  &&
                                    
                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Modalidad Construcción</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'obra_nueva'}
                                        checked={selectedModalidad.includes("obra_nueva")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Obra nueva</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'ampliacion'}
                                        checked={selectedModalidad.includes("ampliacion")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Ampliación</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'adecuacion'}
                                        checked={selectedModalidad.includes("adecuacion")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Adecuación</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'modificacion'}
                                        checked={selectedModalidad.includes("modificacion")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Modificación</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'restauracion'}
                                        checked={selectedModalidad.includes("restauracion")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Restauración</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'reforzamiento'}
                                        checked={selectedModalidad.includes("reforzamiento")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Reforzamiento estructural</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'demolicion_parcial'}
                                        checked={selectedModalidad.includes("demolicion_parcial")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Demolición parcial</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'demolicion_total'}
                                        checked={selectedModalidad.includes("demolicion_total")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Demolición total</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'reconstruccion'}
                                        checked={selectedModalidad.includes("reconstruccion")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Reconstrucción</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'cerraiento'}
                                        checked={selectedModalidad.includes("cerraiento")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Cerramiento</label>
                                </div>
                            </article>
                        }
                                
                        {
                            selectedItems.includes('licencia de Subdivisión')  &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Modalidad Subdivisión</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'rural'}
                                        checked={selectedModalidad.includes("rural")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Rural</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'urbano'}
                                        checked={selectedModalidad.includes("urbano")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Urbano</label>
                                </div>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeModalidad}
                                        value={'reloteo'}
                                        checked={selectedModalidad.includes("reloteo")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Reloteo</label>
                                </div>
                                { !errorInputVacio.descripcion_modalidad && intentarCrearRadicacion && <p className='error-p'>!Tienes que elegir una al menos una modalidad¡</p> }
                            </article>
                        }      
                    </article>
                </section>

                {/*Seccion inicial requisitos del tramite*/}
                <section className='nuevaradicacion-solicitantes'>
                    <article className='nuevaradicacion-solicitantes__article'>
                        <div className='nuevaradicacion-solicitantes__article__div'>
                            <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Requisitos del Trámite</h2>
                        </div>

                        {
                            selectedItems.length > 0 ? 
                            null
                            : 
                            <p className='no-aplica-p'>Selecciona Tipo de Tramite</p>
                        }
                        
                        {/*Requisitos generales*/}
                        <article className='nuevaradicacion-modalidad__article'>
                            <span className='nuevaradicacion-modalidad__article__span'>Requisitos Generales *</span>

                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[0])}
                                    checked={tareasCompletadas.includes('Formulario único nacional')} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name={'Formulario único nacional'}
                                />
                                <label className='input-checkbox__label' htmlFor="">Formulario Único Nacional</label>
                            </div>

                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[1])}
                                    checked={tareasCompletadas.includes("Copia del certificado de libertad y tradición del inmueble")} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name='Copia del certificado de libertad y tradición del inmueble'
                                />
                                <label className='input-checkbox__label' htmlFor="">Copia del certificado de libertad y tradición del inmueble</label>
                            </div>
                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[2])}
                                    checked={tareasCompletadas.includes("Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal")} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name='Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal' 
                                />
                                <label className='input-checkbox__label' htmlFor="">Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal </label>
                            </div>
                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[3])}
                                    checked={tareasCompletadas.includes("Copia de la matricula profesional de los profesionales intervinientes")} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name='Copia de la matricula profesional de los profesionales intervinientes' 
                                />
                                <label className='input-checkbox__label' htmlFor="">Copia de la matricula profesional de los profesionales intervinientes</label>
                            </div>
                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[4])}
                                    checked={tareasCompletadas.includes("Copia simple de la escritura publica")} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name='Copia simple de la escritura pública'     
                                />
                                <label className='input-checkbox__label' htmlFor="">Copia simple de la escritura pública </label>
                            </div>
                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[5])}
                                    checked={tareasCompletadas.includes("Copia del recibo del impuesto predial")} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name='Copia del recibo del impuesto predial'     
                                />
                                <label className='input-checkbox__label' htmlFor="">Copia del recibo del impuesto predial</label>
                            </div>
                            <div className='input-checkbox'>
                                <input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(valorInicualTareasPendientesObjeto[6])}
                                    checked={tareasCompletadas.includes("Poder especial")} 
                                    className='input-checkbox__input' 
                                    type="checkbox"
                                    name='Poder especial'     
                                />
                                <label className='input-checkbox__label' htmlFor="">Poder especial</label>
                            </div>
                        </article>

                        {/*Copia de la matricula profesional de los profesionales intervinientes*/}
                        <ListadoMatriculaProfesionales 
                            tareasCompletadas={tareasCompletadas} 
                            handleCheckboxChangeRequisitos={handleCheckboxChangeRequisitos} 
                            dataInicial={ valorInicialMatriculaProfesionales} 
                            propTitleList={'Copia de la matricula profesional de los profesionales intervinientes'}
                            functionAddNoAplica={handleAgregarNoAplica}
                        />

                        {/*Copia de la matricula profesional de los profesionales intervinientes*/}
                        <ListadoMatriculaProfesionales 
                            tareasCompletadas={tareasCompletadas} 
                            handleCheckboxChangeRequisitos={handleCheckboxChangeRequisitos} 
                            dataInicial={ valorInicialCertificadoExperienciaProfesionales } 
                            propTitleList={'Copia de los certificados de experiencia de los profesionales intervinientes'}
                            functionAddNoAplica={handleAgregarNoAplica}
                        />



                        {/*Requisitos Urbanizacion*/}
                        {
                            selectedItems.includes('Licencia de Urbanización') &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Requisitos Urbanización</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorUrbanizacionobjeto[0])}
                                        checked={tareasCompletadas.includes("Documentación del proyecto urbanístico")} 
                                        className='input-checkbox__input' 
                                        type="checkbox"
                                        name='Documentación del proyecto urbanístico'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Documentación del proyecto urbanístico</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorUrbanizacionobjeto[1])}
                                        checked={tareasCompletadas.includes("Plano topográfico")} 
                                        className='input-checkbox__input' 
                                        type="checkbox"
                                        name='Plano topográfico'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano topográfico</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorUrbanizacionobjeto[2])}
                                        checked={tareasCompletadas.includes("Certificación de servicios públicos")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Certificación de servicios públicos'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Certificación de servicios públicos</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorUrbanizacionobjeto[3])}
                                        checked={tareasCompletadas.includes("Estudio de amenaza y riesgo (Opcional)")}
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Estudio de amenaza y riesgo (Opcional)'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Estudio de amenaza y riesgo (Opcional)</label>
                                </div>
                            </article>
                        }
                        {/*Requisitos subdivicion*/}
                        {
                            selectedItems.includes('licencia de Subdivisión') &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Requisitos Subdivisión</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorSubdivisionobjeto[0])}
                                        checked={tareasCompletadas.includes("Plano del levantamiento topográfico firmado por el ingeniero topográfico")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Plano del levantamiento topográfico firmado por el ingeniero topográfico'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano del levantamiento topográfico firmado por el ingeniero topográfico</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorSubdivisionobjeto[1])}
                                        checked={tareasCompletadas.includes("Plano con base en el cual se urbanizaron los predios objeto de la solicitud")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Plano con base en el cual se urbanizaron los predios objeto de la solicitud'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano con base en el cual se urbanizaron los predios objeto de la solicitud</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorSubdivisionobjeto[2])}
                                        checked={tareasCompletadas.includes("Plano firmado por un arquitecto con matrícula profesional")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Plano firmado por un arquitecto con matrícula profesional'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano firmado por un arquitecto con matrícula profesional</label>
                                </div>
                            </article>
                        }
                        {/*Requisitos reconocimiento*/}
                        {
                            selectedItems.includes('reconocimiento') &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Requisitos de Reconocimiento</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorReconocimientoobjeto[0])}
                                        checked={tareasCompletadas.includes("Levantamiento arquitectónico firmado")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Levantamiento arquitectónico firmado'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Levantamiento arquitectónico firmado</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorReconocimientoobjeto[1])}
                                        checked={tareasCompletadas.includes("Declaración de antigüedad de la construcción")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Declaración de antigüedad de la construcción'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Declaración de antigüedad de la construcción</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorReconocimientoobjeto[2])}
                                        checked={tareasCompletadas.includes("Peritaje técnico de estabilidad y vulnerabilidad sísmica")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Peritaje técnico de estabilidad y vulnerabilidad sísmica'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Peritaje técnico de estabilidad y vulnerabilidad sísmica </label>
                                </div>
                            </article>
                        }
                        {/*Requisitos construccion*/}
                        {
                            selectedItems.includes('Licencia de construcción')  &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Requisitos Licencia de Construcción</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[0])}
                                        checked={tareasCompletadas.includes("Planos estructurales")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Planos estructurales'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Planos estructurales</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[1])}
                                        checked={tareasCompletadas.includes("Estudios de suelos")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Estudios de suelos'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Estudios de suelos</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[2])}
                                        checked={tareasCompletadas.includes("Segunda revisión estructural (para proyectos de mas de 2.000 mts)")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Segunda revisión estructural (para proyectos de mas de 2.000 mts)'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Segunda revisión estructural (para proyectos de mas de 2.000 mts)</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[3])}
                                        checked={tareasCompletadas.includes("Planos arquitectónicos")} 
                                        className='input-checkbox__input' 
                                        type="checkbox"
                                        name='Planos arquitectónicos'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Planos arquitectónicos</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[4])} 
                                        checked={tareasCompletadas.includes("Autorización de propiedad horizontal")}
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Autorización de propiedad horizontal'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Autorización de propiedad horizontal (si aplica)</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[5])}
                                        checked={tareasCompletadas.includes("Memorias de cálculo y diseños estructurales")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Memorias de cálculo y diseños estructurales'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Memorias de cálculo y diseños estructurales</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorConstruccionobjeto[6])}
                                        checked={tareasCompletadas.includes("Memorias de cálculo de elementos no estructurales")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Memorias de cálculo de elementos no estructurales'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Memorias de cálculo de elementos no estructurales</label>
                                </div>

                            </article>
                        }
                        {/*Requisitos parcelacion*/}
                        {
                            selectedItems.includes('Licencia de Parcelación') &&

                            <article className='nuevaradicacion-modalidad__article'>
                                <span className='nuevaradicacion-modalidad__article__span'>Requisitos Parcelación</span>
                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[0])}
                                        checked={tareasCompletadas.includes("Plano topográfico georreferenciado")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Plano topográfico georreferenciado'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano topográfico georreferenciado </label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[1])}
                                        checked={tareasCompletadas.includes("Plano del proyecto de parcelación firmado por el arquitecto matriculado")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Plano del proyecto de parcelación firmado por arquitecto matriculado'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano del proyecto de parcelación firmado por arquitecto matriculado</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[2])}
                                        checked={tareasCompletadas.includes("Autorizacion para serviciois publicos y permisos ambientales")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Autorización para servicios públicos y permisos ambientales'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Autorización para servicios públicos y permisos ambientales</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[3])}
                                        checked={tareasCompletadas.includes("Estduio de amenaza y riesgo")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Estudios de amenaza y riesgo'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Estudios de amenaza y riesgo</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[4])}
                                        checked={tareasCompletadas.includes("Copia de licencia vencida de parcelación incluyendo modificaciones")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Copia de la licencia vencida de parcelación Incluyendo modificaciones'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Copia de la licencia vencida de parcelación Incluyendo modificaciones</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[5])}
                                        checked={tareasCompletadas.includes("Certificacion del solicitante bajo juramento")}
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Certificación del solicitante bajo juramento'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Certificación del solicitante bajo juramento</label>
                                </div>

                                <div className='input-checkbox'>
                                    <input
                                        onChange={handleCheckboxChangeRequisitos}
                                        value={JSON.stringify(valorParcelacionobjeto[6])}
                                        checked={tareasCompletadas.includes("Plano actualizado de la parcelación")} 
                                        className='input-checkbox__input' 
                                        type="checkbox" 
                                        name='Plano actualizado del proyecto de parcelación'
                                    />
                                    <label className='input-checkbox__label' htmlFor="">Plano actualizado del proyecto de parcelación</label>
                                </div>

                            </article>
                        }
                    </article>
                </section>
                        
                {/*Seccion inicial documentos del tramite*/}
                <section className='footer-section'>
                    <PrimaryButton textButton={'Crear nueva solicitud'} propFunction={handleSubmit} />
                    <PrimaryButton textButton={'Menú principal'} propFunction={navigateToMenu} />
                </section>
                </>
            )}
            
            

            {
                radicacionEstaIncompleta &&
                <Modal>
                    <BoxAlertNotificationError 
                        message={`No se puede crear la Radicacion, faltan campos por completar`}
                        onClick={handleAlertNotification}
                        textButton2={'Aceptar'}
                    />
                </Modal>
            }

            {
                radicacionCompletada &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message={`La radicación Numero ${numeroDeRadicacion} fue creada con éxito`}
                        onClick={handleNavigateTocreatePredio}
                        textButton2={'Aceptar'}
                    />
                </Modal>
            }
            {
                isOpenVideo &&
                <Modal>
                    <div className='modal-video'>
                        <div className='modal-video__close'>
                            <button className='modal-video__close__button' onClick={() => setIsOpenVideo(false)}>
                                <XMarkIcon className='modal-video__close__button__icon' />
                            </button>
                        </div>
                        <iframe 
                            src="https://ladfilab-my.sharepoint.com/:v:/g/personal/gerencia_deltainnovalabs_com/EckWynAkPlFDliMX3GT6Do8BytRyuFS5YHreZJHczF4-qQ?e=7CHoGG/_layouts/15/embed.aspx?UniqueId=70ca16c9-3e24-4351-9623-17dc64fa0e8f&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            scrolling="no" 
                            allowFullScreen 
                        ></iframe>
                    </div>
                </Modal>
            }
        </PrincipalPage>
    )
    
}

export default NuevaRadicacion
