
import { createContext } from 'react';

const CambioResponsablesState = createContext();

function CambioResponsablesProvider({ children }) {
  return (
    <CambioResponsablesState.Provider value={{}}>
      {children}
    </CambioResponsablesState.Provider>
  );
}

export { CambioResponsablesState, CambioResponsablesProvider };
