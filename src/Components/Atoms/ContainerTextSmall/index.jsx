import PropTypes from 'prop-types'
import './containertextsmall.scss'

ContainerTextSmall.propTypes = {
    children: PropTypes.node.isRequired
}

function ContainerTextSmall({ children }) {
    return (
        <section className='container-text-small'>
            {children}
        </section>
    )
}

export default ContainerTextSmall
