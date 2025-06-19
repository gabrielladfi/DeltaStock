import PropTypes from 'prop-types'
import './primarycontainerfilters.scss'

PrimaryContainerFilters.propTypes = {
    children: PropTypes.node
}

function PrimaryContainerFilters({ children }) {
    return (
        <div className='primary-container-filters'>
            { children }
        </div>
    )
}

export default PrimaryContainerFilters
