import PropTypes from 'prop-types';
import { useState } from 'react';
import { onlyLetters } from '@/Utils/validatorsFunctions';
import './primaryinputtextvalidator.scss';

PrimaryInputTextValidator.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    textLabel: PropTypes.string,
    maxLength: PropTypes.number,
};

function PrimaryInputTextValidator({
    value,
    onChange,
    name,
    placeholder,
    textLabel,
    maxLength,
}) {

    const [isOnlyLetters, setIsOnlyLetters] = useState(true);

    const handleChange = (e) => {
        onChange(e);
    };

    const handleKeyDown = (e) => {
        const char = e.key;
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\W]$/;

        // ⚠️ Solo bloquear si es un carácter imprimible
        if (!regex.test(char) && char.length === 1) {
            setIsOnlyLetters(false);
            e.preventDefault();
        }
    };

    return (
        <div className='primary-input-text-validator'>
            <label className='primary-input-text-validator__label' htmlFor={name}>
                {textLabel}
            </label>
            
            <input
                value={value}
                onChange={handleChange}
                //onKeyDown={handleKeyDown}
                name={name}
                type="text"
                placeholder={placeholder}
                className='primary-input-text-validator__input'
                //aria-invalid={!isOnlyLetters}
                id={name}
                autoComplete='off'
                maxLength={maxLength}
            />
        </div>
    );
}

export default PrimaryInputTextValidator;
