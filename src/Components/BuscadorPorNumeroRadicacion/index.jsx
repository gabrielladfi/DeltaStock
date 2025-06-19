/* eslint-disable react/prop-types */
import BoxContainerInputsByInfo from '../Atoms/BoxContainerInputsByInfo';
import { Input } from '../Atoms/Input/Input';
import TitleSectionInfo from '../Atoms/TitleSectionInfo';
import NumeroRadicacionFechaNR from '../Molecules/NumeroRadicacionFechaNR';
import PrincipalPage from '../Pages/PrincipalPage';
import './buscadorpornumeroradicacion.scss'

function BuscadorPorNumeroRadicacion({ children, setState }) {

    function handleChange(e) {
        setState(e.target.value);
    }


    return (
        <section className='buscador-por-numero-radicacion-section-container'>       
            <BoxContainerInputsByInfo>
                <TitleSectionInfo text={`Busqueda por expediente`} />
                <Input
                    textlabel='Buscar Expediente'
                    type='text'
                    placeholder='Ingrese Busqueda'
                    onChange={handleChange}
                />
            </BoxContainerInputsByInfo>    
            <div className='buscador-por-numero-radicacion-section-container__div-border'></div>        
            <section className='buscador-por-numero-radicacion-section'>
                {children}
            </section>
        </section>
    )
}

export default BuscadorPorNumeroRadicacion
