import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import './statusnavigate.scss'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'

StatusNavigate.propTypes = {
    firstpathname: PropTypes.string.isRequired,
    secondpathname: PropTypes.string,
    thirdpathname: PropTypes.string,
    fourthpathname: PropTypes.string,
    pathActive: PropTypes.string,
    firstpathnameNavigate: PropTypes.func,
}

function StatusNavigate({ firstpathname, secondpathname, thirdpathname, fourthpathname, pathActive, firstpathnameNavigate }) {

    const { navigateToMenu } = useNavigateProvider()

    return (
        <section className='statusnavigate'>
            <span onClick={navigateToMenu} className='statusnavigate__span'>Inicio</span>
            {
                firstpathname && (
                    <>
                        <ChevronRightIcon className='statusnavigate__icon' />
                        <span onClick={firstpathnameNavigate} className='statusnavigate__span'>{firstpathname}</span>
                    </>
                )
            }
            {
                secondpathname && (
                    <>
                        <ChevronRightIcon className='statusnavigate__icon' />
                        <span>{secondpathname}</span>
                    </>
                )
            }
            {
                thirdpathname && (
                    <>
                        <ChevronRightIcon className='statusnavigate__icon' />
                        <span>{thirdpathname}</span>
                    </>
                )
            }
            {
                fourthpathname && (
                    <>
                        <ChevronRightIcon className='statusnavigate__icon' />
                        <span>{fourthpathname}</span>
                    </>
                )
            }
            {
                pathActive && (
                    <>
                        <ChevronRightIcon className='statusnavigate__icon' />
                        <span className='statusnavigate__span--active'>{pathActive}</span>
                    </>
                )
            }
        </section>
    )
}

export default StatusNavigate
