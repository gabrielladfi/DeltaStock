import PropTypes from 'prop-types'
import './containerbuttonsbackandnext.scss'

ContainerButtonsBackandNext.propTypes = {
    children: PropTypes.node.isRequired
}

function ContainerButtonsBackandNext({ children }) {
    return (
        <section className='container-buttons-backandnext'>
            {children}
        </section>
    )
}

export default ContainerButtonsBackandNext
