import PropTypes from 'prop-types'
import './inputdatenr.scss'

InputDateNR.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    blockWriteInput: PropTypes.bool,
}

function InputDateNR({ label, name, value, onChange, blockWriteInput }) {

    //const inputRef = useRef(null);


    return (
        <section className='inputdatenr'>
            <label className='inputdatenr__label' htmlFor="">{label}</label>
            <div className='inputdatenr__input-container'>
                <input
                    className='inputdatenr__input-container__input' 
                    type="date"
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    onKeyDown={(e) => blockWriteInput && e.preventDefault()}
                    placeholder='dd/mm/yyyy'
                />
            </div>
            
        </section>
    )
}

export default InputDateNR
