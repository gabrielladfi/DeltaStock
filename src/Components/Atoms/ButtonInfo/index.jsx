/* eslint-disable react/prop-types */
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import './buttoninfo.scss'

function ButtonInfo({ onClick }) {

    return (
        <div onClick={onClick} className={`buttoninfo`}>
            <InformationCircleIcon className={'buttoninfo__icon'} />
        </div>
    )
}

export default ButtonInfo
