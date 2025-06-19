import { PropTypes } from 'prop-types'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import './modalbasicnew.scss'
import { XMarkIcon } from '@heroicons/react/24/outline'

ModalBasicNew.propTypes = {
    propFunctionCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
}

function ModalBasicNew({ propFunctionCloseModal, children, title }) {
    return (
        <div className='modal-basic-new'>
            <div className='modal-basic-new__header'>
                <TitleSectionInfo text={title} />
                <button onClick={() => propFunctionCloseModal()} className='modal-basic-new__header__button'>
                    <XMarkIcon className='modal-basic-new__header__button__icon' />
                </button>
            </div>
            {children}
        </div>
    )
}

export default ModalBasicNew
