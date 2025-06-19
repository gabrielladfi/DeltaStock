/* eslint-disable react/prop-types */

import { useContext, useEffect } from 'react';
import './otheractstable.scss'
import { AuthContextState } from '@/Context/AuthContextContext';
import { useServiceGet } from '@/Api/useServiceGet';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useDataTableItemOtherActsStore } from '@/Store/useDataTableItemOtherActsStore';
import { GlobalState } from '@/Context/GlobalContext';
import Modal from '@/Components/Modal';
import ModalBasicNew from '../ModalBasicNew';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';

function OtherActsTable({ isEdit = false, rowFn, verMas = false }) {

    const { token } = useContext(AuthContextState);
    const { setItem } = useDataTableItemOtherActsStore();
    const { setOpenModalDataPutTramiteOA, reloadGlobal, setReloadGlobal, openModalVerMasOAHistoriasListado, setOpenModalVerMasOAHistoriasListado, otrasActuacionesHistoriaSeleccionada, setOtrasActuacionesHistoriaSeleccionada } = useContext(GlobalState);
    const {
        data,
        refresh
    } = useServiceGet(token, 'https://apiv1.deltapro.com.co/deltacu/otras_actuaciones/radicacion/');

    const getDataActTable = (dataTable) => {
        setItem(dataTable);
        setOpenModalDataPutTramiteOA(true);
    }

    useEffect(() => {
        if (reloadGlobal) {
            refresh();
            setReloadGlobal(false);
        }
    }, [reloadGlobal, refresh, setReloadGlobal]);

    const handleOpenModalVerMas = (historia) => {
        setOpenModalVerMasOAHistoriasListado(true);
        setOtrasActuacionesHistoriaSeleccionada(historia);
    }

    
    return (
        <div className='otheractstable'>
            <table className="otheractstable__table">
                <thead className='otheractstable__table__thead'>
                    <tr className='otheractstable__table__thead__tr'>
                        <th className='otheractstable__table__thead__tr__th'>Número Radicación</th>
                        <th className='otheractstable__table__thead__tr__th'>Tipo Trámite</th>
                        <th className='otheractstable__table__thead__tr__th'>Uso Específico</th>
                        {/* <th className='otheractstable__table__thead__tr__th'>Otros Usos</th>
                        <th className='otheractstable__table__thead__tr__th'>Área Residencial</th>
                        <th className='otheractstable__table__thead__tr__th'>Propiedad Horizontal</th>
                        {/* <th className='otheractstable__table__thead__tr__th'>Centro Comercial</th> */}
                        {isEdit && <th className='otheractstable__table__thead__tr__th'>Editar</th>}
                        {verMas && <th className='otheractstable__table__thead__tr__th'>Ver más</th>}
                    </tr>
                </thead>
                <tbody className='otheractstable__table__tbody'>
                    {data?.map((item) => (
                        <tr onClick={() => rowFn(item)} className='otheractstable__table__tbody__tr' key={item.id}>
                            <td className='otheractstable__table__tbody__tr__td'>{item.numero_radicacion}</td>
                            <td className='otheractstable__table__tbody__tr__td'>{item.typo_tramite}</td>
                            <td className='otheractstable__table__tbody__tr__td'>{item.uso_especifico}</td>
                            {/* <td className='otheractstable__table__tbody__tr__td'>{item.otros_usos}</td> */}
                            {/* <td className='otheractstable__table__tbody__tr__td'>{item.area_residencial}</td> */}
                            {/* <td className='otheractstable__table__tbody__tr__td'>{item.is_horizontal ? 'Si' : 'No'}</td> */}
                            {/* <td className='otheractstable__table__tbody__tr__td'>{item.is_ccomercial ? 'Si' : 'No'}</td> */}
                            {isEdit && (
                                <td className='otheractstable__table__tbody__tr__td'>
                                    <button onClick={() => getDataActTable(item)} className='otheractstable__table__tbody__tr__td__button-edit'>
                                    <PencilIcon className='otheractstable__table__tbody__tr__td__button-edit__icon' />
                                    </button>
                                </td>
                            )}
                            {verMas && (
                                <td className='otheractstable__table__tbody__tr__td'>
                                    <button onClick={() => handleOpenModalVerMas(item)} className='otheractstable__table__tbody__tr__td__button-ver-mas'>
                                        Ver más
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                openModalVerMasOAHistoriasListado && (
                    <Modal>
                       <ModalBasicNew title='Información de la Historia' propFunctionCloseModal={() => setOpenModalVerMasOAHistoriasListado(false)}>
                            <BoxContainerInputsByInfoBigScroll>
                                <ContainerTetxtPlain title='Número Radicación' text={otrasActuacionesHistoriaSeleccionada.numero_radicacion} />
                                <ContainerTetxtPlain title='Tipo Trámite' text={otrasActuacionesHistoriaSeleccionada.typo_tramite} />
                                <ContainerTetxtPlain title='Uso Específico' text={otrasActuacionesHistoriaSeleccionada.uso_especifico} />
                                <ContainerTetxtPlain title='Otros Usos' text={otrasActuacionesHistoriaSeleccionada.otros_usos} />
                                <ContainerTetxtPlain title='Área Residencial' text={otrasActuacionesHistoriaSeleccionada.area_residencial} />
                                <ContainerTetxtPlain title='Propiedad Horizontal' text={otrasActuacionesHistoriaSeleccionada.is_horizontal ? 'Si' : 'No'} />
                                <ContainerTetxtPlain title='Centro Comercial' text={otrasActuacionesHistoriaSeleccionada.is_ccomercial ? 'Si' : 'No'} />
                            </BoxContainerInputsByInfoBigScroll>
                            <ContainerButtonsBackandNext>
                                <PrimaryButtonNewSmall text='Editar' onClick={() => getDataActTable(otrasActuacionesHistoriaSeleccionada)} />
                            </ContainerButtonsBackandNext>
                       </ModalBasicNew>
                    </Modal>
                )
            }
        </div>
    )
}

export default OtherActsTable
