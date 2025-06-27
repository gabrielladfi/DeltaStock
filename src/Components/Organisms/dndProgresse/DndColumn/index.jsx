/* eslint-disable react/prop-types */
import { useDroppable } from '@dnd-kit/core'
import DndTask from '../DndTask'
import './dndcolumn.scss'

function DndColumn({column, tasks, state}) {

    const { setNodeRef } = useDroppable({
        id: column.nombre
    })

    

    return (
        <>
            <div className='dnd-column'>
                <div className='dnd-column-header'>
                    <h2 className='dnd-column__h2'>{column.nombre}</h2>
                    <div className={`dnd-column-header__div-color dnd-column-header__div-color-${column.peso}`}></div>
                </div>
                <div className='dnd-column__total-tasks'>
                    <p className='dnd-column__total-tasks__p'>Total Deals: {tasks.length}</p>
                </div>
                
                <div ref={setNodeRef} className='dnd-column__container-tasks'>
                    {
                        tasks.map((task) => (
                            <DndTask key={task.id} task={task} state={state}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default DndColumn
