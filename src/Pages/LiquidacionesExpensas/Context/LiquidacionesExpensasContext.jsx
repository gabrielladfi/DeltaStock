
import { createContext } from 'react';

const LiquidacionesExpensasState = createContext();

function LiquidacionesExpensasProvider({ children }) {
  return (
    <LiquidacionesExpensasState.Provider value={{}}>
      {children}
    </LiquidacionesExpensasState.Provider>
  );
}

export { LiquidacionesExpensasState, LiquidacionesExpensasProvider };
