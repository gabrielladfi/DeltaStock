import './menuliquidaciones.scss'
import MenuCard from '@/Components/MenuCard'
import { HomeModernIcon, TableCellsIcon, BuildingStorefrontIcon, BuildingOfficeIcon, TicketIcon } from '@heroicons/react/24/outline'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import PageMenu from '@/Components/Pages/PageMenu'

function MenuLiquidaciones() {

    const { navigateToCargoVariableVivienda, navigateToTablaDeResultadosLogico } = useNavigateProvider()
    const { setValorConfiguracionExpensas } = useContext(GlobalState)

    function handleNavigation(PropValue) {
        setValorConfiguracionExpensas(PropValue)
        navigateToCargoVariableVivienda()
    }

    const menu = [
        {id: 0, name: 'Cargo Fijo', trigger:() => handleNavigation('cargo fijo'), icon: <TicketIcon className='menucard__icon' />},
        {id: 1, name: 'LC Construccion Vivienda', trigger:  () => {handleNavigation('LC Construccion Vivienda')}, icon: <HomeModernIcon className='menucard__icon' />},
        {id: 2, name: 'LC Construccion Comercial', trigger:() => {handleNavigation('LC Construccion Comercial')}, icon: <BuildingStorefrontIcon className='menucard__icon' />},
        {id: 3, name: 'Urbanismo', trigger: () => {handleNavigation('Urbanismo')}, icon: <BuildingOfficeIcon className='menucard__icon' />},
        {id: 4, name: 'Tablas de Resultados', trigger: navigateToTablaDeResultadosLogico, icon: <TableCellsIcon className='menucard__icon' />},
    ]

    return (
        <PageMenu>
            {
                menu?.map(card => (
                    <MenuCard key={card.id} text={card.name} propFn={card.trigger} icon={card.icon} />
                ))
            }
        </PageMenu>
    )
}

export default MenuLiquidaciones
