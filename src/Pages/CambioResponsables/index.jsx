import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { CambioResponsablesProvider } from './Context/CambioResponsablesContext'
import './cambioresponsables.scss'
import { useContext, useEffect, useState } from 'react'
import { useServicesGet } from '../../Hooks/useServicesGet';
import { useServicesPut } from '../../Hooks/useServicesPut'
import { urlActualizarEncargados, urlBase, urlObtenerLosEncargados } from '../../Utils/UrlData'
import FormularioEncargados from '../../Components/FormularioEncargados'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import useLeaveTask from '@/Hooks/useLeaveTask';
import NumeroRadicacionFechaNR from '@/Components/Molecules/NumeroRadicacionFechaNR';
import NumeroRadicacion from '@/Components/Atoms/NumeroRadicacion';
import StepContentNR from '@/Components/Atoms/StepContentNR';
import ContainerInputsNRNew from '@/Components/Atoms/ContainerInputsNRNew';
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import ContainerButtonsBackandNextSmall from '@/Components/Atoms/ContainerButtonsBackandNextSmall';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import PickList from '@/Components/Molecules/PickList';
import { handleInputChangeValidator } from '@/Utils/handleInputs';
import { encargadosCuraduriaDataNew } from '@/Utils/encargadosCuraduriaData';
import { GlobalState } from '@/Context/GlobalContext';
import { useFetchPut } from '@/Hooks/useFetchPut';
import { AuthContextState } from '@/Context/AuthContextContext';
import { useFetchGet } from '@/Hooks/useFetchGet';
import Modal from '@/Components/Modal';
import BoxAlertNotificationOk from '@/Components/Molecules/BoxAlertNotificationOk';
import { adaptadorEncargados } from '@/Adapters/adaptersFetch';

function CambioResponsables() {
    return (
        <CambioResponsablesProvider>
            <CambioResponsablesContent />
        </CambioResponsablesProvider>
    )
}

function CambioResponsablesContent() {

    const { token } = useContext(AuthContextState);

    const numeroRadicacion = getNumeroRadicacion();
    const [ responsablesResFetch, setResponsablesResFetch ] = useState(null);
    //const { fetchGetHook } = useServicesGet();  
    const { fetchPutHook } = useServicesPut();

    const { setActualizacionEncargados, setIniciandoProceso } = useContext(GlobalState);

    {/*async function handleFetchGet() {
        const respuesta = await fetchGetHook(`${urlBase}`, numeroRadicacion)
        try {
            setResponsablesResFetch(respuesta);
            console.log('lista de responsables', respuesta);
        }catch(err) {
            console.error('la respuessta no fue satisfactoria', err);
        }
    }
    */}
    {/*useEffect(() => {
        handleFetchGet();
    }, [numeroRadicacion])*/}
        
        

    const initialValues = {
        arquitecto: responsablesResFetch ? responsablesResFetch.arquitecto : '',
        ingenieria: '',
        geotecnista: '',
        abogado: '',
        curadora: '',
    }

    const [ responsables, setResponsables ] = useState(initialValues);

    {/*async function handleFetchPut() {
        const respuestas = await fetchPutHook(`${urlBase}`, numeroRadicacion , responsables)
        try {
            console.log('Los responsables fueron actualizados con exito', respuestas);
        }catch(err) {
            console.error('La actualizacion de responsables fallo ', err);
        }
    }*/}

    const { dataGet, refetchGet } = useFetchGet( token, `${urlBase}${urlObtenerLosEncargados}`, numeroRadicacion);

    const id = dataGet && dataGet[0] ? dataGet[0].id : null;

    const [ encargados, setEncargados ] = useState(initialValues);

    const { fetchPut, dataPut } = useFetchPut(token, `${urlBase}${urlActualizarEncargados}${id}`, encargados);


    const [ actualizacionEncargadosok, setActualizacionEncargadosOk ] = useState(false);

    function handleFetchPut() {
        fetchPut('', refetchGet)
        console.log('dataPut', dataPut);
        if(dataGet === null){
            alert('Error al actualizar los encargados')
            return;
        }else {
            setActualizacionEncargados(false)
            setIniciandoProceso(false)
            setActualizacionEncargadosOk(true)
        }
        
    }

    useEffect(() => {
        if (dataGet) {
            const encargadosAdaptados = adaptadorEncargados(dataGet);
            setEncargados(encargadosAdaptados);
        }
    }, [dataGet]);

    console.log('dataGet', dataGet);


    const { handlefnmenu } = useLeaveTask()

    return (
        <PrincipalPage pathActive={'Cambio Responsables Curaduria'} handlefnmenu={handlefnmenu}>
            <NumeroRadicacionFechaNR>
                <NumeroRadicacion numeroRadicacion={numeroRadicacion} />
            </NumeroRadicacionFechaNR>
            <div className='div-line'></div>
            <StepContentNR>
                    <ContainerInputsNRNew>
                        <BoxContainerInputsByInfo> 
                            <TitleSectionInfo text='Responsables Curaduria' />
                            <PickList 
                                label='Arquitecto'
                                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                                value={encargados && encargados.arquitecto !== null ? encargados.arquitecto || '' : 'Asignar Encargado' }
                                name='arquitecto'
                                options={encargadosCuraduriaDataNew}
                                optionSelected='Asignar Arquitecto'
                            />
                            <PickList
                                label='Ingeniería'
                                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                                value={encargados && encargados.ingenieria !== null ? encargados.ingenieria || '' : 'Asignar Encargado' }
                                name='ingenieria'
                                options={encargadosCuraduriaDataNew}
                                optionSelected='Asignar Ingeniería'
                            />
                            <PickList
                                label='Geotecnista'
                                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                                value={encargados && encargados.geotecnista !== null ? encargados.geotecnista || '' : 'Asignar Encargado' }
                                name='geotecnista'
                                options={encargadosCuraduriaDataNew}
                                optionSelected='Asignar Geotecnista'
                            />
                            {/*<FormularioEncargados />*/}
                        </BoxContainerInputsByInfo>
                        <BoxContainerInputsByInfo>
                            <TitleSectionInfo text='.' color='transparent' />
                            <PickList
                                label='Abogado'
                                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                                value={encargados && encargados.abogado !== null ? encargados.abogado || '' : 'Asignar Encargado' }
                                name='abogado'
                                options={encargadosCuraduriaDataNew}
                                optionSelected='Asignar Abogado'
                            />

                            <PickList
                                label='Curadora'
                                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                                value={encargados && encargados.curadora !== null ? encargados.curadora || '' : 'Asignar Encargado' }
                                name='curadora'
                                options={encargadosCuraduriaDataNew}
                                optionSelected='Asignar Curadora'
                            />

                            <PickList
                                label='Sustituto'
                                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                                value={encargados && encargados.sustituto !== null ? encargados.sustituto || '' : 'Asignar Encargado' }
                                name='sustituto'
                                options={encargadosCuraduriaDataNew}
                                optionSelected='Asignar Sustituto'
                            />
                        </BoxContainerInputsByInfo>
                    </ContainerInputsNRNew>
                    <ContainerButtonsBackandNextSmall>  
                        <PrimaryButtonNewSmall text='Guardar' onClick={handleFetchPut} />
                    </ContainerButtonsBackandNextSmall>
                </StepContentNR>
                {
                actualizacionEncargadosok &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message='Los encargados se han actualizado con exito'
                        onClick={() => setActualizacionEncargadosOk(false)}
                        textButton2='Cerrar'
                    />
                </Modal>
            }
            
            

        </PrincipalPage>
    )
}

export default CambioResponsables
