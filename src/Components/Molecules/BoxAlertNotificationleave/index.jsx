import PropTypes from 'prop-types'
import PrimaryButton from '@/Components/PrimaryButton'
import './boxalertnotificationleave.scss'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall'

BoxAlertNotificationleave.propTypes = {
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

function BoxAlertNotificationleave({
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
        <div className='boxalertnotificationleave'>
            <div className='boxalertnotificationleave__title'>
                
            </div>
            <div className='boxalertnotificationleave__content'>
                <p className='boxalertnotificationleave__content__p'>{message}</p>
                <ExclamationTriangleIcon className='boxalertnotificationleave__content__icon' />
            </div>
            <div className='boxalertnotificationleave__button'>
                <SecondaryButtonNewSmall text={textButton} onClick={onClick} hoverColor={hoverColor}/>
                <PrimaryButtonNewSmall text={textButton2} onClick={onClickCancel} />
            </div>
        </div>
    )
}

export default BoxAlertNotificationleave
