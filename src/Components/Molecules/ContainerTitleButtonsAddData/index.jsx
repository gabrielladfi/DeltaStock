import PropTypes from 'prop-types'
import './containertitlebuttonsadddata.scss'

ContainerTitleButtonsAddData.propTypes = {
    children: PropTypes.node.isRequired,
}

function ContainerTitleButtonsAddData({ children }) {
    return (
        <section className='containertitlebuttonsadddata'>
            {children}
        </section>
    )
}

export default ContainerTitleButtonsAddData
