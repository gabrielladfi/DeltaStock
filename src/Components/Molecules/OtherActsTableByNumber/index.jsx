/* eslint-disable react/prop-types */
import { PencilIcon } from '@heroicons/react/24/outline';
import './otheractstablebynumber.scss'
import { useState } from 'react';
import ModalBasicNew from '../ModalBasicNew';
import Modal from '@/Components/Modal';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';


function OtherActsTableByNumber ({ isEdit = true, rowFn, data, getDataActTable, verMas = true }) {

    const [openModalVerMas, setOpenModalVerMas] = useState(false);
    const [ prdioSelected, setPrdioSelected ] = useState(null);

    const handleOpenModalVerMas = (item) => {
        setOpenModalVerMas(true)
        setPrdioSelected(item)
    }
    
    return (
        <div className='otheractstablebynumber'>
            <table className="otheractstablebynumber__table">
                <thead className='otheractstablebynumber__table__thead'>
                    <tr className='otheractstablebynumber__table__thead__tr'>
                        {/* <th className='otheractstablebynumber__table__thead__tr__th'>Número Radicación</th> */}
                        <th className='otheractstablebynumber__table__thead__tr__th'>Dirección Actual</th>
                        {/* <th className='otheractstablebynumber__table__thead__tr__th'>Dirección Anterior</th> */}
                        <th className='otheractstablebynumber__table__thead__tr__th'>Matrícula Inmobiliaria</th>
                        {/* <th className='otheractstablebynumber__table__thead__tr__th'>Número Catastral</th> */}
                        {/* <th className='otheractstablebynumber__table__thead__tr__th'>Barrio</th> */}
                        {/* <th className='otheractstablebynumber__table__thead__tr__th'>Comuna</th> */}
                        {/* <th className='otheractstablebynumber__table__thead__tr__th'>Estrato</th> */}
                        {isEdit && <th className='otheractstablebynumber__table__thead__tr__th'>Editar</th>}
                        {verMas && <th className='otheractstablebynumber__table__thead__tr__th'>Ver más</th>}
                    </tr>
                </thead>
                <tbody className='otheractstablebynumber__table__tbody'>
                    {data?.map((item) => (
                        <tr onClick={() => rowFn(item)} className='otheractstablebynumber__table__tbody__tr' key={item.id}>
                            {/* <td className='otheractstablebynumber__table__tbody__tr__td'>{item.numero_radicacion}</td> */}
                            <td className='otheractstablebynumber__table__tbody__tr__td'>{item.direccion_actual}</td>
                            {/* <td className='otheractstablebynumber__table__tbody__tr__td'>{item.direccion_anterior}</td> */}
                            <td className='otheractstablebynumber__table__tbody__tr__td'>{item.matricula_inmobiliaria}</td>
                            {/* <td className='otheractstablebynumber__table__tbody__tr__td'>{item.numero_catastral}</td> */}
                            {/* <td className='otheractstablebynumber__table__tbody__tr__td'>{item.barrio}</td> */}
                            {/* <td className='otheractstablebynumber__table__tbody__tr__td'>{item.comuna}</td> */}
                            {/* <td className='otheractstablebynumber__table__tbody__tr__td'>{item.estrato}</td> */}
                            {isEdit && (
                                <td className='otheractstablebynumber__table__tbody__tr__td'>
                                    <button onClick={() => getDataActTable(item)} className='otheractstablebynumber__table__tbody__tr__td__button'>
                                    <PencilIcon className='otheractstablebynumber__table__tbody__tr__td__button__icon' />
                                    </button>
                                </td>
                            )}
                            {verMas && (
                                <td className='otheractstablebynumber__table__tbody__tr__td'>
                                    <button onClick={() => handleOpenModalVerMas(item)} className='otheractstablebynumber__table__tbody__tr__td__button-ver-mas'>
                                        Ver más
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {openModalVerMas && (
                <Modal>
                    <ModalBasicNew title='Información del Predio' propFunctionCloseModal={() => setOpenModalVerMas(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <ContainerTetxtPlain title='Número Radicación' text={prdioSelected.numero_radicacion} />
                            <ContainerTetxtPlain title='Dirección Actual' text={prdioSelected.direccion_actual} />
                            <ContainerTetxtPlain title='Dirección Anterior' text={prdioSelected.direccion_anterior} />
                            <ContainerTetxtPlain title='Matrícula Inmobiliaria' text={prdioSelected.matricula_inmobiliaria} />
                            <ContainerTetxtPlain title='Número Catastral' text={prdioSelected.numero_catastral} />
                            <ContainerTetxtPlain title='Urbanización' text={prdioSelected.urbanizacion} />
                            <ContainerTetxtPlain title='Comuna' text={prdioSelected.comuna} />
                            <ContainerTetxtPlain title='Estrato' text={prdioSelected.estrato} />
                        </BoxContainerInputsByInfoBigScroll>
                    </ModalBasicNew>

                </Modal>
                
            )}
        </div>
    )
}

export default OtherActsTableByNumber   
