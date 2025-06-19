/* eslint-disable react/prop-types */

import { createContext, useState } from 'react';

const OficiosState = createContext();

function OficiosProvider({ children }) {

  const [ agregarNuevoOficio, setAgregarNuevoOficio ] = useState(false);

  return (
    <OficiosState.Provider value={{
      agregarNuevoOficio,
      setAgregarNuevoOficio
    }}>
      {children}
    </OficiosState.Provider>
  );
}

export { OficiosState, OficiosProvider };
