import PropTypes from 'prop-types';
import './primaryinputwithoutvalidator.scss';

PrimaryInputWithOutValidator.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    classNameContainer: PropTypes.string,
    textLabel: PropTypes.string,
    classNameLabel: PropTypes.string,
    maxLength: PropTypes.number,
};

function PrimaryInputWithOutValidator({
    value,
    onChange,
    name,
    placeholder,
    className,
    classNameContainer,
    textLabel,
    classNameLabel,
    maxLength,
}) {

    const handleChange = (e) => {
        onChange(e);
    };

    

    return (
        <div className={classNameContainer}>
            {textLabel && (
                <label className={classNameLabel} htmlFor={name}>
                    {textLabel}
                </label>
            )}
            <input
                value={value}
                onChange={handleChange}
                name={name}
                type="text"
                placeholder={placeholder}
                className={className}
                id={name}
                autoComplete='off'
                maxLength={maxLength}
            />
        </div>
    );
}

export default PrimaryInputWithOutValidator;
