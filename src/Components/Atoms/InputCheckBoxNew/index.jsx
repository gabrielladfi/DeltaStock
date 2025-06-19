import PropTypes from 'prop-types'
import './inputcheckboxnew.scss'

InputCheckBoxNew.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
}

function InputCheckBoxNew({
    checked,
    onChange,
    value,
    label,
    name,
}) {
    return (
        <div className='input-checkbox-new'>
            <input 
                checked={checked} 
                onChange={onChange} 
                value={value} 
                className='input-checkbox-new__input' 
                type="checkbox" 
                name={name}
            />
            <label className='input-checkbox-new__label' >{label}</label>
        </div>
    )
}

export default InputCheckBoxNew
