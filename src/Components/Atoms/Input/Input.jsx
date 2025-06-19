import { useState } from "react";
import PropTypes from "prop-types";
import './input.scss'

export const Input = ({ 
    textlabel, 
    label = true, 
    error, 
    errorMessage,
    placeholder,
    value,
    onChange,
    name,
    disabled, 
    required,   
    maxLength,
    minLength,
    autoComplete,
    autoFocus,
    readOnly,
    id,
    ref,
    regexOptions,
    errorMessageTypeCharacter,
    type,
    setError,
}) => {

    const [isErrorTypeCharacter, setIsErrorTypeCharacter] = useState(false);

    const validateInputTypeCharacter = (e) => {
        const regex = regexOptions;
        if (!regex.test(e.key) && e.key.length === 1) {
            e.preventDefault();
            setIsErrorTypeCharacter(true);
        } else {
            setIsErrorTypeCharacter(false);
            setError(false);
        }
    }

    return (
        <div className="input-container-basic">
            {
                label && (
                    <label className="input-label-basic__label" htmlFor={id}>
                        {textlabel}
                    </label>
                )
            }
            <div className="input-container-basic__input-container">
                <input 
                    className={`input-container-basic__input-container__input ${error ? 'error' : 'test'}`}
                    type={type}
                    ref={ref}
                    id={id} 
                    placeholder={error ? errorMessage : placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    readOnly={readOnly}
                    onKeyDown={regexOptions ? validateInputTypeCharacter : undefined}
                    name={name}
                />
            </div>
            
            {
                isErrorTypeCharacter && (
                    <p className="input-container-basic__input-container__error-message">
                        {errorMessageTypeCharacter}
                    </p>
                )
            }
        </div>
    )
};

Input.propTypes = {
    textlabel: PropTypes.string,
    label: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    ref: PropTypes.object,
    regexOptions: PropTypes.instanceOf(RegExp),
    errorMessageTypeCharacter: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    setError: PropTypes.func,
}