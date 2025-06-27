import { useState } from 'react';
import './aatareas.scss'
import PrincipalPage from '@/Components/Pages/PrincipalPage';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import DndContextComponent from '@/Components/Organisms/dndProgresse/DndContextComponent';

function AATareas() {

    //primero vamos a defeinir las columanas de nuestro tablero de progreso
    const columns = [
        {id: '0', nombre: 'Por Hacer', peso: 0},
        {id: '1', nombre: 'En Proceso', peso: 1},
        {id: '2', nombre: 'Completadas', peso: 2},
    ];

    const [tasksArray, setTasksArray] = useState([
        {
            id: '2',
            investment: 'El proyecto es para la construcción de un edificio de 10 pisos',
            deal_name: 'Proyecto 1',
            stage: 'Por Hacer',
        },
        {
            id: '1',
            investment: 'El proyecto es para la construcción de un edificio de 10 pisos',
            deal_name: 'Proyecto 2',
            stage: 'Por Hacer',
        }
    ]);

    function handleAddTask(id, task) {
        // Filter out the task from its previous column and add it to the new one
        const updatedTasks = tasksArray.filter(t => t.id !== id);
        setTasksArray([...updatedTasks, {id, ...task}]);
    }


    return (
        <PrincipalPage pathActive={'Proyectos'}>
            <ContainerTitleButtonsAddData>
                <TitleSectionInfo text='Tareas' />
                <SecondaryButtonNewSmall
                    text={'Agregar Columna'}
                    onClick={() => {}}
                />
                <PrimaryButtonNewSmall
                    text={'Agregar Tarea'}
                    onClick={() => {}}
                />
            </ContainerTitleButtonsAddData>
            <DndContextComponent columns={columns} tasksArray={tasksArray} fnActualizarTasks={handleAddTask} />
        </PrincipalPage>
    )
}

export default AATareas
