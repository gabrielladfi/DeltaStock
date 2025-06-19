import { create } from "zustand";

export const useDataAdministrativeActRowTableStore = create((set) => ({
    act: {},

    setAct: (upDateAct) => set({ act: upDateAct }),

    updateDataAct: (key, value) =>
        set((state) => ({
            act: {
                ...state.act,
                [key]: value
            }
        })),

    // Nueva función para manejar el cambio
    handleChangePutAct: ({ target }) => 
        set((state) => ({
            act: {
                ...state.act,
                [target.name]: target.value
            }
        })),
    
    handlePutDateTransform: ({ target }) =>
        set((state) => ({
            act: {
                ...state.act,
                [target.name]: `${target.value}T00:00:00Z`
            }
        }))
}));