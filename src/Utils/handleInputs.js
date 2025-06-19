export function handleInputChange({ target }, setState, state) {
    const { name, value } = target;

    setState({
        ...state,
        [name]: value,
    });
}

export function handleInputChangeValidator({ target }, setState, state, setStateValidator) {
    const { name, value } = target;

    setState({
        ...state,
        [name]: value,
    });

    setStateValidator(true)
}

 // Función para manejar el cambio de los inputs de fecha
 export function handleGetDateTransform(event, setState) {
    const { name, value } = event.target;
    setState((prev) => ({
        ...prev,
        [name]: `${value}T00:00:00Z`, // Reemplazar el valor existente
    }));

}
