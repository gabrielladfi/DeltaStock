import PropTypes from 'prop-types';
import './tablaregistarimpuesto.scss'
import { useState } from 'react';
import Modal from '@/Components/Modal';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';


TablaRegistarImpuesto.propTypes = {
    dataTable: PropTypes.array.isRequired,
    fnDelete: PropTypes.func.isRequired,
}

function TablaRegistarImpuesto({ dataTable, fnDelete }) {

    const [ taxSelected, setTaxSelected ] = useState(null);
    const [ verMas, setVerMas ] = useState(false);

    function handleVerMas(e, item) {
        e.stopPropagation();
        setTaxSelected(item);
        setVerMas(true);
    }

    function handleDelete(e, id) {
        fnDelete(e,id);
        setVerMas(false);
    }
    

    return (
        <div className='tablaregistarimpuesto'>
            <table className='tablaregistarimpuesto__table'>
                <thead className='tablaregistarimpuesto__table__thead'>
                    <tr className='tablaregistarimpuesto__table__thead__tr'>
                        <th className='tablaregistarimpuesto__table__thead__tr__th'>Tipo</th>
                        <th className='tablaregistarimpuesto__table__thead__tr__th'>Valor</th>
                        <th className='tablaregistarimpuesto__table__thead__tr__th'>Ver Más</th>
                    </tr>
                </thead>
                <tbody className='tablaregistarimpuesto__table__tbody'>
                    {
                        dataTable?.map((item) => (
                            <tr key={item.id} className='tablaregistarimpuesto__table__tbody__tr'>
                                <td className='tablaregistarimpuesto__table__tbody__tr__td'>{item.tipo}</td>
                                <td className='tablaregistarimpuesto__table__tbody__tr__td'>{item.valor}</td>
                                <td className='tablaregistarimpuesto__table__tbody__tr__td'>
                                    <button onClick={(e) => handleVerMas(e, item)} className='tablaregistarimpuesto__table__tbody__tr__td__button-ver-mas'>
                                        Ver Más
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                verMas &&
                <Modal>
                    <ModalBasicNew title='Información del Impuesto' propFunctionCloseModal={() => setVerMas(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <ContainerTetxtPlain title='Tipo' text={taxSelected.tipo} />
                            <ContainerTetxtPlain title='Valor' text={taxSelected.valor} />
                            <ContainerTetxtPlain title='Base' text={taxSelected.base} />
                            <ContainerTetxtPlain title='No. Sticker' text={taxSelected.numeroSticker} />
                            <ContainerTetxtPlain title='Fecha de Pago' text={taxSelected.fechaPago} />
                            <ContainerTetxtPlain title='Fecha de Presentación' text={taxSelected.fechaPresentacion} />
                            <ContainerTetxtPlain title='Año de Declaración' text={taxSelected.anoDeclaracion} />

                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall backgroundColor='#FF0000' text='Eliminar Impuesto' onClick={(e) => handleDelete(e, taxSelected.id)} />     
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                </Modal>
            }
        </div>
    )
}

export default TablaRegistarImpuesto
