
import './tablalistadodeoficios.scss'

function TablaListadoDeOficios() {
    return (
        <div className='global-tablabuscador-div-tabla--categoria'>
            <table className='global-tabla tabla-observaciones--modificador'>
                <thead className='global-tabla__thead'>
                    <tr className='global-tabla__thead__tr'>
                        <th className='thead-tabla-observacion--modificador'>ID</th>
                        <th className='thead-tabla-observacion--modificador-dos'>Número de radicación</th>
                        <th className='thead-tabla-observacion--modificador-dos'>Nombre Solicitante</th>
                        <th className='thead-tabla-observacion--modificador-dos'>Asunto</th>
                        <th className='thead-tabla-observacion--modificador-dos'>Descripcion</th>
                        <th className='thead-tabla-observacion--modificador-dos'>Fecha</th>
                        <th className='thead-tabla-observacion--modificador-dos'>Recibido/Salida</th>
                        <th className='thead-tabla-observacion--modificador-tres'>Impresión</th>
                        <th className='thead-tabla-observacion--modificador-tres'>Stiker Entrada</th>
                        <th className='thead-tabla-observacion--modificador-tres'>Stiker Salida</th>
                        <th className='thead-tabla-observacion--modificador-tres'>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='global-tabla__tbody'> 
                    {/*
                        listadoResponsables?.map((responsable, index) => {
                            return (
                                <tr key={index} className='global-tabla__tbody__tr capitalCase'>
                                    <td className='global-tabla__tbody__tr__td-one capitalCase'>{responsable.id}</td>
                                    <td className='global-tabla__tbody__tr__td-two capitalCase'>{responsable.numero_radicacion}</td>
                                    <td className='global-tabla__tbody__tr__td-three capitalCase'>{responsable.nombre.toLowerCase()}</td>
                                    <td className='global-tabla__tbody__tr__td-four capitalCase'>{responsable.email}</td>
                                    <td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{responsable.phone}</td>
                                    <td className='global-tabla__tbody__tr__td-five capitalCase'>{responsable.dni}</td>
                                    <td className='global-tabla__tbody__tr__td-five capitalCase'>{responsable.matricula}</td>
                                    <td className='global-tabla__tbody__tr__td-six capitalCase'>{responsable.fecha}</td>
                                    <td className='global-tabla__tbody__tr__td-six capitalCase'>{responsable.fecha_expdicion_matricula}</td>
                                    <td className='global-tabla__tbody__tr__td-six capitalCase'>{responsable.tipo_responsable}</td>
                                    <td className='global-tabla__tbody__tr__td-six capitalCase'>
                                        <button onClick={() => fetchDeleteResponsableId(responsable.id)} className='tabla-observaciones-button-eliminar'>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })
                    */}  
                </tbody>
            </table>
        </div>
    )
}

export default TablaListadoDeOficios
