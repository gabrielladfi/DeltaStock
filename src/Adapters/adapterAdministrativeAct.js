import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate';

export const adapterAdministrativeAct = (data) => {
    if (!data || data.length === 0) return [
        {
            fechaEdicto: "2024-12-11T00:00:00Z",
            fechaEjecucion: "2024-12-11T00:00:00Z",
            fechaExpedicion: "2024-12-11T00:00:00Z",
            fechaVigencia: null,
            id: 1,
            link: "https://curaduriaurbana2smta.com/",
            numeroActo: "222040-2002-21",
            numeroRadicacion: "47001-2-24-0138",
            razonPublicado: "2024-12-11T00:00:00Z",
            tipoActo: "2024-12-11T00:00:00Z",
            tipoDocumento: "cédula",
            vigencia: "2025"
        }
    ];

    return data.map((act) => ({
        id: act.id || 'Sin Registro',
        numeroActo: act.numero_acto || 'Sin Registro',
        fechaExpedicion: formatDateToYYYYMMDD(act.fecha_expedicion) || 'Sin Registro',
        fechaEjecucion: formatDateToYYYYMMDD(act.fecha_ejecucion) || 'Sin Registro',
        vigencia: act.vigencia || 'Sin Registro',
        fechaVigencia: formatDateToYYYYMMDD(act.fecha_vigencia) || 'Sin Registro',
        tipoActo: act.tipo_acto || 'Sin Registro',
        motivoActoAdministrativo: act.motivo_acto_administrativo || 'Sin Registro',
        razonPublicado: act.razon_publicado || 'Sin Registro',
        fechaEdicto: formatDateToYYYYMMDD(act.fecha_edicto) || 'Sin Registro',
        tipoDocumento: act.tipo_documento || 'Sin Registro',
        linkQR: act.link || 'Sin Registro',
    }));
}   


export const adapterAdministrativeActPut = (dataPut) => {

    return {
        id: dataPut.id || 'Sin Registro',
        numero_acto: dataPut.numeroActo || 'Sin Registro',
        fecha_expedicion: formatDateToYYYYMMDD(dataPut.fechaExpedicion) || 'Sin Registro',
        fecha_ejecucion: formatDateToYYYYMMDD(dataPut.fechaEjecucion) || 'Sin Registro',
        vigencia: dataPut.vigencia || 'Sin Registro',
        fecha_vigencia: formatDateToYYYYMMDD(dataPut.fechaVigencia) || 'Sin Registro',
        tipo_acto: dataPut.tipoActo || 'Sin Registro',
        motivo_acto_administrativo: dataPut.motivoActoAdministrativo || 'Sin Registro',
        razon_publicado: dataPut.razonPublicado || 'Sin Registro',
        fecha_edicto: formatDateToYYYYMMDD(dataPut.fechaEdicto) || 'Sin Registro',
        tipo_documento: dataPut.tipoDocumento || 'Sin Registro',
        link: dataPut.linkQR || 'Sin Registro',
    };
}   
        

