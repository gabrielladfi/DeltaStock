/* eslint-disable react/prop-types */
import './primaryinputliquidaciones.scss'

function PrimaryInputLiquidaciones({labelText, propValue, propFnInput, propPlaceholder, propName, propType}) {
    return (
        <div className='primaryinputliquidaciones-container'>
            <label className='primaryinputliquidaciones-container__label' htmlFor="">{ labelText }</label>
            <input 
                value={ propValue } 
                className='primaryinputliquidaciones-container__input'
                onChange={propFnInput}
                placeholder={propPlaceholder}
                type={ propType ? propType : 'text' }
                name={ propName }
                autoComplete='off'
            />
        </div>
    )
}

export default PrimaryInputLiquidaciones
