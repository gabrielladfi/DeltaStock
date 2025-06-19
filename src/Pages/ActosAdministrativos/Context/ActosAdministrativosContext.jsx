
import { createContext } from 'react';

const ActosAdministrativosState = createContext();

function ActosAdministrativosProvider({ children }) {
  return (
    <ActosAdministrativosState.Provider value={{}}>
      {children}
    </ActosAdministrativosState.Provider>
  );
}

export { ActosAdministrativosState, ActosAdministrativosProvider };
