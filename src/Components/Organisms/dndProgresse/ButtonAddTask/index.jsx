import { PlusIcon } from '@heroicons/react/24/outline'
import './buttonaddtask.scss'

function ButtonAddTask() {
    return (
        <button>
            <PlusIcon className='button-add-task__icon'/>
            <span className='button-add-task__span'>Add Task</span>
        </button>
    )
}

export default ButtonAddTask
