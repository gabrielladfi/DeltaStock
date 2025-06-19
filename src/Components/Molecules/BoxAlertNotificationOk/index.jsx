import PropTypes from 'prop-types'
import PrimaryButton from '@/Components/PrimaryButton'
import './boxalertnotificationok.scss'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'

BoxAlertNotificationOk.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    textButton: PropTypes.string.isRequired,
    textButton2: PropTypes.string.isRequired,
    onClickCancel: PropTypes.func.isRequired,
    hoverColor: PropTypes.string
}

function BoxAlertNotificationOk({
    title,
    message,
    image,
    alt,
    onClick,
    textButton,
    textButton2,
    onClickCancel,
    hoverColor
}) {
    return (
        <div className='boxalertnotificationok'>
            <div className='boxalertnotificationok__title'>
                
            </div>
            <div className='boxalertnotificationok__content'>
                <p className='boxalertnotificationok__content__p'>{message}</p>
                <CheckCircleIcon className='boxalertnotificationok__content__icon' />
            </div>
            <div className='boxalertnotificationok__button'>
                <PrimaryButtonNewSmall text={textButton2} onClick={onClick} />
            </div>
        </div>
    )
}

export default BoxAlertNotificationOk
