import PropTypes from 'prop-types'
import './primarybuttonnewsmall.scss'

PrimaryButtonNewSmall.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string
}

function PrimaryButtonNewSmall({ text, onClick, backgroundColor, color }) {
    return (
        <button style={{ backgroundColor: backgroundColor, color: color }} type={'button'} className='primary-button-new-small' onClick={onClick}>
            {text}
        </button>
    )
}

export default PrimaryButtonNewSmall
