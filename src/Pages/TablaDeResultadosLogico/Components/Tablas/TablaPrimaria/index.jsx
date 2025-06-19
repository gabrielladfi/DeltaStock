/* eslint-disable react/prop-types */
import './tablaprimaria.scss'

function TablaPrimaria({
    propTitleTable,
    propTitleColumnOne,
    propTitleColumnTwo,
    propTitleColumnThree,
    propTitleColumnFour,
    propData
}) {

    return (
        <div className='container-tabla-primaria'>
            <div className='container-tabla-primaria__title'>
                <p className='container-tabla-primaria__title__p'>{propTitleTable}</p>
            </div>
            <table className='container-tabla-primaria__table'>
                <thead className='container-tabla-primaria__table__thead'>
                    <tr className='container-tabla-primaria__table__thead__tr'>
                        <th className='container-tabla-primaria__table__thead__tr__th--first'>{propTitleColumnOne}</th>
                        <th className='container-tabla-primaria__table__thead__tr__th'>{propTitleColumnTwo}</th>
                        <th className='container-tabla-primaria__table__thead__tr__th'>{propTitleColumnThree}</th>
                        <th className='container-tabla-primaria__table__thead__tr__th'>{propTitleColumnFour}</th>
                    </tr>
                </thead>

                <tbody className='container-tabla-primaria__table__tbody'>
                    {
                        propData ?

                        propData.map((item, index) => (
                            <tr className='container-tabla-primaria__table__tbody__tr' key={index}>
                                <td>{item.columnOne}</td>
                                <td>{item.columnTwo}</td>
                                <td>{item.columnThree}</td>
                                <td>{item.columnFour}</td>
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
