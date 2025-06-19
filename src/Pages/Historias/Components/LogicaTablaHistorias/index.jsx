import { useContext } from 'react'
import TablaHistorias from '../TablaHistorias';
import { HistoriasState } from '../../Context/HistoriaContext';

//Container Component: Este componente se encarga de obtener el listado de observaciones por numero de radicacion
//Y de renderizar el componente: Presentational Component: TablaObservaciones
function LogicaTablaHistorias() {

    const { dataGet, setDataHistoriaSeleccionadaParaEditar, dataFiltrada} = useContext(HistoriasState)

    function handleObtenerDtaHistoria(data) {
        console.log(data)
        setDataHistoriaSeleccionadaParaEditar(data)
    }

    

    return <TablaHistorias propListadoHistorias={dataGet} propFunction={handleObtenerDtaHistoria} propLisatdoFiltrado={dataFiltrada} />
}

export default LogicaTablaHistorias
