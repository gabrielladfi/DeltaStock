import './agregarnuevopredio.scss'
import { AgregarNuevoPredioProvider } from './Context/AgregarNuevoPredioContext'
import '../../Sass/globalSass.scss'
import TableColindantes from './Components/TableColindantes'
import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../Context/GlobalContext'
import { useServicesGet } from '../../Hooks/useServicesGet'
import { useServicesPost } from '../../Hooks/useServicesPost'
import DropdownSearch from '../CrearNuevaSolicitudNR/Components/DropdownSearch'
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import { ChevronDownIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import PrimaryButton from '@/Components/PrimaryButton'
import Modal from '@/Components/Modal'
import BoxAlertNotification from '@/Components/Molecules/BoxAlertNotification'
import successLogo from '@/assets/checkLogo.svg'
import useLeaveTask from '@/Hooks/useLeaveTask'
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR'
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion'
import ProgressiveStepAgregarPredio from '@/Components/Molecules/ProgressiveStepAgregarPredio'
import StepContentNR from '@/Components/Atoms/StepContentNR'
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew'
import BoxContainerInputsByInfoBig from '@/Components/Atoms/BoxContainerInputsByInfoBig'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '@/Components/Molecules/PickList'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import PrimaryButtonNew from '@/Components/Atoms/PrimaryButtonNew'
import SecondaryButtonNew from '@/Components/Atoms/SecondaryButtonNew'
import ContainerRegistroVecinosColindantes from '@/Components/Molecules/ContainerRegistroVecinosColindantes'
import TablaVecinosColindantes from '../CrearNuevaSolicitudNR/Components/TablaVecinosColindantes'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk'
import BoxAlertNotificationError from '@/Components/Molecules/BoxAlertNotificationError'
function AgregarNuevoPredio() {
    return (
        <>
            <AgregarNuevoPredioProvider>
                <AgregarNuevoPredioContent />
            </AgregarNuevoPredioProvider>
        </>
    )
}

function AgregarNuevoPredioContent() {

    const {  
            setVecinosColindantes, 
            vecinosColindantes, 
            informacionRadicacion, 
            globalIdVecinos,
            valorDropdown,
            setPredio,
            predio,
            listadoVecinos,
            setProgressiveStepStatus,
            agregarVecinoColindante,
            setAgregarVecinoColindante
        } = useContext(GlobalState);
    const { fetchInformacionDeRadicacion, fetchListadoVecinosNumeroRadicacion } = useServicesGet();
    const { fetchPostObtenerIdVecinos, fetchPostCrearVecinos, fetchPostCrearPredio } = useServicesPost()
    const { navigateToInformacionPredio, navigateToPredioPorNumeroRadicacion } = useNavigateProvider();

    const [ errorVecinosVacios, setErrorVecinosVacios ] = useState(false);
    const [ vecinoColindanteCreado, setVecinoColindanteCreado ] = useState(false);

    const numeroDeradicacion = localStorage.getItem('numeroRadicacionLocalStorage');

    console.log(numeroDeradicacion)

   


        
    useEffect(() => {
        fetchInformacionDeRadicacion(numeroDeradicacion);
       
    },[numeroDeradicacion]);

    const dataIdVecinos = {
        numero_radicacion: numeroDeradicacion
    }

    useEffect(() => {
        fetchPostObtenerIdVecinos(dataIdVecinos);
    }, []);

    console.log(globalIdVecinos)


    function handleCreaNuevoVecinosColindante({ target }){
        const { name, value } = target;
        setVecinosColindantes({
            ...vecinosColindantes,
            [name]: value
        })
    }

    function handleTipoTramite() {
        setVecinosColindantes({
            ...vecinosColindantes,
            //descripcion_tramite: informacionRadicacion[0].descripcion_tramite,
            numero_radicacion: numeroDeradicacion,
            id_vecinos: globalIdVecinos.id_vecinos,
            barrio: valorDropdown,

        })
    }
    useEffect(() => {
        handleTipoTramite();
    }, [ informacionRadicacion, valorDropdown]);

    const objetoInformacionRadicacion = informacionRadicacion && informacionRadicacion[0] ? informacionRadicacion[0] : {};

    console.log(objetoInformacionRadicacion.descripcion_tramite)

    async function crearNuevoVecinoColindante(){
        await fetchPostCrearVecinos(vecinosColindantes)
        setErrorVecinosVacios(false);
        fetchListadoVecinosNumeroRadicacion(numeroDeradicacion);
         setVecinosColindantes({
            "numero_radicacion": numeroDeradicacion,
            "nombre": "",
            "direccion": "",   
            "descripcion_tramite": objetoInformacionRadicacion.descripcion_tramite,
            "id_vecinos": globalIdVecinos.id_vecinos
        })
        setVecinoColindanteCreado(true);

        setVecinosColindantes({
            ...vecinosColindantes,
            "nombre": "",
            "direccion": "",
        })
    }


    const dataNoaplicaVecino = {
        numero_radicacion: numeroDeradicacion,
        nombre: "No Aplica",
        direccion: "Aplica",
        barrio: "No Aplica",
        descripcion_tramite: "No Aplica",
        id_vecinos: globalIdVecinos.id_vecinos
      }

    async function vecinoColindanteNoAplica(){
        await fetchPostCrearVecinos(dataNoaplicaVecino)
        setErrorVecinosVacios(false);
        fetchListadoVecinosNumeroRadicacion(numeroDeradicacion);
    }

    


    function handlePredio({ target }){
        const { name, value } = target;
        setPredio({
            ...predio,
            [name]: value
        })
    }

    const [errorArea, setErrorArea] = useState(false);

    function handlePredioArea({ target }){
        const { name, value } = target;
        
        // Validate if input contains invalid characters
        if(/[^\d.]/.test(value)) {
            // If invalid characters found, don't update state
            setErrorArea(true);
            return;
        }

        // Only allow numbers
        let numericValue = value.replace(/[^\d]/g, '');
        
        // Add thousands separators
        numericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        setErrorArea(false);

        setPredio({
            ...predio,
            [name]: Number(numericValue.replace(/\./g, ''))
        })
    }

    console.log(predio)

    useEffect(() => {
            setPredio({
                ...predio,
                numero_radicacion: numeroDeradicacion,
                barrio: valorDropdown
            })
        }
        ,[numeroDeradicacion, valorDropdown]);

    console.log(predio)
    function crearNuevoPredio(){
        if(listadoVecinos.length != 0){
        console.log(predio)
        fetchPostCrearPredio(predio);
        console.log('predio creado')
        navigateToInformacionPredio()
        }else {
            setErrorVecinosVacios(true);
            console.log('no se puede crear el predio porque los vecinos colindantes no han sido creados')
        }
    }
    console.log(predio)
    console.log(globalIdVecinos)
    console.log(numeroDeradicacion)

    const valorInicialPredio = {
        'numero_radicacion': "",
        'direccion_actual': "",  
        'direccion_anterior': null,  
        'matricula_inmobiliaria': "",  
        'numero_catastral': "",  
        'clasificacion_suelo': "",  
        'barrio': "",  
        'comuna': "",  
        'estrato': "",  
        'manzana': "",  
        'planimetria': null,  
        'cual': null,  
        'vereda': null,  
        'sector': null,  
        'corregimiento': null,  
        'lote': null, 
        'area': null,
    }

    const [step, setStep] = useState(1);

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

    const handleaddvecinoColindateandCloserModal = () => {
        crearNuevoVecinoColindante();
        setAgregarVecinoColindante(false);
        setVecinosColindantes({
            "numero_radicacion": numeroDeradicacion,
            "nombre": "",
            "direccion": "",   
            "descripcion_tramite": objetoInformacionRadicacion.descripcion_tramite,
            "id_vecinos": globalIdVecinos.id_vecinos
        })

    }


    useEffect(() => {
        return () => {
            setPredio(valorInicialPredio)
            setVecinosColindantes({
                ...vecinosColindantes,
                "nombre": "",
                "direccion": "",
            })
            setStep(1);
            setProgressiveStepStatus((prev) => ({
                ...prev,
                step2: false,
                step3: false,
                step4: false,
            }));
        }
    }, [])
    
    const { handlefnmenu } = useLeaveTask()

    return (
        <PrincipalPage firstpathnameNavigate={navigateToPredioPorNumeroRadicacion} firstpathname={'Predios'} pathActive={'Agregar Predio'} handlefnmenu={handlefnmenu}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroDeradicacion} />
            </NumeroRadicacionFechaNR>
            <ProgressiveStepAgregarPredio />
            {step === 1 && 
                <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfo> 
                            <TitleSectionInfo text='Dirección o Nomenclatura' />
                            <Input
                                textlabel='Dirección Actual *'
                                name='direccion_actual'
                                value={predio.direccion_actual || ''}
                                onChange={handlePredio}
                                maxLength={540}
                            />
                            <Input
                                textlabel='Dirección Anterior *'
                                name='direccion_anterior'
                                value={predio.direccion_anterior || ''}
                                onChange={handlePredio}
                                maxLength={540}
                            />
                            
                        </BoxContainerInputsByInfo>
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='.' color='transparent' />
                            <Input
                                textlabel='Matrícula Inmobiliaría *'
                                name='matricula_inmobiliaria'
                                value={predio.matricula_inmobiliaria || ''}
                                onChange={handlePredio}
                                maxLength={100}
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                errorMessageTypeCharacter='Solo se aceptan letras y números y guiones'
                            />
                            <Input
                                textlabel='Número Identificación Catastral *'
                                name='numero_catastral'
                                value={predio.numero_catastral || ''}
                                onChange={handlePredio}
                                maxLength={100}
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                errorMessageTypeCharacter='Solo se aceptan letras y números y guiones'
                            />

                            <PickList
                                label='Clasificación del Suelo *'
                                name='clasificacion_suelo'
                                value={predio.clasificacion_suelo || ''}
                                onChange={handlePredio}
                                optionSelected='Seleccione Clasificación del Suelo *'
                                options={[
                                    {
                                        value: 'urbano',
                                        option: 'Urbano'
                                    },
                                    {
                                        value: 'rural',
                                        option: 'Rural'
                                    },
                                    {
                                        value: 'de expancion',
                                        option: 'De Expansión'
                                    }
                                ]}
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
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='Información General' />
                            <DropdownSearch label='Barrio o Urbanización *' />
                            <PickList 
                                label='Comuna *'
                                name='comuna'
                                value={predio.comuna || ''}
                                onChange={handlePredio}
                                optionSelected='Seleccione una Comuna'
                                options={[
                                    {
                                        value: 'comuna 1',
                                        option: 'Comuna 1'
                                    },
                                    {
                                        value: 'comuna 2',
                                        option: 'Comuna 2'
                                    },
                                    {
                                        value: 'comuna 3',
                                        option: 'Comuna 3'
                                    },
                                    {
                                        value: 'comuna 4',
                                        option: 'Comuna 4'
                                    },
                                    
                                ]}
                            />
                        </BoxContainerInputsByInfo>
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='.' color='transparent' />
                            <PickList 
                                label='Estrato *'
                                name='estrato'
                                value={predio.estrato || ''}
                                onChange={handlePredio}
                                optionSelected='Seleccione un Estrato'
                                options={[
                                    {
                                        value: '1',
                                        option: 'Estrato 1'
                                    },
                                    {
                                        value: '2',
                                        option: 'Estrato 2'
                                    },
                                    {
                                        value: '3',
                                        option: 'Estrato 3'
                                    },
                                    {
                                        value: '4',
                                        option: 'Estrato 4'
                                    },
                                    {
                                        value: '5',
                                        option: 'Estrato 5'
                                    },
                                    {
                                        value: '6',
                                        option: 'Estrato 6'
                                    }
                                ]}
                            />
                            <Input
                                textlabel='Manzana No. *'
                                name='manzana'
                                value={predio.manzana || ''}
                                onChange={handlePredio}
                                maxLength={100}
                                regexOptions={/^[0-9a-zA-Z-]+$/}
                                errorMessageTypeCharacter='Solo se aceptan letras y números y guiones'
                            />
                            
                        </BoxContainerInputsByInfo>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepOne} />
                        <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepTwo} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
            }
            {step === 3 && (
                <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfo> 
                            <TitleSectionInfo text='Planimetría del Lote' />
                            <PickList
                                label='Planimetría del Lote *'
                                name='planimetria'
                                value={predio.planimetria || ''}
                                onChange={handlePredio}
                                optionSelected='Seleccione Planimetría del Lote *'
                                options={[
                                    {
                                        value: 'plano del loteo',
                                        option: 'Plano del Loteo'
                                    },
                                    {
                                        value: 'plano topografico',
                                        option: 'Plano Topográfico'
                                    },
                                    {
                                        value: 'otro',
                                        option: 'Otro'
                                    }
                                ]}
                            />
                            <Input
                                textlabel='Cuál'
                                name='cual'
                                value={predio.cual || ''}
                                onChange={handlePredio}
                                maxLength={120}
                            />
                            <Input
                                textlabel='Vereda'
                                name='vereda'
                                value={predio.vereda || ''}
                                onChange={handlePredio}
                                maxLength={120}
                            />
                        </BoxContainerInputsByInfo>
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='.' color='transparent' />
                            <Input
                                textlabel='Sector'
                                name='sector'
                                value={predio.sector || ''}
                                onChange={handlePredio}
                                maxLength={120}
                            />
                            <Input
                                textlabel='Corregimiento'
                                name='corregimiento'
                                value={predio.corregimiento || ''}
                                onChange={handlePredio}
                                maxLength={120}
                            />
                            <Input
                                textlabel='Lote No.'
                                name='lote'
                                value={predio.lote || ''}
                                onChange={handlePredio}
                                maxLength={120}
                            />
                            <Input
                                textlabel='Área (m2) *'
                                name='area'
                                value={predio.area ? predio.area.toLocaleString('es-CO') : ''}
                                onChange={handlePredioArea}
                                maxLength={20}
                            />
                        </BoxContainerInputsByInfo>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepTwo} />
                        <PrimaryButtonNewSmall text='Siguiente' onClick={handleNextStepThree} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
            )}
            {step === 4 && (
                <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfoBig> 
                            <ContainerTitleButtonsAddData>
                            <TitleSectionInfo text='Registro De Vecinos Colindantes' />
                                <ContainerButtonsBackandNextSmall>
                                    <SecondaryButtonNewSmall text='No Aplica' onClick={vecinoColindanteNoAplica} />
                                    <PrimaryButtonNewSmall backgroundColor={'#D7A100'} text='Agregar Vecino' onClick={() => setAgregarVecinoColindante(true)} />
                                </ContainerButtonsBackandNextSmall>

                            </ContainerTitleButtonsAddData>
        
                            <TableColindantes />
                           
                        </BoxContainerInputsByInfoBig>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <SecondaryButtonNewSmall text='Atrás' onClick={handleBackStepThree} />
                        <PrimaryButtonNewSmall text='Crear Nuevo Predio' onClick={crearNuevoPredio} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
            )}
            {
                agregarVecinoColindante && (
                    <Modal>
                        <div className='modal-agregar-vecino-colindante__div'>
                            <div className='modal-agregar-vecino-colindante__div__header'>
                                <TitleSectionInfo text='Agregar Vecino Colindante' />
                                <button onClick={() => setAgregarVecinoColindante(false)} className='modal-agregar-vecino-colindante__div__header__button'>
                                    <XMarkIcon className='modal-agregar-vecino-colindante__div__header__button__icon' />
                                </button>
                            </div>
                            <ContainerRegistroVecinosColindantes>
                                    <Input
                                        textlabel='Nombre Completo *'
                                        name='nombre'
                                        value={vecinosColindantes.nombre || ''}
                                        onChange={handleCreaNuevoVecinosColindante}
                                    />
                                    <DropdownSearch label='Barrio *' />
                                    <Input
                                        textlabel='Dirección *'
                                        name='direccion'
                                        value={vecinosColindantes.direccion || ''}
                                        onChange={handleCreaNuevoVecinosColindante}
                                    />
                                    <Input
                                        textlabel='Tipo de trámite'
                                        name='tipo_tramite'
                                        placeholder={objetoInformacionRadicacion.descripcion_tramite || ''}
                                        disabled
                                    />
                                    <ContainerButtonsBackandNext>
                                        <PrimaryButtonNewSmall text='Agregar Vecino' onClick={handleaddvecinoColindateandCloserModal} />
                                    </ContainerButtonsBackandNext>
                                </ContainerRegistroVecinosColindantes>
                            </div>
                    </Modal>
                )
            }
            
            {step === 5 && (
                <>
            <section className='nuevaradicacion-solicitantes crearnuevasolicitudnr--section'>
                <article className='nuevaradicacion-solicitantes__article'>
                    <div className='nuevaradicacion-solicitantes__article__div'>
                        <h2 className='nuevaradicacion-solicitantes__article__div__h2'>Crear Nuevo Predio</h2>
                    </div>
                </article>
            </section>          

            <section className='agregarnuevopredio-section-numeroradicacion'>
                <article className='agregarnuevopredio-section-numeroradicacion__article'>
                    <h3 className='agregarnuevopredio-section-numeroradicacion__article__h3'>Número Radicación:</h3>
                    <p className='agregarnuevopredio-section-numeroradicacion__article__p'>{numeroDeradicacion}</p>                            
                </article>
            </section>

            <section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                <article className='agregarnuevopredio-section-numeroradicacion-section-direccion__article'>
                    <h2 className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__h2'>Dirección o Nomenclatura</h2>
                    <section className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__section'>
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Dirección Actúal *</label>
                            <input
                                onChange={handlePredio}
                                value={predio.direccion_actual || ''}
                                className='input-base__input' 
                                type="text"
                                name='direccion_actual'
                                maxLength={540}
                            />
                        </div>

                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Dirección Anterior</label>
                            <input
                                onChange={handlePredio}
                                value={predio.direccion_anterior || ''}
                                className='input-base__input' 
                                type="text"
                                name='direccion_anterior'
                                maxLength={540}
                            />
                        </div>

                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Matrícula Inmobiliaría *</label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                                    handlePredio({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            value,
                                            name: 'matricula_inmobiliaria'
                                        }
                                    });
                                }}
                                value={predio.matricula_inmobiliaria || ''}
                                className='input-base__input' 
                                type="text"
                                name='matricula_inmobiliaria'
                                maxLength={100}
                            />
                        </div>

                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Número Identificación Catastral *</label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                                    handlePredio({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            value,
                                            name: 'numero_catastral'
                                        }
                                    });
                                }}
                                value={predio.numero_catastral || ''}
                                className='input-base__input' 
                                type="text"
                                name='numero_catastral'
                                maxLength={100}
                            />
                        </div>

                    </section>
                    

                </article>
            </section>

            <section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                <article className='agregarnuevopredio-section-numeroradicacion-section-direccion__article'>
                    <h2 className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__h2'>Clasificación del Suelo</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Seleccione una Opcion *</label>
                        <div className='div-select-input-icon'>
                            <select 
                                onChange={handlePredio}
                                value={predio.clasificacion_suelo || ''}
                                className='input-base__select' 
                                name='clasificacion_suelo'
                            >
                                <option selected value="">Seleccione Opcion</option>
                                <option value="urbano">Urbano</option>
                                <option value="rural">Rural</option>
                                <option value="de expancion">De Expancion</option>
                            </select>
                            <ChevronDownIcon className='div-select-input-icon__icon' />
                        </div>
                    </div>
                </article>
            </section>

            <section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                <article className='agregarnuevopredio-section-numeroradicacion-section-direccion__article'>
                    <h2 className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__h2'>Información General</h2>
                    <section className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__section'>
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Barrio o Urbanizacion *</label>
                            <DropdownSearch />
                        </div>

                        <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Comuna *</label>
                                <div className='div-select-input-icon'>
                                <select 
                                    onChange={handlePredio}
                                    value={predio.comuna || ''}
                                    className='input-base__select' 
                                    name='comuna'
                                >
                                    <option selected value="">Seleccione una Comuna</option>
                                    <option value="comuna 1">Comuna 1</option>
                                    <option value="comuna 2">Comuna 2</option>
                                    <option value="comuna 3">Comuna 3</option>
                                    <option value="comuna 4">Comuna 4</option>
                                    <option value="comuna 5">Comuna 5</option>
                                    <option value="comuna 6">Comuna 6</option>
                                    <option value="comuna 7">Comuna 7</option>
                                    <option value="comuna 8">Comuna 8</option>
                                    <option value="comuna 9">Comuna 9</option>
                                </select>
                                <ChevronDownIcon className='div-select-input-icon__icon' />
                            </div>
                        </div>
                        
                        {/*<div className='input-base'>
                            <label className='input-base__label' htmlFor="">Estrato</label>
                            <input
                                onChange={handlePredio}
                                value={predio.estrato || ''}
                                className='input-base__input' 
                                type="text"
                                name='estrato'
                            />
                        </div>*/}

                        <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Estrato *</label>
                                <div className='div-select-input-icon'>
                                <select 
                                    onChange={handlePredio}
                                    value={predio.estrato || ''}
                                    className='input-base__select' 
                                    name='estrato'
                                >
                                    <option selected value="">Seleccione un Estrato</option>
                                    <option value="1">Estrato 1</option>
                                    <option value="2">Estrato 2</option>
                                    <option value="3">Estrato 3</option>
                                    <option value="4">Estrato 4</option>
                                    <option value="5">Estrato 5</option>
                                        <option value="6">Estrato 6</option>
                                    </select>
                                    <ChevronDownIcon className='div-select-input-icon__icon' />
                                </div>
                                
                        </div>
                        
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Manzana No. *</label>
                            <input
                                onChange={handlePredio}
                                value={predio.manzana || ''}
                                className='input-base__input' 
                                type="text" 
                                name='manzana'
                                maxLength={120}
                            />
                        </div>
                    </section>
                </article>
            </section>

            <section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                <article className='agregarnuevopredio-section-numeroradicacion-section-direccion__article'>
                    <h2 className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__h2'>Planimetría del Lote</h2>
                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Seleccione Planimetría del Lote *</label>
                        <div className='div-select-input-icon'>
                            <select 
                                onChange={handlePredio}
                                value={predio.planimetria || ''}
                                className='input-base__select' 
                                name='planimetria'
                        >
                            <option selected value="">Seleccione Opcion</option>
                            <option value="plano del loteo">Plano del Loteo</option>
                            <option value="plano topografico">Plano Topográfico</option>
                                <option value="otro">Otro</option>
                            </select>
                            <ChevronDownIcon className='div-select-input-icon__icon' />
                        </div>
                    </div>

                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Cuál</label>
                        <input
                            onChange={handlePredio}
                            value={predio.cual || ''}
                            className='input-base__input' 
                            type="text"
                            name='cual'
                            maxLength={120}
                        />
                    </div>

                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Vereda</label>
                        <input
                            onChange={handlePredio}
                            value={predio.vereda || ''}
                            className='input-base__input' 
                            type="text"
                            name='vereda'
                            maxLength={120}
                        />
                    </div>

                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Sector</label>
                        <input
                            onChange={handlePredio}
                            value={predio.sector || ''}
                            className='input-base__input' 
                            type="text"
                            name='sector'
                            maxLength={120}
                        />
                    </div>

                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Corregimiento</label>
                        <input
                            onChange={handlePredio}
                            value={predio.corregimiento || ''}
                            className='input-base__input' 
                            type="text"
                            name='corregimiento'
                            maxLength={120}
                        />
                    </div>

                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Lote No.</label>
                        <input
                            onChange={handlePredio}
                            value={predio.lote || ''}
                            className='input-base__input' 
                            type="text"
                            name='lote'
                            maxLength={120}
                        />
                    </div>

                    <div className='input-base'>
                        <label className='input-base__label' htmlFor="">Área (m2) *</label>
                        <input
                            onChange={handlePredioArea}
                            value={predio.area ? predio.area.toLocaleString('es-CO') : ''}
                            className='input-base__input' 
                            type="text"
                            name='area'
                            maxLength={20}
                        />
                        {errorArea && <p className='error-p'>Solo se aceptan números</p>}
                    </div>
                </article>
            </section>

            <section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                <article className='agregarnuevopredio-section-numeroradicacion-section-direccion__article'>
                    <h2 className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__h2'>Vecinos Colindantes</h2>
                    <TableColindantes />
                </article> 
            </section>

            <section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                <article className='agregarnuevopredio-section-numeroradicacion-section-direccion__article'>
                    <h2 className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__h2'>Registro De Vecinos Colindantes</h2>
                    <section className='agregarnuevopredio-section-numeroradicacion-section-direccion__article__section'>
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Nombre *</label>
                            <input value={vecinosColindantes.nombre || ''} onChange={handleCreaNuevoVecinosColindante} className='input-base__input' type="text" name='nombre' />
                        </div>
                        
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Barrio *</label>
                            <DropdownSearch />
                        </div>
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Dirección *</label>
                            <input value={vecinosColindantes.direccion || ''} onChange={handleCreaNuevoVecinosColindante} name='direccion' className='input-base__input' type="text" />
                        </div>
                        <div className='input-base'>
                            <label className='input-base__label' htmlFor="">Tipo de trámite</label>
                            <p className='nueva-radicacion-p-basico'>{objetoInformacionRadicacion.descripcion_tramite}</p>
                            {/*<input className='input-base__input' type="text" />*/}
                        </div>
                    </section>
                    
                    <div className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                        <article className='buttons-vecino-colindante'>
                            <PrimaryButton textButton={'Guardar Vecino Colindante'} propFunction={crearNuevoVecinoColindante} />
                            <PrimaryButton textButton={'No Aplica'} propFunction={vecinoColindanteNoAplica} />
                        </article>
                    </div>
                </article> 
            </section>
            </>
            )}

                        {
                            errorVecinosVacios &&
                            <Modal>
                                <BoxAlertNotificationError 
                                    message={`Por favor, cree los vecinos colindantes antes de proceder a crear el predio.`}
                                    onClick={() => {
                                        setErrorVecinosVacios(false);
                                    }}
                                    textButton2={'Aceptar'}
                                />
                            </Modal>
                        }

                        {
                            vecinoColindanteCreado &&
                            <Modal>
                                <BoxAlertNotificationOk 
                                    message={`El vecino colindante fue creado con éxito`}
                                    onClick={() => {
                                        setVecinoColindanteCreado(false);
                                    }}
                                    textButton2={'Aceptar'}
                                />

                            </Modal>
                        }

                        {/*<section className='agregarnuevopredio-section-numeroradicacion-section-direccion'>
                            <div className='button-crear-predio'>
                                <article className='buttons-vecino-colindante'>
                                    <PrimaryButton textButton={'Crear Predio'} propFunction={crearNuevoPredio} />
                                </article>
                            </div>
                        </section>*/}


        </PrincipalPage>
    )
}



export default AgregarNuevoPredio
