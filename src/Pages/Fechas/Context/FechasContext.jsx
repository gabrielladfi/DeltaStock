
import { createContext } from 'react';

const FechasState = createContext();

function FechasProvider({ children }) {
  return (
    <FechasState.Provider value={{}}>
      {children}
    </FechasState.Provider>
  );
}

export { FechasState, FechasProvider };
