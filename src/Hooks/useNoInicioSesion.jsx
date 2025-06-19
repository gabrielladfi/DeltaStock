import { getDataUser } from "@/Utils/manejoLocalStorageNumeroRadicacion";
import { useEffect, useState } from "react";
import { useNavigateProvider } from "./useNavigateProvider";

export const useNoInicioSesion = () => {


    const { navigateToLogin } = useNavigateProvider();

    const [isLoading, setIsLoading] = useState(true);

    
        useEffect(() => {
            const user = getDataUser();  // ✅ Se evalúa dentro del useEffect
    
            if (!user) {
                alert('⚠️ No se ha iniciado sesión. Redirigiendo...');
                navigateToLogin('/'); // ✅ Mejor práctica que window.location.href
            } else {
                setIsLoading(false); // ✅ Permite que el contenido se renderice correctamente
            }
        }, []);
    
        //if (isLoading) return <div>Cargando...</div>;
    

    return {
        isLoading
    };
};
