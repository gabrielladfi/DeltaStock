import { useContext } from "react";
import { OficiosState } from "../Context/OficiosContext";

export function useAbrirModalNuevoOficio() {

    const { setAgregarNuevoOficio } = useContext(OficiosState);

    function abrirModalNuevoOficio() {
        setAgregarNuevoOficio(true);
    }
    return {
        abrirModalNuevoOficio,
    };
}