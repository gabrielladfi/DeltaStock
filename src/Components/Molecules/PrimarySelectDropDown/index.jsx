/* eslint-disable react/prop-types */
import './primaryinputliquidaciones.scss'

function PrimarySelectDropDown({labelText, propValue, propFnInput, propPlaceholder, propName, propOptions}) {
    return (
        <div className='primaryinputliquidaciones-div'>
            <label className='primaryinputliquidaciones-div__label' htmlFor="">{ labelText }</label>
            <select 
                value={ propValue } 
                className='primaryinputliquidaciones-div__input'
                onChange={propFnInput}
                placeholder={propPlaceholder}
                name={ propName }
                autoComplete='off'
            >
                <option value=''>Selecciona una opcion</option>
                {
                    propOptions &&
                    propOptions.map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default PrimarySelectDropDown