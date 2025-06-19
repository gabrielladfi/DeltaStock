/* eslint-disable react/prop-types */

import { createContext } from 'react';

const NuevaRadicacionState = createContext();

function NuevaRadicacionProvider({ children }) {
  return (
    <NuevaRadicacionState.Provider value={{}}>
      {children}
    </NuevaRadicacionState.Provider>
  );
}

export { NuevaRadicacionState, NuevaRadicacionProvider };
