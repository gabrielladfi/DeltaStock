/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const ObservacionesState = createContext();

function ObservacionesProvider({ children }) {

    const [ reload, setReload ] = useState(false); // Estado para recargar la página
    const [ crearNuevaObservacion, setCrearNuevaObservacion ] = useState(false); // Estado para mostrar el formulario de nueva observación
    const [ crearNuevaObservacionJuridica, setCrearNuevaObservacionJuridica ] = useState(false); // Estado para mostrar el formulario de nueva observación jurídica
    const [ crearNuevaObservacionIngenieria, setCrearNuevaObservacionIngenieria ] = useState(false); // Estado para mostrar el formulario de nueva observación de ingeniería
    const [ crearNuevaObservacionArquitectonica, setCrearNuevaObservacionArquitectonica ] = useState(false); // Estado para mostrar el formulario de nueva observación arquitectónica
    const [ valorFiltro, setValorFiltro ] = useState('ver todo');
    const [ verEncargados, setVerEncargados ] = useState(false); // Estado para mostrar el formulario de encargados
    const [ firmarObservaciones, setFirmarObservaciones ] = useState(false); // Estado para mostrar el formulario de firmar observaciones


    const handleCrearNuevaObservacion = () => { setCrearNuevaObservacion(true) }; // Función para mostrar el formulario de nueva observación
    const handleCrearNuevaObservacionJuridica = () => { setCrearNuevaObservacionJuridica(true) }; // Función para mostrar el formulario de nueva observación jurídica
    const handleCrearNuevaObservacionIngenieria = () => { setCrearNuevaObservacionIngenieria(true) }; // Función para mostrar el formulario de nueva observación de ingeniería
    const handleCrearNuevaObservacionArquitectonica = () => { setCrearNuevaObservacionArquitectonica(true) }; // Función para mostrar el formulario de nueva observación arquitectónica
    const handleCloseFormularioNuevaObservacion = () => { setCrearNuevaObservacion(false) }; // Función para cerrar el formulario de nueva observación
    const handleCloseFormularioNuevaObservacionJuridica = () => { setCrearNuevaObservacionJuridica(false) }; // Función para cerrar el formulario de nueva observación jurídica
    const handleCloseFormularioNuevaObservacionIngenieria = () => { setCrearNuevaObservacionIngenieria(false) }; // Función para cerrar el formulario de nueva observación de ingeniería
    const handleCloseFormularioNuevaObservacionArquitectonica = () => { setCrearNuevaObservacionArquitectonica(false) }; // Función para cerrar el formulario de nueva observación arquitectónica
    const handleVerEncargados = () => { setVerEncargados(true) }; // Función para mostrar el formulario de encargados
    const handleOcultarEncargados = () => { setVerEncargados(false) }; // Función para ocultar el formulario de encargados

    return (
        <ObservacionesState.Provider value={{
            reload,
            setReload,
            crearNuevaObservacion,
            handleCrearNuevaObservacion,
            handleCloseFormularioNuevaObservacion,
            crearNuevaObservacionJuridica,
            setCrearNuevaObservacionJuridica,
            crearNuevaObservacionIngenieria,
            setCrearNuevaObservacionIngenieria,
            crearNuevaObservacionArquitectonica,
            setCrearNuevaObservacionArquitectonica,
            handleCrearNuevaObservacionJuridica,
            handleCloseFormularioNuevaObservacionJuridica,
            handleCrearNuevaObservacionIngenieria,
            handleCloseFormularioNuevaObservacionIngenieria,
            handleCrearNuevaObservacionArquitectonica,
            handleCloseFormularioNuevaObservacionArquitectonica,
            valorFiltro,
            setValorFiltro,
            verEncargados,
            handleVerEncargados,
            handleOcultarEncargados,
            firmarObservaciones,
            setFirmarObservaciones,
        }}>
            {children}
        </ObservacionesState.Provider>
    );
}

export { ObservacionesState, ObservacionesProvider };
