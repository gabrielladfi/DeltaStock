/* eslint-disable react/prop-types */
import { PuzzlePieceIcon } from '@heroicons/react/24/outline'

import './buttonpathguide.scss'

function ButtonPathGuide({ onClick }) {



    return (
        <button onClick={onClick} className={`button-path-guide`}>
            <PuzzlePieceIcon className={'button-path-guide__icon'} />
            
        </button>
    )
}

export default ButtonPathGuide
