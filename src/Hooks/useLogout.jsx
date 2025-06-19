import { useNavigateProvider } from "./useNavigateProvider";


const useLogout = () => {
    
    const { navigateToLogin } = useNavigateProvider();

    const doLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('tokenExpiration');
        navigateToLogin();
    };

    return { doLogout }; 
}

export default useLogout;