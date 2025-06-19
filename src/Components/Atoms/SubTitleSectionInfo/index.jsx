import PropTypes from 'prop-types'
import './titlesectioninfo.scss'

SubTitleSectionInfo.propTypes = {
    text: PropTypes.string.isRequired
}

function SubTitleSectionInfo({ text }) {
    return (
        <p className='sub-title-section-info'>
            {text}
        </p>
    )
}

export default SubTitleSectionInfo
