import { useContext } from "react";
import { OficiosState } from "../Context/OficiosContext";

export function useCerrarModalNuevoOficio() {

    const { setAgregarNuevoOficio } = useContext(OficiosState);

    const cerrarModalNuevoOficio = () => {
        setAgregarNuevoOficio(false)
    }

    return { 
        cerrarModalNuevoOficio 
    }
}