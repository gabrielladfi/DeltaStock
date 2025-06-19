/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './tablahistorias.scss'
import { HistoriasState } from '../../Context/HistoriaContext';
import { formatDateToYYYYMMDD } from '@/Utils/handleTrasnformDate';
import Modal from '@/Components/Modal';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';

function TablaHistorias({ propListadoHistorias, propFunction, propLisatdoFiltrado }) {

    const { selectedRow, setSelectedRow, fechaFiltro, setVerMas, setHistorySelected, setDataHistoriaSeleccionadaParaEditar } = useContext(HistoriasState);

    
    const handleRowClick = (historia, index) => {
        setSelectedRow(index);
        propFunction(historia);
    };

    console.log(propListadoHistorias)

    const handleVerMas = (historia) => {
        setVerMas(true);
        setHistorySelected(historia);
        setDataHistoriaSeleccionadaParaEditar(historia);
    }

    return (
        <>
        <div className='tablahistoriascontainer'>
        <table className='tablahistoriascontainer__table'>
            <thead className='tablahistoriascontainer__table__thead'>
                <tr className='tablahistoriascontainer__table__thead__tr'>
                    <th className='tablahistoriascontainer__table__thead__tr__th--one'>Etapa</th>
                    {/*<th className='thead-tabla-observacion--modificador-dos'>Sub Etapa</th>*/}
                    {/*<th className='thead-tabla-observacion--modificador-dos'>Responsable</th>*/}
                    <th className='tablahistoriascontainer__table__thead__tr__th--two'>F. Entrada</th>
                    {/*<th className='thead-tabla-observacion--modificador-dos'>Iniciado Por:</th>*/}
                    <th className='tablahistoriascontainer__table__thead__tr__th--three'>F. Salida</th>
                    {/*<th className='thead-tabla-observacion--modificador-dos'>Finalizado Por:</th>*/}
                    {/*<th className='thead-tabla-observacion--modificador-dos'>Dias</th>
                    <th className='thead-tabla-observacion--modificador-dos'>Notas</th>*/}
                    <th className='tablahistoriascontainer__table__thead__tr__th--four'>Ver más</th>
                </tr>
            </thead>
            <tbody className='tablahistoriascontainer__table__tbody'> 
                {
                    !fechaFiltro.length > 0 ?
                    propListadoHistorias?.slice().reverse().map((historia, index) => {
                        return (
                            <tr onClick={() => handleRowClick(historia, index)} key={index} className={`tablahistoriascontainer__table__tbody__tr ${selectedRow === index ? 'selected-row' : ''}`}>
                                <td className='tablahistoriascontainer__table__tbody__tr__td-one capitalCase'>{historia.etapa}</td>
                                {/*<td className='global-tabla__tbody__tr__td-three capitalCase'>{historia.subetapa}</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-four capitalCase'>{historia.responsable}</td>*/}
                                <td className='tablahistoriascontainer__table__tbody__tr__td-two capitalCase--Observacion'>{formatDateToYYYYMMDD(historia.fecha_entrada)}</td>
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{historia.iniciado_por}</td>*/}
                                <td className='tablahistoriascontainer__table__tbody__tr__td-three capitalCase'>{historia.fecha_salida === null ? 'Sin Registro' : formatDateToYYYYMMDD(historia.fecha_salida)}</td>
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{historia.finalizado_por === null ? 'Sin Finalizar' : historia.finalizado_por}</td>*/}
                               {/*<td className='global-tabla__tbody__tr__td-five capitalCase'>{historia.dias === null ? 'Sin Registro' : historia.dias}</td>
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>{historia.notas === null ? 'Sin notas' : historia.notas}</td> */}
                                <td className='tablahistoriascontainer__table__tbody__tr__td-four capitalCase'>
                                    <button className='tablahistoriascontainer__table__tbody__tr__td-four__button' onClick={() => handleVerMas(historia)}>Ver más</button>
                                </td>
                            </tr>
                        )
                    })
                    :

                    propLisatdoFiltrado?.slice().reverse().map((historia, index) => {
                        return (
                            <tr onClick={() => handleRowClick(historia, index)} key={index} className={`global-tabla__tbody__tr capitalCase ${selectedRow === index ? 'selected-row' : ''}`}>
                                <td className='global-tabla__tbody__tr__td-two capitalCase'>{historia.etapa}</td>
                                {/*<td className='global-tabla__tbody__tr__td-three capitalCase'>{historia.subetapa}</td>*/}
                                {/*<td className='global-tabla__tbody__tr__td-four capitalCase'>{historia.responsable}</td>*/}
                                <td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{formatDateToYYYYMMDD(historia.fecha_entrada)}</td>
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{historia.iniciado_por}</td>*/}
                                <td className='global-tabla__tbody__tr__td-five capitalCase'>{historia.fecha_salida === null ? 'Sin Registro' : formatDateToYYYYMMDD(historia.fecha_salida)}</td>
                                {/*<td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{historia.finalizado_por === null ? 'Sin Finalizar' : historia.finalizado_por}</td>*/}
                               {/*<td className='global-tabla__tbody__tr__td-five capitalCase'>{historia.dias === null ? 'Sin Registro' : historia.dias}</td>
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>{historia.notas === null ? 'Sin notas' : historia.notas}</td> */}
                                <td className='global-tabla__tbody__tr__td-seven capitalCase'>
                                    <button className='tablahistoriascontainer__table__tbody__tr__td-four__button' onClick={() => handleVerMas(historia)}>Ver más</button>
                                </td>
                            </tr>
                        )
                    })

                }  
            </tbody>
        </table>
    </div>
    
    </>
    )
}

export default TablaHistorias
