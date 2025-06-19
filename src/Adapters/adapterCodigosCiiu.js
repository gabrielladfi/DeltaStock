export const adapterCodigosCiiu = (data) => {
    if (!data || data.length === 0) return [
        {
            id: 1,
            value: '0125',
            option: '0125'
        }
    ]

    return data.map((item) => ({
        id: item.id,
        value: item.valor,
        option: item.valor
    }));
}
