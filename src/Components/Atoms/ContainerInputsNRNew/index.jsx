import PropTypes from 'prop-types'
import './containerinputsnrnew.scss'

ContainerInputsNRNew.propTypes = {
    children: PropTypes.node.isRequired
}

function ContainerInputsNRNew({ children }) {
    return (
        <section className='container-inputs-nr-new'>
            {children}
        </section>
    )
}

export default ContainerInputsNRNew
