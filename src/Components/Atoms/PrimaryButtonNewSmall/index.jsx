import PropTypes from 'prop-types'
import './primarybuttonnewsmall.scss'

PrimaryButtonNewSmall.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string
}

function PrimaryButtonNewSmall({ text, onClick, backgroundColor }) {
    return (
        <button style={{ backgroundColor: backgroundColor }} type={'button'} className='primary-button-new-small' onClick={onClick}>
            {text}
        </button>
    )
}

export default PrimaryButtonNewSmall
