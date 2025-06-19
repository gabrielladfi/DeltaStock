import PropTypes from 'prop-types';
import './primarylabel.scss'

PrimaryLabel.propTypes = {
    labelText: PropTypes.string.isRequired,
    className: PropTypes.string,
    htmlFor: PropTypes.string,
};

function PrimaryLabel({ labelText, className, htmlFor }) {
    return (
        <label 
            className={className} 
            htmlFor={htmlFor}
        >
            { labelText }
        </label>
    )
}

export default PrimaryLabel
