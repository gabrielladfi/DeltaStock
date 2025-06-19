export const dataCargoFijo = [
    {id: 0, estrato: '1', valorSinIva: '159.018', iva: '30.213', total: '189.321'},
    {id: 1, estrato: '2', valorSinIva: '159.018', iva: '30.213', total: '189.321'},
    {id: 2, estrato: '3', valorSinIva: '477.054', iva: '90.639', total: '567.693'},
    {id: 3, estrato: '4', valorSinIva: '636.072', iva: '120.852', total: '756.924'},
    {id: 4, estrato: '5', valorSinIva: '795.090', iva: '150.065', total: '945.155'},
    {id: 5, estrato: '6', valorSinIva: '954.108', iva: '180.278', total: '1.134.386'},
];

export const adaptadorDataCargoFijo = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
        id: item.id,
        columnOne: item.estrato,
        columnTwo: item.valorSinIva,
        columnThree: item.iva,
        columnFour: item.total
    }));
};



