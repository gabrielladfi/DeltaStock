import PropTypes from 'prop-types'
import './textareacomponent.scss'

TextAreaComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    textLabel: PropTypes.string.isRequired,
    maxLength: PropTypes.number.isRequired,
}

function TextAreaComponent({
    value,
    onChange,
    name,
    placeholder,
    textLabel,
    maxLength,
}) {
    return (
        <div className='text-area-component'>
            <label className='text-area-component__label'>
                {textLabel}
            </label>
            <textarea 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='text-area-component__textarea' 
                type="text" 
                name={name}
                maxLength={maxLength}
            />
        </div>
    )
}

export default TextAreaComponent
