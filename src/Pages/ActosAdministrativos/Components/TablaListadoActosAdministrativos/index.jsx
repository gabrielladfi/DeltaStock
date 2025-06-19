//import { useFetchDeleteTitularId } from '../../Hooks/useFetchDeleteTitularId';
//import { useFetchGetListadoTitulares } from '../../Hooks/useFetchGetListadoTitulares';
import './tablalistadoactosadministrativos.scss'

function TablaListadoActosAdministrativos() {

    
    //const { listadoTitulares } = useFetchGetListadoTitulares();
    //const { fetchDeleteTitularId } = useFetchDeleteTitularId();

    
    

    return (
        <div className='global-tablabuscador-div-tabla--categoria'>
        <table className='global-tabla tabla-observaciones--modificador'>
            <thead className='global-tabla__thead'>
                <tr className='global-tabla__thead__tr'>
                    <th className='thead-tabla-observacion--modificador'>No Acto Admin.</th>
                    <th className='thead-tabla-observacion--modificador-dos'>Fecha de Expedicion</th>
                    <th className='thead-tabla-observacion--modificador-dos'>Fecha de Entregado</th>
                    <th className='thead-tabla-observacion--modificador-dos'>Fecha de Ejecutoria</th>
                    <th className='thead-tabla-observacion--modificador-dos'>Vigencia</th>
                    <th className='thead-tabla-observacion--modificador-dos'>Tipo de acto</th>
                    <th className='thead-tabla-observacion--modificador-tres'>Motivo</th>
                    <th className='thead-tabla-observacion--modificador-tres'>Plano Urbano</th>
                    <th className='thead-tabla-observacion--modificador-tres'>Razón Publicado</th>
                    <th className='thead-tabla-observacion--modificador-tres'>F. Edicto</th>
                    <th className='thead-tabla-observacion--modificador-tres'>T. Documento</th>
                </tr>
            </thead>
            <tbody className='global-tabla__tbody'> 
                {/*
                    listadoTitulares?.map((titular, index) => {
                        return (
                            <tr key={index} className='global-tabla__tbody__tr capitalCase'>
                                <td className='global-tabla__tbody__tr__td-one capitalCase'>{titular.id}</td>
                                <td className='global-tabla__tbody__tr__td-two capitalCase'>{titular.numero_radicacion}</td>
                                <td className='global-tabla__tbody__tr__td-three capitalCase'>{titular.nombre.toLowerCase()}</td>
                                <td className='global-tabla__tbody__tr__td-four capitalCase'>{titular.email}</td>
                                <td className='global-tabla__tbody__tr__td-five capitalCase--Observacion'>{titular.phone}</td>
                                <td className='global-tabla__tbody__tr__td-five capitalCase'>{titular.dni}</td>
                                <td className='global-tabla__tbody__tr__td-six capitalCase'>
                                    <button onClick={() => fetchDeleteTitularId(titular.id)} className='tabla-observaciones-button-eliminar'>Eliminar</button>
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

export default TablaListadoActosAdministrativos
