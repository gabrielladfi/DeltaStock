import PropTypes from 'prop-types';
import './primarylabeledinput.scss'

PrimaryLabeledInput.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

function PrimaryLabeledInput({ children, className }) {
    return (
        <div className={className}>
            { children }
        </div>
    )
}

export default PrimaryLabeledInput
