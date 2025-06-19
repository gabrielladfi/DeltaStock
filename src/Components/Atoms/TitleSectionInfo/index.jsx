import PropTypes from 'prop-types'
import './titlesectioninfo.scss'

TitleSectionInfo.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

function TitleSectionInfo({ text, color }) {
    return (
        <h3 style={{ color: color }} className={`title-section-info`}>
            {text}
        </h3>
    )
}

export default TitleSectionInfo
