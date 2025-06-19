import PropTypes from 'prop-types'
import './titlesectioninfomodal.scss'

TitleSectionInfoModal.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

function TitleSectionInfoModal({ text, color }) {
    return (
        <h3 style={{ color: color }} className={`title-section-info-modal`}>
            {text}
        </h3>
    )
}

export default TitleSectionInfoModal
