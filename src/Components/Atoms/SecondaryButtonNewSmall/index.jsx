import PropTypes from 'prop-types'
import './secondarybuttonnewsmall.scss'

SecondaryButtonNewSmall.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    hoverColor: PropTypes.string
}

function SecondaryButtonNewSmall({ text, onClick, hoverColor }) {
    return (
        <button className={`secondary-button-new-small ${hoverColor}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default SecondaryButtonNewSmall
