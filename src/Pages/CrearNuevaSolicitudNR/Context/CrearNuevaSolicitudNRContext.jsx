/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const CrearNuevaSolicitudNRState = createContext();

function CrearNuevaSolicitudNRProvider({ children }) {

  const [ reload, setReload ] = useState(false);

  return (
    <CrearNuevaSolicitudNRState.Provider value={{
      reload,
      setReload,
    }}>
      {children}
    </CrearNuevaSolicitudNRState.Provider>
  );
}

export { CrearNuevaSolicitudNRState, CrearNuevaSolicitudNRProvider };
