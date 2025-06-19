export const adaptadorEncargados = (data) => {
    if (!data || data.length === 0) return null;

    const encargado = data[0];
    return {
        numero_radicacion: encargado.numero_radicacion || '',
        arquitecto: encargado.arquitecto || '',
        ingenieria: encargado.ingenieria || '',
        geotecnista: encargado.geotecnista || '',
        abogado: encargado.abogado || '',
        curadora: encargado.curadora || '',
        sustituto: encargado.sustituto || ''
    };
};

export const adaptadorProcedenteArquitectonico = (data) => {
    if (!data || data.length === 0) return null;

    const procedente = data[0];
    return {
        id: procedente.id,
        numero_radicacion: procedente.numero_radicacion,
        modelo_texto: procedente. modelo_texto,
        concepto_arquitectonico: procedente.concepto_arquitectonico,
        adicional: procedente.adicional,
        descripcion_resuelve: procedente.descripcion_resuelve,
        precisiones: procedente.precisiones,
    };
};

export const adaptadorProcedenteIngenieria = (data) => {
    if (!data || data.length === 0) return null;

        const procedente = data[0];
        return {
            amenaza_inundación: procedente.amenaza_inundación,
            amenaza_remocion: procedente.amenaza_remocion,
            an_sismico: procedente.an_sismico,
            concepto_ingenieria: procedente.concepto_ingenieria,
            descripcion_inundacion: procedente.descripcion_inundacion,
            descripcion_mzonificacion: procedente.descripcion_mzonificacion,
            descripcion_remocion: procedente.descripcion_remocion,
            grupo_desempeño: procedente.grupo_desempeño,
            id: procedente.id,
            metodo: procedente.metodo,
            micro_zonificacion: procedente.micro_zonificacion,
            numero_radicacion: procedente.numero_radicacion,
            sismica: procedente.sismica,
            tipo_estructura: procedente.tipo_estructura,
        };
};

