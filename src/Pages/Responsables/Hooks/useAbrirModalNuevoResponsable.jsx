import { useContext } from "react";
import { ResponsablesState } from "../ResponsablesContext/ResponsableContext";

export function useAbrirModalNuevoResponsable() {

    const { setAgregarNuevoResponsable } = useContext(ResponsablesState);

    function abrirModalNuevoResponsable() {
        setAgregarNuevoResponsable(true);
    }


    return {
        abrirModalNuevoResponsable,
    }
}