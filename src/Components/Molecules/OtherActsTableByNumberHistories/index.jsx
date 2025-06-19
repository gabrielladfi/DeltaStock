/* eslint-disable react/prop-types */
import { PencilIcon } from '@heroicons/react/24/outline';
import './otheractstablebynumberhistories.scss'
import { GlobalState } from '@/Context/GlobalContext';
import { useContext, useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import ModalBasicNew from '../ModalBasicNew';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import dayjs from 'dayjs';


function OtherActsTableByNumberHistories ({ isEdit = true, rowFn, data, getDataActTable, verMas = true, updateNotes, updateSalida }) {

    const { selectedRow, setSelectedRow, openModalVerMasOAHistorias, setOpenModalVerMasOAHistorias} = useContext(GlobalState);
    
    const [historiaSelected, setHistoriaSelected] = useState(null);

    const handleOpenModalVerMas = (historia) => {
        setOpenModalVerMasOAHistorias(true);
        setHistoriaSelected(historia);
        setSelectedRow(historia.id);
    }

    const handleRowClick = (historia, id) => {
        setSelectedRow(id);
        rowFn(historia);

    };

    useEffect(() => {
        return () => {
            setSelectedRow(null);
        }
    }, []);


    return (
        <div className='otheractstablebynumberhistories'>
            <table className="otheractstablebynumberhistories__table">
                <thead className='otheractstablebynumberhistories__table__thead'>
                    <tr className='otheractstablebynumberhistories__table__thead__tr'>
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Número Radicación</th> */}
                        <th className='otheractstablebynumberhistories__table__thead__tr__th'>Etapa</th>
                        <th className='otheractstablebynumberhistories__table__thead__tr__th'>Subetapa</th>
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Responsable</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Fecha Entrada</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Fecha Salida</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Iniciado Por</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Finalizado Por</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Reinventado Por</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Días</th> */}
                        {/* <th className='other-acts-table-container__table__thead__tr__th'>Notas</th> */}
                        {isEdit && <th className='otheractstablebynumberhistories__table__thead__tr__th'>Editar</th>}
                        {verMas && <th className='otheractstablebynumberhistories__table__thead__tr__th'>Ver más</th>}
                    </tr>
                </thead>
                <tbody className='otheractstablebynumberhistories__table__tbody'>
                    {data?.map((item) => (
                        <tr onClick={() => handleRowClick(item, item.id)} className={`otheractstablebynumberhistories__table__tbody__tr ${selectedRow === item.id ? 'selected' : ''}`} key={item.id}>
                            {/* <td className='otheractstablebynumberhistories__table__tbody__tr__td'>{item.numero_radicacion}</td> */}
                            <td className='otheractstablebynumberhistories__table__tbody__tr__td'>{item.etapa}</td>
                            <td className='otheractstablebynumberhistories__table__tbody__tr__td'>{item.subetapa}</td>
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.responsable}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.fecha_entrada}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.fecha_salida}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.iniciado_por}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.finalizado_por}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.reinventado_por}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.dias}</td> */}
                            {/* <td className='other-acts-table-container__table__tbody__tr__td'>{item.notas}</td> */}
                            {isEdit && (
                                <td className='otheractstablebynumberhistories__table__tbody__tr__td'>
                                    <button onClick={() => getDataActTable(item)} className='otheractstablebynumberhistories__table__tbody__tr__td__button'>
                                        <PencilIcon className='otheractstablebynumberhistories__table__tbody__tr__td__button__icon' />
                                    </button>
                                </td>
                            )}
                            {verMas && (
                                <td className='otheractstablebynumberhistories__table__tbody__tr__td'>
                                    <button onClick={() => handleOpenModalVerMas(item)} className='otheractstablebynumberhistories__table__tbody__tr__td__button-ver-mas'>
                                        Ver más
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {openModalVerMasOAHistorias && (
                <Modal>
                    <ModalBasicNew title='Información de la Historia' propFunctionCloseModal={() => setOpenModalVerMasOAHistorias(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <ContainerTetxtPlain title='Número Radicación' text={historiaSelected.numero_radicacion} />
                            <ContainerTetxtPlain title='Etapa' text={historiaSelected.etapa} />
                            <ContainerTetxtPlain title='Subetapa' text={historiaSelected.subetapa} />
                            <ContainerTetxtPlain title='Responsable' text={historiaSelected.responsable} />
                            <ContainerTetxtPlain title='Fecha Entrada' text={dayjs(historiaSelected.fecha_entrada).utc().format('DD/MM/YYYY')} />
                            <ContainerTetxtPlain title='Fecha Salida' text={historiaSelected.fecha_salida ? dayjs(historiaSelected.fecha_salida).utc().format('DD/MM/YYYY') : ''} />
                            <ContainerTetxtPlain title='Iniciado Por' text={historiaSelected.iniciado_por} />
                            <ContainerTetxtPlain title='Finalizado Por' text={historiaSelected.finalizado_por} />
                            <ContainerTetxtPlain title='Días' text={historiaSelected.dias} />
                            <ContainerTetxtPlain title='Notas' text={historiaSelected.notas} />
                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <SecondaryButtonNewSmall text='Actualizar Notas' onClick={updateNotes} />
                            <SecondaryButtonNewSmall text='Actualizar Salida' onClick={updateSalida} />
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                </Modal>
            )}
        </div>
    )
}

export default OtherActsTableByNumberHistories   
