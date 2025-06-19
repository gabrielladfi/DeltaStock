/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const PredioState = createContext();

function PredioProvider({ children }) {

  const [ agregarNuevoPredio, setAgregarNuevoPredio ] = useState(false);

  return (
    <PredioState.Provider value={{
      setAgregarNuevoPredio,
      agregarNuevoPredio
    }}>
      {children}
    </PredioState.Provider>
  );
}

export { PredioState, PredioProvider };
