import { create } from "zustand";

export const useDataVentanillaRowTableStore = create((set) => ({
    oficio: {},

    setoficio: (upDateoficio) => set({ oficio: upDateoficio }),

    updateDataoficio: (key, value) =>
        set((state) => ({
            oficio: {
                ...state.oficio,
                [key]: value
            }
        })),

    // Nueva función para manejar el cambio
    handleChangePutoficio: ({ target }) => 
        set((state) => ({
            oficio: {
                ...state.oficio,
                [target.name]: target.value
            }
        })),
    
    handlePutDateTransform: ({ target }) =>
        set((state) => ({
            oficio: {
                ...state.oficio,
                [target.name]: `${target.value}T00:00:00Z`
            }
        }))
}));