import PropTypes from 'prop-types'
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import './aatablastock.scss'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'


AATablaStock.propTypes = {
    setUpdateItem: PropTypes.func.isRequired,
    dataTable: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateStateItem: PropTypes.func.isRequired
}

function AATablaStock({ setUpdateItem, dataTable, deleteItem, updateStateItem }) {

    const { valorParaFiltrar } = useContext(GlobalState)

    const filteredData = dataTable.filter(item => 
        item.pieza.includes(valorParaFiltrar) ||
        item.ipn.includes(valorParaFiltrar) ||
        item.revision.includes(valorParaFiltrar) ||
        item.descripcion.includes(valorParaFiltrar) ||
        item.codigoLote.includes(valorParaFiltrar) ||
        item.ubicacion.includes(valorParaFiltrar) ||
        item.ordenCompra.includes(valorParaFiltrar) ||
        item.piezaProveedor.includes(valorParaFiltrar)
    )

    return (
        <div className='aatablastock'>
            <table className='aatablastock__table'>
                <thead className='aatablastock__table__thead'>
                    <tr className='aatablastock__table__thead__tr'>
                        <th className='aatablastock__table__thead__tr__th'>Pieza</th>
                        <th className='aatablastock__table__thead__tr__th'>IPN</th>
                        <th className='aatablastock__table__thead__tr__th'>Revisión</th>
                        <th className='aatablastock__table__thead__tr__th'>Descripción</th>
                        <th className='aatablastock__table__thead__tr__th'>Cantidad</th>
                        <th className='aatablastock__table__thead__tr__th'>UM</th>
                        <th className='aatablastock__table__thead__tr__th'>MIN</th>
                        <th className='aatablastock__table__thead__tr__th'>MAX</th>
                        <th className='aatablastock__table__thead__tr__th'>Estado</th>
                        <th className='aatablastock__table__thead__tr__th'>Valor Promedio</th>
                        <th className='aatablastock__table__thead__tr__th'>Valor Total</th>
                        <th className='aatablastock__table__thead__tr__th'>Codigo de lote</th>
                        <th className='aatablastock__table__thead__tr__th'>Ubicación</th>
                        <th className='aatablastock__table__thead__tr__th'>Orden de compra</th>
                        <th className='aatablastock__table__thead__tr__th'>Pieza del proveedor</th>
                        <th className='aatablastock__table__thead__tr__th'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='aatablastock__table__tbody'>
                    {
                        filteredData ?
                        null :
                        dataTable?.map((item) => (
                            <tr onClick={() => setUpdateItem(true)} key={item.pieza} className='aatablastock__table__tbody__tr'>
                                <td className='aatablastock__table__tbody__tr__td'>{item.pieza}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.ipn}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.revision}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.descripcion}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.existencias}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.um}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.min}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.max}</td>
                                <td className='aatablastock__table__tbody__tr__td'>
                                    <button onClick={(e) => updateStateItem(e, item)} className={`aatablastock__table__tbody__tr__td__button-estado ${item.estado ? 'aatablastock__table__tbody__tr__td__button-estado-ok' : 'aatablastock__table__tbody__tr__td__button-estado-incompleto'}`}>
                                        {item.estado ? 'Completo' : 'Incompleto'}
                                    </button>
                                </td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.valorPromedio}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.valorTotal}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.codigoLote}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.ubicacion}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.ordenCompra}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.piezaProveedor}</td>
                                <td className='aatablastock__table__tbody__tr__td'>
                                    <button onClick={(e) => deleteItem(e, item)} className='aatablastock__table__tbody__tr__td__button-eliminar'>
                                        <XMarkIcon className='aatablastock__table__tbody__tr__td__button-eliminar__icon' />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        filteredData?.map((item) => (
                            <tr onClick={() => setUpdateItem(true)} key={item.pieza} className='aatablastock__table__tbody__tr'>
                                <td className='aatablastock__table__tbody__tr__td'>{item.pieza}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.ipn}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.revision}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.descripcion}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.existencias}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.um}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.min}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.max}</td>
                                <td className='aatablastock__table__tbody__tr__td'>
                                    <button onClick={(e) => updateStateItem(e, item)} className={`aatablastock__table__tbody__tr__td__button-estado ${item.estado ? 'aatablastock__table__tbody__tr__td__button-estado-ok' : 'aatablastock__table__tbody__tr__td__button-estado-incompleto'}`}>
                                        {item.estado ? 'Completo' : 'Incompleto'}
                                    </button>
                                </td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.valorPromedio}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.valorTotal}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.codigoLote}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.ubicacion}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.ordenCompra}</td>
                                <td className='aatablastock__table__tbody__tr__td'>{item.piezaProveedor}</td>
                                <td className='aatablastock__table__tbody__tr__td'>
                                    <button onClick={(e) => deleteItem(e, item)} className='aatablastock__table__tbody__tr__td__button-eliminar'>
                                        <XMarkIcon className='aatablastock__table__tbody__tr__td__button-eliminar__icon' />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                   
                </tbody>
            </table>
        </div>
    )
}

export default AATablaStock
