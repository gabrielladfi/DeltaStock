import { useContext, useState } from "react";
import { AuthContextState } from "../Context/AuthContextContext";
import { useNavigateProvider } from "./useNavigateProvider";


const useLogin = () => {
    const { dataForm, setDataForm } = useContext(AuthContextState);
    const { navigateToMenu } = useNavigateProvider();
    const [ error, setError ] = useState(false);

    const url = import.meta.env.VITE_URL_DO_LOGIN;

    const saveToken = (newToken, userData) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        // Calcula el tiempo de expiración del token sumando 8 horas (en milisegundos) al tiempo actual
        const expirationTime = Date.now() + (8 * 60 * 60 * 1000); // 8 horas * 60 minutos * 60 segundos * 1000 milisegundos
        localStorage.setItem('tokenExpiration', expirationTime);
    };

    function doLogin() {
        async function encryptPassword() {
            const secretKey = import.meta.env.VITE_SECRET_KEY_LOGIN;
            const iv = crypto.getRandomValues(new Uint8Array(16));
        
            const key = await crypto.subtle.importKey(
                "raw",
                new TextEncoder().encode(secretKey),
                { name: "AES-CBC" },
                false,
                ["encrypt"]
            );
        
            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: "AES-CBC",
                    iv: iv,
                },
                key,
                new TextEncoder().encode(dataForm.password)
            );
        
            const combined = new Uint8Array(iv.byteLength + encryptedData.byteLength);
            combined.set(iv);
            combined.set(new Uint8Array(encryptedData), iv.byteLength);
        
            return btoa(String.fromCharCode(...combined));
        }
        
        encryptPassword(dataForm.password).then((encryptedPassword) => {
            fetch(`${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: dataForm.email,
                    password: encryptedPassword,
                }),
            })
            .then((response) => {
                if (response.status === 403) {
                    setError(true);
                    throw new Error("Invalid credentials");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if(data.access) {
                    saveToken(data.access, data.user_info);
                    navigateToMenu();
                } else {
                    setError(true);
                    console.log('debes iniciar sesion');
                }
            })
            .catch((error) => {
                setError(true);
                console.error("Error:", error);
            });
        });

        setDataForm({
            email: '',
            password: '',
        });
    }

    return {
        doLogin,
        error,
    };
};

export { useLogin };