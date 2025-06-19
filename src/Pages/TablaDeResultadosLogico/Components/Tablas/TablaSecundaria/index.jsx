/* eslint-disable react/prop-types */

import './tablasecundaria.scss'

function TablaSecundaria({ propData, propColumns, propTitleCargo, proTitleFactorJ }) {
    return (
        <div className='container-tabla-secundaria'>
            
            <table className='container-tabla-secundaria__table'>
                <thead className='container-tabla-secundaria__table__thead'>
                    <tr className='container-tabla-secundaria__table__thead__tr'>
                        <th className='container-tabla-secundaria__table__thead__tr__th--vacio'></th>
                        <th className='container-tabla-secundaria__table__thead__tr__th--title' colSpan={3}>{propTitleCargo}</th>
                        <th className='container-tabla-secundaria__table__thead__tr__th--title container-tabla-secundaria__table__thead__tr__th--title--factor-j'>{proTitleFactorJ}</th>
                    </tr>
                    {
                        propColumns ?
                        <tr className='container-tabla-secundaria__table__thead__tr'>
                            {
                                propColumns.map((item) => (
                                    <th className='container-tabla-secundaria__table__thead__tr__th' key={item.id}>{item.titleColumn}</th>
                                ))
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

                <tbody className='container-tabla-secundaria__table__tbody'>
                    
                    {
                        propData ?
                        <tr>
                            {
                                propData.map((item, index) => (
                                    <td key={index}>{item.columnOne}</td>
                                ))
                            }
                        </tr>
                        :
                        <tr className='container-tabla-secundaria__table__tbody__tr'>
                            <td>{'DE 101 A 299'}</td>
                            <td>{'996.975,98'}</td>
                            <td>{'3,2'}</td>
                            <td>{'3.190.323,14'}</td>
                            <td>{'1,391362169'}</td>
                            <td>{'0,638'}</td>
                            <td>{'2.832.015'}</td>
                            <td>{'3.370.098'}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TablaSecundaria
