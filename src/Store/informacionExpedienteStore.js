import { create } from "zustand";

export const informacionExpedienteStore = create((set) =>({
    radicacion : {
        area: '',
        departamento: '',
        descripcion_modalidad: '',
        descripcion_tramite: '',
        dni_solicitante: '',
        email_solicitante: '',
        fecha: '',
        id: '',
        is_cultural: '',
        municipio: '',
        nombre_solicitante: '',
        numero_radicacion: '',
        objeto_tramite: '',
        phone_solicitante: '',
        tipo_vivienda: '',
        usos: ''
    },

    setInformacionRadicacion: (nuevaRadicacion) => set({ radicacion: nuevaRadicacion }),

    updataInformacionRadicacion: (key, value) => set((state) => ({
        radicacion: {
            ...state.radicacion,
            [key]: value
        }
    }))

}))
