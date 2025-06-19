/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { getNumeroRadicacion } from '../../../Utils/manejoLocalStorageNumeroRadicacion';
import { AuthContextState } from '../../../Context/AuthContextContext';
import { useFetchGet } from '../../../Hooks/useFetchGet';
import { urlBase, urlObtenerlistadoHistorial } from '../../../Utils/UrlData';

const HistoriasState = createContext();

function HistoriasProvider({ children }) {

    const numeroRadicacion = getNumeroRadicacion();
    const { token } = useContext(AuthContextState);

    const { dataGet, refetchGet } = useFetchGet(token, `${urlBase}${urlObtenerlistadoHistorial}`, numeroRadicacion);

    const [ dataHistoriaSeleccionadaParaEditar, setDataHistoriaSeleccionadaParaEditar ] = useState(null); // Estado para almacenar la observación seleccionada para editar
    const [ crearNuevaHistoria, setCrearNuevaHistoria ] = useState(false); // Estado para mostrar el formulario de nueva observación
    const [ actualizarHistoria, setActualizarHistoria ] = useState(false); // Estado para mostrar el formulario de actualizar historial
    const [ actualizarNota, setActualizarNota ] = useState(false); // Estado para mostrar el formulario de actualizar nota
    const [selectedRow, setSelectedRow] = useState(null);
    const [ verEncargados, setVerEncargados ] = useState(false); // Estado para mostrar el formulario de encargados
    const [ fechaFiltro, setFechaFiltro ] = useState('')
    const [ dataFiltrada, setDataFiltrada ] = useState([])

    const handleCrearNuevaHistoria = () => { setCrearNuevaHistoria(true) }; // Función para mostrar el formulario de nueva observación
    const handleCloseFormularioNuevaHistoria = () => { setCrearNuevaHistoria(false) }; // Función para cerrar el formulario de nueva observación

    const handleActualizarHistoria = () => { 
        if(dataHistoriaSeleccionadaParaEditar === null) {
            alert('Por favor seleccione una historia para actualizar');
        }else{
            setActualizarHistoria(true);
        }
    }; 

    // Función para mostrar el formulario de actualizar historia
    const handleCloseFormularioActualizarHistoria = () => {
        setActualizarHistoria(false);
    }; // Función para cerrar el formulario de actualizar historial

    const handleActualizarNota = () => {
        if(dataHistoriaSeleccionadaParaEditar === null) {
            alert('Por favor seleccione una historia para actualizar');
        }else{
            setActualizarNota(true);
        }
    }

    const handleCloseFormularioActualizarNota = () => {
        setActualizarNota(false);
    }

    const handleVerEncargados = () => { setVerEncargados(true) }; // Función para mostrar el formulario de encargados
    const handleOcultarEncargados = () => { setVerEncargados(false) }; // Función para ocultar el formulario de encargados


    const [ historySelected, setHistorySelected ] = useState(null);
    const [ verMas, setVerMas ] = useState(false);

    console.log(dataHistoriaSeleccionadaParaEditar)

    return (
        <HistoriasState.Provider value={{
            dataGet,
            refetchGet,
            crearNuevaHistoria,
            handleCrearNuevaHistoria,
            handleCloseFormularioNuevaHistoria,
            setDataHistoriaSeleccionadaParaEditar,
            dataHistoriaSeleccionadaParaEditar,
            actualizarHistoria,
            setActualizarHistoria,
            handleActualizarHistoria,
            handleCloseFormularioActualizarHistoria,
            selectedRow,
            setSelectedRow,
            actualizarNota,
            handleActualizarNota,
            handleCloseFormularioActualizarNota,
            setCrearNuevaHistoria,
            verEncargados,
            handleVerEncargados,
            handleOcultarEncargados,
            fechaFiltro,
            setFechaFiltro,
            dataFiltrada,
            setDataFiltrada,
            historySelected,
            setHistorySelected,
            verMas,
            setVerMas
        }}>
            {children}
        </HistoriasState.Provider>
    );
}

export { HistoriasState, HistoriasProvider };
