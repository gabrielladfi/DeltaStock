/* eslint-disable react/prop-types */

import { createContext } from 'react';

const AgregarNuevoPredioState = createContext();

function AgregarNuevoPredioProvider({ children }) {
  return (
    <AgregarNuevoPredioState.Provider value={{}}>
      {children}
    </AgregarNuevoPredioState.Provider>
  );
}

export { AgregarNuevoPredioState, AgregarNuevoPredioProvider };
