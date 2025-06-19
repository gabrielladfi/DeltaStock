import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate';

export const AdapterVentanilla = (data) => {
    if (!data || data.length === 0) return [
        {
            asunto: "Derecho de petición firmado por un Juez",
            descripcion: "Derecho de petición para prolongar los tiempos de la curaduría para el proceso de licencia de Construcción",
            fecha: "2024-12-11T00:00:00Z",
            id: 1,
            nombre_solicitante: "Nicolas García",
            numero_radicacion: "47001-2-24-0138",
            recibo_salida: "Entrada"
        }
    ];

    return data.map((act) => ({
        id: act.id || 'Sin Registro',
        numeroOficio: act.numero_oficio || 'Sin Registro',
        numeroRadicacion: act.numero_radicacion || 'Sin Registro',
        nombreSolicitante: act.nombre_solicitante || 'Sin Registro',
        asunto: act.asunto || 'Sin Registro',
        descripcion: act.descripcion || 'Sin Registro',
        fecha: formatDateToYYYYMMDD(act.fecha) || 'Sin Registro',
        reciboSalida: act.recibo_salida || 'Sin Registro',
    }));
}   


export const adapterVentanillaPut = (dataPut) => {

    return {
        id: dataPut.id || 'Sin Registro',
        numero_radicacion: dataPut.numeroRadicacion || 'Sin Registro',
        nombre_solicitante: dataPut.nombreSolicitante || 'Sin Registro',
        asunto: dataPut.asunto || 'Sin Registro',
        descripcion: dataPut.descripcion || 'Sin Registro',
        fecha: formatDateToYYYYMMDD(dataPut.fecha) || 'Sin Registro',
        recibo_salida: dataPut.reciboSalida || 'Sin Registro',
    };
}   