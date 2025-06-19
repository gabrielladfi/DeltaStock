/* eslint-disable react/prop-types */

import { createContext } from 'react';

const InformacionPredioState = createContext();

function InformacionPredioProvider({ children }) {
  return (
    <InformacionPredioState.Provider value={{}}>
      {children}
    </InformacionPredioState.Provider>
  );
}

export { InformacionPredioState, InformacionPredioProvider };
