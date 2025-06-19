import { useNavigateProvider } from "@/Hooks/useNavigateProvider";
import TablaResultadosRender from "./Components/TablaResultadosRender"

function TablaDeResultadosLogico() {

    const titulo = 'CURADURIA URBANA No. 2 DE SANTA MARTA';
    const tarifaText = 'TARIFAS 2025';

    const { navigateToMenuLiquidaciones } = useNavigateProvider();

    const columsSecondTable = [
        {id: 0, titleColumn: ''},
        {id: 1, titleColumn: 'UVT * 20,02'},
        {id: 2, titleColumn: 'FACTOR I'},
        {id: 3, titleColumn: 'SUBTOTAL'},
        {id: 4, titleColumn: 'FACTOR J'},
        {id: 5, titleColumn: 'FACTOR M'},
        {id: 6, titleColumn: 'SUBTOTAL'},
        {id: 7, titleColumn: 'MAS I.V.A'},
    ];

    const columsSecondTableColumnInicial = [
        {id: 0, titleColumn: 'E-1 & E-2'},
        {id: 1, titleColumn: 'UVT * 20,02'},
        {id: 2, titleColumn: 'FACTOR I'},
        {id: 3, titleColumn: 'SUBTOTAL'},
        {id: 4, titleColumn: 'FACTOR J'},
        {id: 5, titleColumn: 'FACTOR M'},
        {id: 6, titleColumn: 'SUBTOTAL'},
        {id: 7, titleColumn: 'MAS I.V.A'},
    ];

    

    return (
        <>
            <TablaResultadosRender 
                propTitleSection={titulo} 
                propTitleTarifa={tarifaText} 
                propFnButton={navigateToMenuLiquidaciones} 
                propDataColumnsSecondTable={columsSecondTable} 
                propDataColumnsSecondTableColumnInicial={columsSecondTableColumnInicial}
            />
        </>
    )
}

export default TablaDeResultadosLogico
