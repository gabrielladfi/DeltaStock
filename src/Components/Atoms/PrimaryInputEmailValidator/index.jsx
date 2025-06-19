import PropTypes from 'prop-types';
import { useState } from 'react';
import { isValidEmail } from '@/Utils/validatorsFunctions';
import './primaryinputemailvalidator.scss';

PrimaryInputEmailValidator.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    classNameError: PropTypes.string,
    classNameContainer: PropTypes.string,
    textLabel: PropTypes.string,
    classNameLabel: PropTypes.string,
    autoComplete: PropTypes.string,
    maxLength: PropTypes.number,
};

function PrimaryInputEmailValidator({
    value,
    onChange,
    name,
    placeholder,
    textLabel,
    autoComplete = 'off',
    maxLength,
}) {
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleChange = (e) => {
        const email = e.target.value;

        setIsEmailValid(isValidEmail(email) || email === '');
        onChange(e); // Mantenemos compatibilidad total con tu lógica
    };

    return (
        <div className='primary-input-email-validator'>
            <label className='primary-input-email-validator__label' htmlFor={name}>
                {textLabel}
            </label>
            <input
                type="email"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className='primary-input-email-validator__input'
                autoComplete={autoComplete}
                aria-invalid={!isEmailValid}
                id={name}
                maxLength={maxLength}
            />
        </div>
    );
}

export default PrimaryInputEmailValidator;
