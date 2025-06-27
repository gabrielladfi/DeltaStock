export const adapterStockItems = (data) => {
    return data ? data.map(item => ({
        ...item,
        pieza: item.pieza || '',
        ipn: item.ipn || '',
        revision: item.revision || '',
        descripcion: item.descripcion || '',
        existencias: item.existencias || '',
        estado: item.estado || '',
        codigoLote: item.codigoLote || '',
        ubicacion: item.ubicacion || '',
        ordenCompra: item.ordenCompra || '',
        piezaProveedor: item.piezaProveedor || '',
        um: item.um || '',
        min: item.min || '',
        max: item.max || '',
        valorPromedio: item.valorPromedio || '',
        valorTotal: item.valorTotal || ''
    })) : []
}

export const adapterStockItemsAddandPut = (data) => {
    return data ? data.map(item => ({
        ...item,
        pieza: item.pieza || '',
        ipn: item.ipn || '',
        revision: item.revision || '',
        descripcion: item.descripcion || '',
        existencias: item.existencias || '',
        estado: item.estado || '',
        codigoLote: item.codigoLote || '',
        ubicacion: item.ubicacion || '',
        ordenCompra: item.ordenCompra || '',
        piezaProveedor: item.piezaProveedor || '',
        um: item.um || '',
        min: item.min || '',
        max: item.max || '',
        valorPromedio: item.valorPromedio || '',
        valorTotal: item.valorTotal || ''
    })) : []
}