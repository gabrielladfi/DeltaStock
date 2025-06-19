import PropTypes from 'prop-types'
import './containerbuttonsbackandnextsmall.scss'

ContainerButtonsBackandNextSmall.propTypes = {
    children: PropTypes.node.isRequired
}

function ContainerButtonsBackandNextSmall({ children }) {
    return (
        <section className='container-buttons-backandnext-small'>
            {children}
        </section>
    )
}

export default ContainerButtonsBackandNextSmall
