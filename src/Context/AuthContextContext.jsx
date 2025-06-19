/* eslint-disable react/prop-types */

import { createContext, useState } from 'react';

const AuthContextState = createContext();

function AuthContextProvider({ children }) {

    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    });

    const [token, setToken] = useState('');

    return (
        <AuthContextState.Provider value={{
            token,
            dataForm,
            setDataForm,
            setToken,
        }}>
            {children}
        </AuthContextState.Provider>
    );
}

export { AuthContextState, AuthContextProvider };

