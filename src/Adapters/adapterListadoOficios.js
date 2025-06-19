import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate';

export const adapterListadoOficios = (data) => {
    if (!data || data.length === 0) return [
        {
            asunto: "Planos del Proyecto",
            descripcion: "Derecho de petición para prolongar los tiempos de la curaduría para el proceso de licencia de Construcción",
            fecha: "2024-12-11T00:00:00Z",
            id: 3,
            nombreSolicitante: "Nicolas García",
            numeroOficio: '44',
            numeroRadicacion: "47001-2-24-0139",
            reciboSalida: "Entrada"
        }
    ];

    return data.map((oficio) => ({
        asunto: oficio.asunto || 'Sin Registro',
        descripcion: oficio.descripcion || 'Sin Registro',
        fecha: formatDateToYYYYMMDD(oficio.fecha) || 'Sin Registro',
        id: oficio.id || 'Sin Registro',
        nombreSolicitante: oficio.nombre_solicitante || 'Sin Registro',
        numeroOficio: oficio.numero_oficio || 'Sin Registro',
        numeroRadicacion: oficio.numero_radicacion || 'Sin Registro',
        reciboSalida: oficio.recibo_salida || 'Sin Registro',
    }));
}   
