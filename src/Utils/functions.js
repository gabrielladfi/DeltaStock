// utils/downloadFile.ts
export function downloadFileFromPath(filePath) {
    if (!filePath) {
        console.warn("⚠️ No se proporcionó una ruta de archivo válida.");
        return;
    }

    const url = `https://apiv1.deltapro.com.co/deltacu/docs?filename=${filePath}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export function formatNumber(number) {
    // Redondear hacia abajo usando Math.floor
    const roundedNumber = Math.floor(number);
    
    return roundedNumber.toLocaleString('es-CO', {
        style: 'currency',     // Indica que se formateará como moneda
        currency: 'COP',       // Especifica el tipo de moneda (Peso Colombiano)
        minimumFractionDigits: 0,  // No muestra decimales mínimos
        maximumFractionDigits: 0   // No muestra decimales máximos
    });
}
