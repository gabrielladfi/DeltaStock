// Objeto que contiene los requisitos básicos obligatorios para cualquier trámite
export const valorInicualTareasPendientesObjeto = [
    {num: "1", titulo: 'Formulario único nacional'},
    {num: "2", titulo: 'Copia del certificado de libertad y tradición del inmueble'},
    {num: "3", titulo: 'Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal'},
    {num: "4", titulo: 'Copia de la matricula profesional de los profesionales intervinientes'},
    {num: "5", titulo: 'Copia simple de la escritura publica'},
    {num: "6", titulo: 'Copia del recibo del impuesto predial'},
    {num: "7", titulo: 'Poder especial'},
];

// Objeto que contiene los requisitos específicos para trámites de urbanización
export const valorUrbanizacionobjeto = [
    {num: "8", titulo: 'Documentación del proyecto urbanístico'},
    {num: "9", titulo: 'Plano topográfico'},
    {num: "10", titulo: 'Certificación de servicios públicos'},
    {num: "11", titulo: 'Estudio de amenaza y riesgo (Opcional)'},
];

// Objeto que contiene los requisitos específicos para trámites de subdivisión de predios
export const valorSubdivisionobjeto = [
    {num: "12", titulo: 'Plano del levantamiento topográfico firmado por el ingeniero topográfico'},
    {num: "13", titulo: 'Plano con base en el cual se urbanizaron los predios objeto de la solicitud'},
    {num: "14", titulo: 'Plano firmado por un arquitecto con matrícula profesional'},
];

// Objeto que contiene los requisitos específicos para trámites de reconocimiento de edificaciones
export const valorReconocimientoobjeto = [
    {num: "15", titulo: 'Levantamiento arquitectónico firmado'},
    {num: "16", titulo: 'Declaración de antigüedad de la construcción'},
    {num: "17", titulo: 'Peritaje técnico de estabilidad y vulnerabilidad sísmica'},
];

// Objeto que contiene los requisitos específicos para trámites de construcción
export const valorConstruccionobjeto = [
    {num: "18", titulo: 'Planos estructurales'},
    {num: "19", titulo: 'Estudios de suelos'},
    {num: "20", titulo: 'Segunda revisión estructural (para proyectos de mas de 2.000 mts)'},
    {num: "21", titulo: 'Planos arquitectónicos'},
    {num: "22", titulo: 'Autorización de propiedad horizontal'},
    {num: "23", titulo: 'Memorias de cálculo y diseños estructurales'},
    {num: "24", titulo: 'Memorias de cálculo de elementos no estructurales'},
];

// Objeto que contiene los requisitos específicos para trámites de parcelación
export const valorParcelacionobjeto = [
    {num: "25", titulo: 'Plano topográfico georreferenciado'},
    {num: "26", titulo: 'Plano del proyecto de parcelación firmado por el arquitecto matriculado'},
    {num: "27", titulo: 'Autorizacion para serviciois publicos y permisos ambientales'},
    {num: "28", titulo: 'Estduio de amenaza y riesgo'},
    {num: "29", titulo: 'Copia de licencia vencida de parcelación incluyendo modificaciones'},
    {num: "30", titulo: 'Certificacion del solicitante bajo juramento'},
    {num: "31", titulo: 'Plano actualizado de la parcelación'},
];

{/*export const valorInicialMatriculaProfesionales = [
    { num: "32", titulo: 'Matricula Director de la Construcción' },
    { num: "33", titulo: 'Matricula Arquitecto Proyectista' },
    { num: "34", titulo: 'Matricula Ingeniero Civil' },
    { num: "35", titulo: 'Matricula Diseñador Estructural' },
    { num: "36", titulo: 'Matricula Diseñador de elementos no estructurales' },
    { num: "37", titulo: 'Matricula Geotecnista' },
    { num: "38", titulo: 'Matricula Ingeniero de segunda revisión' },
    { num: "39", titulo: 'Matricula Topógrafo' },
    { num: "40", titulo: 'Matricula Urbanizador' },    
    { num: "41", titulo: 'Matricula Parcelador' } 
];

export const valorInicialCertificadoExperienciaProfesionales = [
    { num: "42", titulo: 'Certificado Director de la Construcción' },
    { num: "43", titulo: 'Certificado Arquitecto Proyectista' },
    { num: "44", titulo: 'Certificado Ingeniero Civil' },
    { num: "45", titulo: 'Certificado Diseñador Estructural' },
    { num: "46", titulo: 'Certificado Diseñador de elementos no estructurales' },
    { num: "47", titulo: 'Certificado Geotecnista' },
    { num: "48", titulo: 'Certificado Ingeniero de segunda revisión' },
    { num: "49", titulo: 'Certificado Topógrafo' },
    { num: "50", titulo: 'Certificado Urbanizador' },    
    { num: "51", titulo: 'Certificado Parcelador' }
];*/}

