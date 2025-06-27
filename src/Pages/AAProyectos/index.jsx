
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './aaproyectos.scss'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import DndContextComponent from '@/Components/Organisms/dndProgresse/DndContextComponent'
import { useContext, useState } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import Modal from '@/Components/Modal';
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew';
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext';
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall';
import ContainerTetxtPlain from '@/Components/Atoms/ContainerTetxtPlain';
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData';
import SecondaryButtonNewSmall from '@/Components/Atoms/SecondaryButtonNewSmall';

function AAProyectos() {

    const { openInfoProyecto, setOpenInfoProyecto } = useContext(GlobalState);

    //primero vamos a defeinir las columanas de nuestro tablero de progreso
    const columns = [
        {id: '0', nombre: 'Fund Presentation', peso: 0},
        {id: '1', nombre: 'Follow Up', peso: 1},
        {id: '2', nombre: 'Follow Up 2', peso: 2},
        {id: '3', nombre: 'Follow Up 3', peso: 3},
        {id: '4', nombre: 'Due Diligence', peso: 4},
        {id: '5', nombre: 'Q&A', peso: 5},
        {id: '6', nombre: 'Final Decision', peso: 6},
        {id: '7', nombre: 'Standby', peso: 7},
        {id: '8', nombre: 'Close Lost', peso: 8},
        {id: '9', nombre: 'Won', peso: 9},
    ];

    const [tasksArray, setTasksArray] = useState([
        {
            id: '2',
            investment: 'El proyecto es para la construcción de un edificio de 10 pisos',
            deal_name: 'Proyecto 1',
            stage: 'Fund Presentation',
        },
        {
            id: '1',
            investment: 'El proyecto es para la construcción de un edificio de 10 pisos',
            deal_name: 'Proyecto 2',
            stage: 'Fund Presentation',
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
                <TitleSectionInfo text='Proyectos' />
                <SecondaryButtonNewSmall
                    text={'Agregar Columna'}
                    onClick={() => {}}
                />
                <PrimaryButtonNewSmall
                    text={'Agregar Proyecto'}
                    onClick={() => {}}
                />
            </ContainerTitleButtonsAddData>
            <DndContextComponent columns={columns} tasksArray={tasksArray} fnActualizarTasks={handleAddTask} />
            {
                openInfoProyecto && 
                    <Modal>
                        <ModalBasicNew title='Información del proyecto' propFunctionCloseModal={() => setOpenInfoProyecto(false)}>
                            <ContainerTetxtPlain title='Tarea' text='Planimetría del lote' />
                            <ContainerTetxtPlain title='Nombre del Proyecto' text='Constuccion Alamos' />
                            <ContainerTetxtPlain title='Descripción' text='El proyecto es para la construcción de un edificio de 10 pisos' />
                            <ContainerTetxtPlain title='Cliente' text='Lebsack-Reinger' />
                            <ContainerTetxtPlain title='Fecha de inicio' text='2025-01-01' />
                            <ContainerTetxtPlain title='Fecha de fin:' text='2025-01-01' />
                            <PrimaryButtonNewSmall text='Editar' />
                        </ModalBasicNew>
                    </Modal>
                
            }
        </PrincipalPage>
    )
}

export default AAProyectos
