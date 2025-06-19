/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const ResponsablesState = createContext();

function ResponsablesProvider({ children }) {

    const [ agregarNuevoResponsable, setAgregarNuevoResponsable ] = useState(false);
    const [ reload, setReload ] = useState(false);

    

    return (
        <ResponsablesState.Provider value={{
            agregarNuevoResponsable,
            setAgregarNuevoResponsable,
            reload,
            setReload,
        }}>
            {children}
        </ResponsablesState.Provider>
    );
}

export { ResponsablesState, ResponsablesProvider };
