import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate';

export const adapterTaxRegistration = (data) => {
    if (!data || data.length === 0) return [
        {
            id: "1",
            tipo: "Impuesto Predio 1",
            base: "200.00",
            valor: "100.00",
            numeroSticker: "000000000",
            fechaPago: "2024-12-11T00:00:00Z",
            fechaPresentacion: "2024-12-11T00:00:00Z",
            anoDeclaracion: "2025",
        }
    ];
    return data.map((tax) => ({
        id: tax.id,
        tipo: tax.tipo || 'Sin Registro',
        base: tax.base || 'Sin Registro',
        valor: tax.valor || 'Sin Registro',
        numeroSticker: tax.numero_sticker || 'Sin Registro',
        //fechaPago: formatDateToYYYYMMDD(tax.fecha_pago) || 'Sin Registro',
        fechaPago: formatDateToYYYYMMDD(tax.fecha_pago) === '1970-01-01' ? 'No Aplica' : formatDateToYYYYMMDD(tax.fecha_pago) || 'Sin Registro',
        //fechaPresentacion: formatDateToYYYYMMDD(tax.fecha_presentacion) || 'Sin Registro',
        fechaPresentacion: formatDateToYYYYMMDD(tax.fecha_presentacion) === '1970-01-01' ? 'No Aplica' : formatDateToYYYYMMDD(tax.fecha_presentacion) || 'Sin Registro',
        anoDeclaracion: tax.ano_declaracion || 'Sin Registro',
    }));
}   
        


