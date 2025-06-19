/* eslint-disable react/prop-types */

import { createContext } from 'react';

const LoginState = createContext();

function LoginProvider({ children }) {
  return (
    <LoginState.Provider value={{}}>
      {children}
    </LoginState.Provider>
  );
}

export { LoginState, LoginProvider };
