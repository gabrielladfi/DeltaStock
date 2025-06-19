import { useEffect, useState } from "react";
import { useNavigateProvider } from "./useNavigateProvider";


const useVerifyToken = () => {
    const { navigateToLogin } = useNavigateProvider();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    }

    const token = getToken();

    function verifyToken() {
        if (!token) {
            navigateToLogin();
        } else {
            setIsAuthenticated(true);
        }
    }

    useEffect(() => {
        verifyToken();
    }, []);

    return {
        isAuthenticated
    }
}

export default useVerifyToken;