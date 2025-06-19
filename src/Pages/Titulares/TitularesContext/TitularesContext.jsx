/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const TitularesState = createContext();

function TitularesProvider({ children }) {

    const [ agregarNuevoTitular, setAgregarNuevoTitular ] = useState(false);
    const [ reload, setReload ] = useState(false);

    

    return (
        <TitularesState.Provider value={{
            agregarNuevoTitular,
            setAgregarNuevoTitular,
            reload,
            setReload,
        }}>
            {children}
        </TitularesState.Provider>
    );
}

export { TitularesState, TitularesProvider };
