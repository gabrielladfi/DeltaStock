import PropTypes from 'prop-types';
import { useState } from 'react';
import './primaryinputnumbervalidator.scss';

PrimaryInputNumberValidator.propTypes = {
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

function PrimaryInputNumberValidator({
    value,
    onChange,
    name,
    placeholder,
    textLabel,
    autoComplete = "off",
    maxLength,
}) {

    const [isValidInput, setIsValidInput] = useState(true);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^[0-9+-]*$/;

        if (regex.test(inputValue)) {
            setIsValidInput(true);
            onChange(e);
        } else {
            setIsValidInput(false);
        }
    };

    const handleKeyDown = (e) => {
        const char = e.key;
        const regex = /^[0-9+-]$/;

        if (!regex.test(char) && char.length === 1) {
            setIsValidInput(false);
            e.preventDefault();
        }
    };

    return (
        <div className='primary-input-number-validator'>
            
            <label className='primary-input-number-validator__label' htmlFor={name}>
                {textLabel}
            </label>
            
            <input
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                name={name}
                type="text"
                placeholder={placeholder}
                className='primary-input-number-validator__input'
                aria-invalid={!isValidInput}
                autoComplete={autoComplete}
                id={name}
                maxLength={maxLength}
            />
        </div>
    );
}

export default PrimaryInputNumberValidator;
