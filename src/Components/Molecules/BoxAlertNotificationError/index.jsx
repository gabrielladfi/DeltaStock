import PropTypes from 'prop-types'
import PrimaryButton from '@/Components/PrimaryButton'
import './boxalertnotificationerror.scss'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'

BoxAlertNotificationError.propTypes = {
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

function BoxAlertNotificationError ({
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
        <div className='boxalertnotificationerror'>
            <div className='boxalertnotificationerror__title'>
                
            </div>
            <div className='boxalertnotificationerror__content'>
                <p className='boxalertnotificationerror__content__p'>{message}</p>
                <ExclamationTriangleIcon className='boxalertnotificationerror__content__icon' />
            </div>
            <div className='boxalertnotificationerror__button'>
                <PrimaryButtonNewSmall text={textButton2} onClick={onClick} />
            </div>
        </div>
    )
}

export default BoxAlertNotificationError
