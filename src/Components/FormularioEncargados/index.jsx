import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion';
import './formularioencargados.scss'
import { urlBase, urlObtenerLosEncargados, urlActualizarEncargados } from '../../Utils/UrlData';
import { handleInputChangeValidator } from '../../Utils/handleInputs';
import PrimaryButton from '../PrimaryButton';
import { useFetchGet } from '../../Hooks/useFetchGet';
import { AuthContextState } from '../../Context/AuthContextContext';
import { useFetchPut } from '../../Hooks/useFetchPut';
import { adaptadorEncargados } from '../../Adapters/adaptersFetch';
import { encargadosCuraduriaData, encargadosCuraduriaDataNew } from '../../Utils/encargadosCuraduriaData';
import { GlobalState } from '../../Context/GlobalContext';
import ModalBasicNew from '../Molecules/ModalBasicNew';
import PrimaryButtonNewSmall from '../Atoms/PrimaryButtonNewSmall';
import PickList from '../Molecules/PickList';
import Modal from '../Modal';
import BoxAlertNotificationOk from '../Molecules/BoxAlertNotificationOk';


FormularioEncargados.propTypes = {
    propfunctionCloseModal: PropTypes.func.isRequired
}

function FormularioEncargados({ propfunctionCloseModal }) {

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);
    const { setActualizacionEncargados, setIniciandoProceso } = useContext(GlobalState);
    
    const { dataGet, refetchGet } = useFetchGet( token, `${urlBase}${urlObtenerLosEncargados}`, numeroRadicacion);
    
    const id = dataGet && dataGet[0] ? dataGet[0].id : null;

    console.log('dataGet', dataGet);

    const initialValues = {
        numero_radicacion: numeroRadicacion,
        arquitecto: null,
        ingenieria: null,
        geotecnista: null,
        abogado: null,
        curadora: null,
        sustituto: null
    }

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

    console.log('encargados', encargados);

    return (
        <ModalBasicNew title='Encargados Curaduria' propFunctionCloseModal={propfunctionCloseModal} > 
            <div className='formularioencargados__container'>
            <PickList 
                label='Arquitecto'
                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                value={encargados && encargados.arquitecto !== null ? encargados.arquitecto || '' : 'Asignar Encargado' }
                name='arquitecto'
                options={encargadosCuraduriaDataNew}
                optionSelected='Asignar Arquitecto'
            />
            
            {/*<div className='input-base'>
                <label className='input-base__label' htmlFor="">Arquitecto</label>
                <select 
                    onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                    //onChange={(e) => handleInputChange(e, setEncargados, encargados)}
                    value={encargados && encargados.arquitecto !== null ? encargados.arquitecto || '' : 'Asignar Encargado' }
                    className='input-base__select' 
                    name='arquitecto'
                >
                    {
                        encargadosCuraduriaData.map((encargado) => {
                            return (
                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>*/}
            <PickList
                label='Ingeniería'
                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                value={encargados && encargados.ingenieria !== null ? encargados.ingenieria || '' : 'Asignar Encargado' }
                name='ingenieria'
                options={encargadosCuraduriaDataNew}
                optionSelected='Asignar Ingeniería'
            />

            {/*<div className='input-base'>
                <label className='input-base__label' htmlFor="">Ingeniería</label>
                <select 
                    onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                    //onChange={(e) => handleInputChange(e, setEncargados, encargados)}
                    value={encargados && encargados.ingenieria !== null ? encargados.ingenieria || '' : 'Asignar Encargado' }
                    className='input-base__select' 
                    name='ingenieria'
                >
                    {
                        encargadosCuraduriaData.map((encargado) => {
                            return (
                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>*/}

            <PickList
                label='Geotecnista'
                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                value={encargados && encargados.geotecnista !== null ? encargados.geotecnista || '' : 'Asignar Encargado' }
                name='geotecnista'
                options={encargadosCuraduriaDataNew}
                optionSelected='Asignar Geotecnista'
            />

            {/*<div className='input-base'>
                <label className='input-base__label' htmlFor="">Geotecnista</label>
                <select 
                    onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                    //onChange={(e) => handleInputChange(e, setEncargados, encargados)}
                    value={encargados && encargados.geotecnista !== null ? encargados.geotecnista || '' : 'Asignar Encargado'}
                    className='input-base__select' 
                    name='geotecnista'
                >
                    {
                        encargadosCuraduriaData.map((encargado) => {
                            return (
                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>*/}

            <PickList
                label='Abogado'
                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                value={encargados && encargados.abogado !== null ? encargados.abogado || '' : 'Asignar Encargado' }
                name='abogado'
                options={encargadosCuraduriaDataNew}
                optionSelected='Asignar Abogado'
            />

            {/*<div className='input-base'>
                <label className='input-base__label' htmlFor="">Abogado</label>
                <select 
                    onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                    //onChange={(e) => handleInputChange(e, setEncargados, encargados)}
                    value={encargados && encargados.abogado !== null ? encargados.abogado || '' : 'Asignar Encargado'}
                    className='input-base__select' 
                    name='abogado'
                >
                    {
                        encargadosCuraduriaData.map((encargado) => {
                            return (
                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>*/}

            <PickList
                label='Curadora'
                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                value={encargados && encargados.curadora !== null ? encargados.curadora || '' : 'Asignar Encargado' }
                name='curadora'
                options={encargadosCuraduriaDataNew}
                optionSelected='Asignar Curadora'
            />

            {/*<div className='cambioencargados__curadora--button-div'>
                <div className='input-base'>
                <label className='input-base__label' htmlFor="">Curadora</label>
                <select
                    onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                    //onChange={(e) => handleInputChange(e, setEncargados, encargados)}
                    value={encargados && encargados.curadora !== null ? encargados.curadora || '' : 'Asignar Encargado'} 
                    className='input-base__select' 
                    name='curadora'
                >
                    {
                        encargadosCuraduriaData.map((encargado) => {
                            return (
                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                            )
                        })
                    }
                </select>

                </div>
                
            </div>*/}

            <PickList
                label='Sustituto'
                onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                value={encargados && encargados.sustituto !== null ? encargados.sustituto || '' : 'Asignar Encargado' }
                name='sustituto'
                options={encargadosCuraduriaDataNew}
                optionSelected='Asignar Sustituto'
            />

            {/*<div className='cambioencargados__curadora--button-div'>
                <div className='input-base'>
                <label className='input-base__label' htmlFor="">Sustituto</label>
                <select
                    onChange={(e) => handleInputChangeValidator(e, setEncargados, encargados, setActualizacionEncargados)}
                    //onChange={(e) => handleInputChange(e, setEncargados, encargados)}
                    value={encargados && encargados.sustituto !== null ? encargados.sustituto || '' : 'Asignar Encargado'} 
                    className='input-base__select' 
                    name='sustituto'
                >
                    {
                        encargadosCuraduriaData.map((encargado) => {
                            return (
                                <option key={encargado.id} value={encargado.nombre}>{encargado.nombre}</option>
                            )
                        })
                    }
                </select>

                </div>
                
            </div>*/}

            </div>
            

            <PrimaryButtonNewSmall text='Guardar' onClick={handleFetchPut} />
            
            {
                actualizacionEncargadosok &&
                <Modal>
                    <BoxAlertNotificationOk 
                        message='Los encargados se han actualizado con exito'
                        onClick={propfunctionCloseModal}
                        textButton2='Cerrar'
                    />
                </Modal>
            }

        </ModalBasicNew>
        
    )
}

export default FormularioEncargados
