/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline'
import './sectionclosermodals.scss'

function SectionClosermodals({ propTitleModal, prophandleCerrarModal }) {
    return (
        <div className='sectionclosermodals__header'>
                <p className='sectionclosermodals__header__p'>{propTitleModal}</p>
                <button onClick={prophandleCerrarModal} className='sectionclosermodals__header__button'>
                    <XMarkIcon className='sectionclosermodals__header__button__icon' />
                </button>
            </div>
    )
}

export default SectionClosermodals