// Objeto que contiene los requisitos de matrículas profesionales para los diferentes roles
export const valorInicialMatriculaProfesionales = [
    { num: "32", titulo: 'Copia de la matrícula  Director de la Construcción' },
    { num: "33", titulo: 'Copia de la matrícula  Arquitecto Proyectista' },
    { num: "34", titulo: 'Copia de la matrícula  Ingeniero Civil' },
    { num: "35", titulo: 'Copia de la matrícula  Diseñador Estructural' },
    { num: "36", titulo: 'Copia de la matrícula  Diseñador de elementos no estructurales' },
    { num: "37", titulo: 'Copia de la matrícula  Geotecnista' },
    { num: "38", titulo: 'Copia de la matrícula  Ingeniero de segunda revisión' },
    { num: "39", titulo: 'Copia de la matrícula  Topógrafo' },
    { num: "40", titulo: 'Copia de la matrícula  Urbanizador' },    
    { num: "41", titulo: 'Copia de la matrícula  Parcelador' } 
];

// Objeto que contiene los requisitos de certificados de experiencia para los diferentes roles profesionales
export const valorInicialCertificadoExperienciaProfesionales = [
    { num: "42", titulo: 'Certificado de experiencia  Director de la Construcción' },
    { num: "43", titulo: 'Certificado de experiencia  Arquitecto Proyectista' },
    { num: "44", titulo: 'Certificado de experiencia  Ingeniero Civil' },
    { num: "45", titulo: 'Certificado de experiencia  Diseñador Estructural' },
    { num: "46", titulo: 'Certificado de experiencia  Diseñador de elementos no estructurales' },
    { num: "47", titulo: 'Certificado de experiencia  Geotecnista' },
    { num: "48", titulo: 'Certificado de experiencia  Ingeniero de segunda revisión' },
    { num: "49", titulo: 'Certificado de experiencia  Topógrafo' },
    { num: "50", titulo: 'Certificado de experiencia  Urbanizador' },    
    { num: "51", titulo: 'Certificado de experiencia  Parcelador'}
];


// Array que contiene los requisitos básicos obligatorios en formato de strings
export const valorInicualTareasPendientes = [
    'Formulario único nacional',
    'Copia del certificado de libertad y tradición del inmueble',
    'Copia del documento de identidad del solicitante cuando se trate de personas naturales o certificado de existencia y representación legal',
    'Copia de la matricula profesional de los profesionales intervinientes',
    'Copia simple de la escritura publica',
    'Copia del recibo del impuesto predial',
    'Poder especial',
];

// Arrays que contienen los requisitos específicos para cada tipo de trámite en formato de strings
export const urbanizacionTasks = [
    'Documentación del proyecto urbanístico',
    'Plano topográfico',
    'Certificación de servicios públicos',
    'Estudio de amenaza y riesgo (Opcional)',
];

export const subdivisionTasks = [
    'Plano del levantamiento topográfico firmado por el ingeniero topográfico',
    'Plano con base en el cual se urbanizaron los predios objeto de la solicitud',
    'Plano firmado por un arquitecto con matrícula profesional',
];

export const reconocimientoTasks = [
    'Levantamiento arquitectónico firmado',
    'Declaración de antigüedad de la construcción',
    'Peritaje técnico de estabilidad y vulnerabilidad sísmica',
];

export const construccionTasks = [
    'Planos estructurales',
    'Estudios de suelos',
    'Segunda revisión estructural (para proyectos de mas de 2.000 mts)',
    'Planos arquitectónicos',
    'Autorización de propiedad horizontal',
    'Memorias de cálculo y diseños estructurales',
    'Memorias de cálculo de elementos no estructurales',
];

export const parcelacionTasks = [
    'plano topográfico georreferenciado',
    'plano del proyecto de parcelación firmado por el arquitecto matriculado',
    'autorizacion para serviciois publicos y permisos ambientales',
    'estduio de amenaza y riesgo',
    'copia de licencia vencida de parcelación incluyendo modificaciones',
    'certificacion del solicitante bajo juramento',
    'plano actualizado de la parcelación',
];

// Opciones disponibles para el tipo de persona que realiza el trámite
export const tipoPersonaOptions = [
    { value: 'natural', option: 'Natural' },
    { value: 'juridica', option: 'Jurídica' },
];

