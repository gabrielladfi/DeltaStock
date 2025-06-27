/* eslint-disable react/prop-types */

import { useDraggable } from '@dnd-kit/core'
import './dndtask.scss'
import { useContext, useRef } from 'react';
import { GlobalState } from '@/Context/GlobalContext';


function DndTask({task, state}) {

    const { setOpenInfoProyecto } = useContext(GlobalState);

    const {attributes, listeners: originalListeners, setNodeRef, transform, isDragging} = useDraggable({
        id: task.id
    })

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    } : undefined

    const pointerDownTime = useRef(0);
    const dragTimeoutRef = useRef(null);

    // Modify listeners to only allow drag after 1 second
    const listeners = {
        ...originalListeners,
        onPointerDown: (e) => {
            pointerDownTime.current = Date.now();
            dragTimeoutRef.current = setTimeout(() => {
                originalListeners.onPointerDown(e);
            }, 100);
        },
        onPointerUp: () => {
            if (dragTimeoutRef.current) {
                clearTimeout(dragTimeoutRef.current);
            }
            if (originalListeners.onPointerUp) {
                originalListeners.onPointerUp();
            }
        }
    };

    const handleClick = () => {
        const elapsed = Date.now() - pointerDownTime.current;
        if (elapsed < 100 && !isDragging) {
            console.log(`Abrir modal para tarea`);
            setOpenInfoProyecto(true)
        }
    };

    return ( 
        <div 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            className={`dnd-task ${state === task.id ? 'dnd-task--active' : ''}`}
            style={style}
            onClick={handleClick}
        >
            <h3 className='dnd-task__title'>{task.deal_name}</h3>
            <div>
                <span className='dnd-task__title-description'>Descripción:</span>
                <p className='dnd-task__description'>{task.investment}</p>

            </div>
            
        </div>
    )
}

export default DndTask
