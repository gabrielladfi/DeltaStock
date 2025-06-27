/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import './dndcontextcomponent.scss'
import DndColumn from '../DndColumn';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { GlobalState } from '@/Context/GlobalContext';


function DndContextComponent({ columns, tasksArray, fnActualizarTasks }) {

    const { setOpenInfoProyecto } = useContext(GlobalState);
    
    //ahora vamos a definir el estado de nuestro tablero
    const [tasks, setTasks] = useState(tasksArray);
    const [activeId, setActiveId] = useState(null);
    const [ taskSelect, setTaskSelect ] = useState({});
    const [ dealActualizado, setDealActualizado ] = useState({});
    
    useEffect(() => {
        if (Object.keys(dealActualizado).length > 0) {
            fnActualizarTasks(dealActualizado.id, dealActualizado);
        }
    }, [ dealActualizado ]);


    function handleDragEnd(event) {
        const { active, over } = event;

        if(!over) return;

        const taskId = active.id;
        const newSatatus = over.id;

        setTasks(() => tasks.map(task => task.id === taskId ? {
                ...task,
                stage: newSatatus
            }: task,
        ))

        const dealParaActualizar = tasks.find(task => task.id === taskId);

        setDealActualizado({
            ...dealParaActualizar,
            stage: newSatatus
        })

        setActiveId(event.active.id);
        setTaskSelect({})
    }

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
        setTaskSelect(tasks.find(task => task.id === event.active.id));
    };

    useEffect(() => {
        setTasks(tasksArray);
    }, [tasksArray]);

    

    return (
        <div className='dnd-context-container'>
            <div className='dnd-context-container__columns'>
                <DndContext onDragStart={handleDragStart} modifiers={[restrictToWindowEdges]} autoScroll={true} onDragEnd={handleDragEnd}>
                    {columns.map((column) => (
                        <DndColumn key={column.id} column={column} tasks={tasks.filter(task => task.stage === column.nombre )} state={taskSelect.id} />
                    ))}
                    <DragOverlay>
                    {activeId ? (
                        console.log(taskSelect),
                    <div
                        className='dnd-task-active'
                        
                    >
                        <h3 className='dnd-task-active__title'>{taskSelect.deal_name}</h3>
                        <div>
                            <span className='dnd-task__title-description modificado-active'>Descripcion:</span>
                            <p className='dnd-task__description modificado-active'>{`${taskSelect.investment}`}</p>
                        </div>
                    </div>
                ) : null}

                    </DragOverlay>
                </DndContext>
            </div>

        </div>
    )
}

export default DndContextComponent
