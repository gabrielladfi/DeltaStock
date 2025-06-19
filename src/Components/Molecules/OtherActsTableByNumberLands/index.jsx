/* eslint-disable react/prop-types */
import { PencilIcon } from '@heroicons/react/24/outline';
import './otheractstablebynumberlands.scss'
import { useState } from 'react';
import Modal from '@/Components/Modal';
import ModalBasicNew from '../ModalBasicNew';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';


function OtherActsTableByNumberLands ({ isEdit = true, rowFn, data, getDataActTable, verMas = true }) {

    const [openModalVerMas, setOpenModalVerMas] = useState(false);
    const [ titularSelected, setTitularSelected ] = useState(null);

    const handleOpenModalVerMas = (item) => {
        setOpenModalVerMas(true)
        setTitularSelected(item)
    }


    return (
        <div className='otheractstablebynumberlands'>
            <table className="otheractstablebynumberlands__table">
                <thead className='otheractstablebynumberlands__table__thead'>
                    <tr className='otheractstablebynumberlands__table__thead__tr'>
                        <th className='otheractstablebynumberlands__table__thead__tr__th'>Nombre</th>
                        {/* <th className='otheractstablebynumberlands__table__thead__tr__th'>Email</th> */}
                        {/* <th className='otheractstablebynumberlands__table__thead__tr__th'>Teléfono</th> */}
                        <th className='otheractstablebynumberlands__table__thead__tr__th'>DNI</th>
                        {isEdit && <th className='otheractstablebynumberlands__table__thead__tr__th'>Editar</th>}
                        {verMas && <th className='otheractstablebynumberlands__table__thead__tr__th'>Ver más</th>}
                    </tr>
                </thead>
                <tbody className='otheractstablebynumberlands__table__tbody'>
                    {data?.map((item) => (
                        <tr onClick={() => rowFn(item)} className='otheractstablebynumberlands__table__tbody__tr' key={item.id}>
                            <td className='otheractstablebynumberlands__table__tbody__tr__td'>{item.nombre}</td>
                            {/* <td className='otheractstablebynumberlands__table__tbody__tr__td'>{item.email}</td> */}
                            {/* <td className='otheractstablebynumberlands__table__tbody__tr__td'>{item.phone}</td> */}
                            <td className='otheractstablebynumberlands__table__tbody__tr__td'>{item.dni}</td>
                            {isEdit && (
                                <td className='otheractstablebynumberlands__table__tbody__tr__td'>
                                    <button onClick={() => getDataActTable(item)} className='otheractstablebynumberlands__table__tbody__tr__td__button'>
                                        <PencilIcon className='otheractstablebynumberlands__table__tbody__tr__td__button__icon' />
                                    </button>
                                </td>
                            )}
                            {verMas && (
                                <td className='otheractstablebynumberlands__table__tbody__tr__td'>
                                    <button onClick={() => handleOpenModalVerMas(item)} className='otheractstablebynumberlands__table__tbody__tr__td__button-ver-mas'>
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
                    <ModalBasicNew title='Información del Titular' propFunctionCloseModal={() => setOpenModalVerMas(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <ContainerTetxtPlain title='Número Radicación' text={titularSelected.numero_radicacion} />
                            <ContainerTetxtPlain title='Nombre' text={titularSelected.nombre} />
                            <ContainerTetxtPlain title='Email' text={titularSelected.email} />
                            <ContainerTetxtPlain title='Teléfono' text={titularSelected.phone} />
                            <ContainerTetxtPlain title='DNI' text={titularSelected.dni} />
                        </BoxContainerInputsByInfoBigScroll>
                    </ModalBasicNew>
                </Modal>
            )}
        </div>
    )
}

export default OtherActsTableByNumberLands   
