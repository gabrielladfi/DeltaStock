/* eslint-disable react/prop-types */
import './tablaprimaria.scss'

function TablaPrimaria({
    propColumns,
    propData,
    propDelete,
    propFnDelete,
    propRowData
}) {

    return (
        <div className='container-tabla-primaria container-tabla-primaria--molecule'>
            <table className='container-tabla-primaria__table'>
                <thead className='container-tabla-primaria__table__thead'>
                {
                        propColumns ?
                        <tr className='container-tabla-secundaria__table__thead__tr container-tabla-primaria__table__thead__tr'>
                            {
                                propColumns.map((item) => (
                                    <th className='container-tabla-secundaria__table__thead__tr__th container-tabla-primaria__table__thead__tr__th' key={item.id}>{item.titleColumn}</th>
                                ))
                            }
                            {
                                    propDelete === true &&
                                    <th className='container-tabla-secundaria__table__thead__tr__th container-tabla-primaria__table__thead__tr__th'>
                                        Eliminar
                                    </th>
                                }
                        </tr>
                        :
                        <tr className='container-tabla-secundaria__table__thead__tr'>
                            <th className='container-tabla-secundaria__table__thead__tr__th--first'>Columna 1</th>
                            <th className='container-tabla-secundaria__table__thead__tr__th'>Columna 2</th>
                            <th className='container-tabla-secundaria__table__thead__tr__th'>Columna 3</th>
                            <th className='container-tabla-secundaria__table__thead__tr__th'>Columna 4</th>
                        </tr>
                    }
                </thead>

                <tbody className='container-tabla-primaria__table__tbody'>
                    {
                        propData ?
                        propData.map((item, index) => (
                            <tr onClick={() => propRowData(item)} className='container-tabla-primaria__table__tbody__tr' key={index}>
                                {
                                    Object.keys(item).map((key, idx) => (
                                        <td key={idx}>{item[key]}</td>
                                    ))
                                }
                                {
                                    propDelete === true &&
                                    <td>
                                        <button className='tabla-primaria__delete--button' onClick={(e) => propFnDelete(e, item.id)}>Eliminar</button>
                                    </td>
                                }
                            </tr>
                        ))
                        :
                        <tr className='container-tabla-primaria__table__tbody__tr'>
                            <td>{1}</td>
                            <td>{159.018}</td>
                            <td>{30.213}</td>
                            <td>{189.231}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TablaPrimaria
