import { useContext } from "react";
import { ResponsablesState } from "../ResponsablesContext/ResponsableContext";

export function useCerraModalNuevoResponsables() {

    const { setAgregarNuevoResponsable } = useContext(ResponsablesState);

    function cerrarModalNuevoResponsable() {
        setAgregarNuevoResponsable(false);
    }

    return{
        cerrarModalNuevoResponsable,
    }
}