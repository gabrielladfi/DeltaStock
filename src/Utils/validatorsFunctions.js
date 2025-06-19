export function ValidatorSelectFirmas(firma, onSuccess, onError) {
    if (!firma || typeof firma !== 'object' || Object.keys(firma).length === 0) {
        if (onError) {
            onError('❗ Debe seleccionar una firma para generar el documento.');
        } else {
            console.warn('❗ Debe seleccionar una firma para generar el documento.');
        }
    } else {
        onSuccess();
    }
}

export function errorAlert() {
    alert('❗ Debe seleccionar una firma para generar el documento.');
}

export const onlyLetters = (valor) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    return regex.test(valor);
};

export const onlyNumbers = (input) => {
    const regex = /^[0-9]*$/; // Solo números enteros
    return regex.test(input);
};

export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
  
  