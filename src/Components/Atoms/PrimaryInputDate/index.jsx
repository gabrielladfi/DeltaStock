import PropTypes from 'prop-types';
import './primaryinputdate.scss'

PrimaryInputDate.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeFn: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    blockWriteInput: PropTypes.bool,  //esta propiedad es para bloquear la escritura en el input y es opcional
    label: PropTypes.string,
    type: PropTypes.string
};

function PrimaryInputDate({
    value,
    onChangeFn,
    name,
    blockWriteInput,
    label,
    type = 'date'
}) {
    return (
        <div className='primaryinputdate-container'>
            <label className='primaryinputdate-container__label' htmlFor="">{label}</label>
            <input 
                type={type} 
                value={value}
                onChange={onChangeFn}
                className='primaryinputdate-container__input'
                name={name}
                onKeyDown={(e) => blockWriteInput && e.preventDefault()}
            />
        </div>
    )
}

export default PrimaryInputDate
