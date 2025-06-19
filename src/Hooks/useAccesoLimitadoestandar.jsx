import { getDataUser } from "@/Utils/manejoLocalStorageNumeroRadicacion";
import { useEffect, useState } from "react";
import { useNavigateProvider } from "./useNavigateProvider";

export const useAccesoLimitadoestandar = () => {


    const { navigateToMenu } = useNavigateProvider();

    const [isLoadingEstandar, setIsLoadingEstandar] = useState(true);

        useEffect(() => {
            const userType = getDataUser();  // ✅ Se evalúa dentro del useEffect
    
            if (userType.type === 'estandar') {
                navigateToMenu(); // ✅ Mejor práctica que window.location.href
            } else {
                setIsLoadingEstandar(false); // ✅ Permite que el contenido se renderice correctamente
            }
        }, []);
    
        //if (isLoading) return <div>Cargando...</div>;
    

    return {
        isLoadingEstandar
    };
};
