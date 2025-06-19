import { create } from "zustand";
import { dataTodasLasFirmasObservaciones } from "@/Utils/dataObjetoFirmas"; // Ruta de tus datos que contienen las firmas

// Crear un store para manejar las firmas de las observaciones
export const useDataObservacionesFirmas = create((set) => ({
    firmas: [], // Estado inicial vacío
    // Función para agregar firmas al estado
    setFirmas: (valueFirma) => {
        // Buscar la firma seleccionada en el array de firmas
        const firmaSeleccionada = dataTodasLasFirmasObservaciones.find(firma => firma.value === String(valueFirma)) || {};

        // Actualizar el estado
        set((state) => {
            // Verificar si el objeto ya existe en el array
            const existe = state.firmas.some(firma => firma.value === firmaSeleccionada.value);
            if (!existe) {
                return {
                    firmas: [...state.firmas, firmaSeleccionada]
                };
            }else {
                alert('❗ La firma seleccionada ya existe, no Puede repetir la misma firma.');
                return state;
            }
        });
    },
    // Función para eliminar firmas del estado
    resetFirmas: () => set({ firmas: [] }) // Función para resetear el estado
}));