import { create } from "zustand";
import { dataTodasLasFirmas } from "@/Utils/dataObjetoFirmas"; // Ruta de tus datos

export const useDataFirmas = create((set) => ({
    firma: {}, // Estado inicial vacío

    setFirma: (valueFirma) => {
        const firmaSeleccionada = dataTodasLasFirmas.find(firma => firma.value === String(valueFirma)) || {};
        set({ firma: firmaSeleccionada });
    }
}));
