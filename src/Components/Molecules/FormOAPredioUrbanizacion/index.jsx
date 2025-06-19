
import PrimaryDropDown from '@/Components/Atoms/PrimaryDropDown'
import './formoaprediourbanizacion.scss'
import DropdownSearch from '@/Pages/CrearNuevaSolicitudNR/Components/DropdownSearch'

function FormOAPredioUrbanizacion() {

    const dataComunas = [
        {
            id: 1,
            value: 'Comuna 1',
            option: 'Comuna 1'
        },
        {
            id: 2,
            value: 'Comuna 2',
            option: 'Comuna 2'
        },
        {
            id: 3,
            value: 'Comuna 3',
            option: 'Comuna 3'
        },
        {
            id: 4,
            value: 'Comuna 4',
            option: 'Comuna 4'
        },
        {
            id: 5,
            value: 'Comuna 5',
            option: 'Comuna 5'
        }
    ]

    const dataEstratos = [
        {
            id: 1,
            value: 'Estrato 1',
            option: 'Estrato 1'
        },
        {
            id: 2,
            value: 'Estrato 2',
            option: 'Estrato 2'
        },
        {
            id: 3,
            value: 'Estrato 3',
            option: 'Estrato 3'
        },
        {
            id: 4,
            value: 'Estrato 4',
            option: 'Estrato 4'
        },
        {
            id: 5,
            value: 'Estrato 5',
            option: 'Estrato 5'
        },
        {
            id: 6,
            value: 'Estrato 6',
            option: 'Estrato 6'
        },  
    ]

    return (
        <div className='form-oa-predio-urbanizacion__container'>
            <span className='form-oa-predio-urbanizacion__title'>Urbanización</span>
            <DropdownSearch />
            <PrimaryDropDown propPlaceholderOption={'Seleccione una Comuna'} propOptions={dataComunas} />
            <PrimaryDropDown propPlaceholderOption={'Seleccione un Estrato'} propOptions={dataEstratos} />

        </div>
    )
}

export default FormOAPredioUrbanizacion
