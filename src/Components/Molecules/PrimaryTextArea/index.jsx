/* eslint-disable react/prop-types */
import './primaryinputliquidaciones.scss'

function PrimaryTextArea({labelText, propValue, propFnInput, propPlaceholder, propName, propType}) {
    return (
        <div className='primary-text-area'>
            <label className='primary-text-area__label' htmlFor="">{ labelText }</label>
            <textarea 
                value={ propValue } 
                className='primary-text-area__textarea'
                onChange={propFnInput}
                placeholder={propPlaceholder}
                type={ propType ? propType : 'text' }
                name={ propName }
                autoComplete='off'
            />
        </div>
    )
}

export default PrimaryTextArea
