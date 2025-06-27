import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './aastock.scss'
import AATablaStock from '@/Components/Molecules/AATablaStock'
import ContainerTitleButtonsAddData from '@/Components/Molecules/ContainerTitleButtonsAddData'
import TitleSectionInfo from '@/Components/Atoms/TitleSectionInfo'
import PrimaryButtonNewSmall from '@/Components/Atoms/PrimaryButtonNewSmall'
import Modal from '@/Components/Modal'
import { useContext, useState } from 'react'
import ModalBasicNew from '@/Components/Molecules/ModalBasicNew'
import ContainerButtonsBackandNext from '@/Components/Atoms/ContainerButtonsBackandNext'
import BoxContainerInputsByInfoBigScroll from '@/Components/Atoms/BoxContainerInputsByInfoBigScroll'
import { Input } from '@/Components/Atoms/Input/Input'
import PickList from '@/Components/Molecules/PickList'
import BoxContainerInputsByInfo from '@/Components/Atoms/BoxContainerInputsByInfo'
import { GlobalState } from '@/Context/GlobalContext'

function AAStock() {

    const { setValorParaFiltrar } = useContext(GlobalState);

    const [formFields, setFormFields] = useState([
        {
            id: 1,
            pieza: '1551ABK',
            ipn: '1551ABK-100L',
            revision: 'Rev-01',
            descripcion: 'Producto de ensamble',
            existencias: 37,
            estado: 'Completo',
            codigoLote: 'TR6478-78T5',
            ubicacion: 'Bodega 1',
            ordenCompra: 'WQ56-T5',
            piezaProveedor: '1551ABK-100L',
            um: 'Pq',
            min: 10,
            max: 100,
            valorPromedio: 100,
            valorTotal: 1000
        },
        {
            id: 2,
            pieza: 'DELP78-6T',
            ipn: 'DELP78-6T-200',
            revision: 'Rev-02', 
            descripcion: 'Componente electrónico',
            existencias: 25,
            estado: 'Incompleto',
            codigoLote: 'TR8965-12T3',
            ubicacion: 'Bodega 2',
            ordenCompra: 'WQ78-T9',
            piezaProveedor: 'DELP78-6T-200',
            um: 'Pq',
            min: 10,
            max: 100,
            valorPromedio: 100,
            valorTotal: 1000
        },
        {
            id: 3,
            pieza: 'RES45-8K',
            ipn: 'RES45-8K-300',
            revision: 'Rev-03',
            descripcion: 'Resistencia industrial',
            existencias: 50,
            estado: 'Completo',
            codigoLote: 'TR7412-96T4',
            ubicacion: 'Bodega 1',
            ordenCompra: 'WQ34-T2',
            piezaProveedor: 'RES45-8K-300',
            um: 'Kg',
            min: 10,
            max: 100,
            valorPromedio: 100,
            valorTotal: 1000
        },
        {
            id: 4,
            pieza: 'CAP12-4F',
            ipn: 'CAP12-4F-400',
            revision: 'Rev-01',
            descripcion: 'Capacitor de potencia',
            existencias: 15,
            estado: 'Completo',
            codigoLote: 'TR3698-45T7',
            ubicacion: 'Bodega 3',
            ordenCompra: 'WQ91-T6',
            piezaProveedor: 'CAP12-4F-400',
            um: 'Kg',
            min: 10,
            max: 100,
            valorPromedio: 100,
            valorTotal: 1000
        },
        {
            id: 5,
            pieza: 'IND89-2H',
            ipn: 'IND89-2H-500',
            revision: 'Rev-02',
            descripcion: 'Inductor de alta frecuencia',
            existencias: 42,
            estado: 'Incompleto',
            codigoLote: 'TR1478-63T1',
            ubicacion: 'Bodega 2',
            ordenCompra: 'WQ45-T8',
            piezaProveedor: 'IND89-2H-500',
            um: 'Kg',
            min: 10,
            max: 100,
            valorPromedio: 100,
            valorTotal: 1000
        },
        {
            id: 6,
            pieza: 'TRS34-7P',
            ipn: 'TRS34-7P-600',
            revision: 'Rev-03',
            descripcion: 'Transformador de voltaje',
            existencias: 30,
            estado: 'Completo',
            codigoLote: 'TR9632-87T2',
            ubicacion: 'Bodega 1',
            ordenCompra: 'WQ23-T4',
            piezaProveedor: 'TRS34-7P-600',
            um: 'Kg',
            min: 10,
            max: 100,
            valorPromedio: 100,
            valorTotal: 1000
        }
    ])

    const [addItem, setAddItem] = useState(false)
    const [updateItem, setUpdateItem] = useState(false)


    function handleChange(e) {
        setValorParaFiltrar(e.target.value);
    }

    const deleteItem = (e, item) => {
        e.stopPropagation();
        console.log(item.id)
        const updatedFormFields = formFields.filter(field => field.id !== item.id);
        setFormFields(updatedFormFields);
    }

    const updateStateItem = (e, item) => {
        e.stopPropagation();
        console.log(item.id)
        const updatedFormFields = formFields.map(field => field.id === item.id ? { ...field, estado: !field.estado } : field);
        setFormFields(updatedFormFields);
    }


    return (
        <PrincipalPage pathActive={'Stock'}>
            <TitleSectionInfo text='Artículos en inventario'/>
            <BoxContainerInputsByInfo>
                <TitleSectionInfo text={`Buscar pieza`} />
                <Input
                    textlabel='Buscar pieza'
                    type='text'
                    placeholder='Ingrese Busqueda'
                    onChange={handleChange}
                />
            </BoxContainerInputsByInfo>   
            <div className='div-line'></div>
            <ContainerTitleButtonsAddData>
                    <TitleSectionInfo text='Agregar nuevo artículo' />
                    <PrimaryButtonNewSmall
                        backgroundColor='#F2E416'
                        color='#000'
                        text={'Agregar artículo'}
                        onClick={() => setAddItem(true)}
                    />
                </ContainerTitleButtonsAddData>
            <AATablaStock setUpdateItem={setUpdateItem} dataTable={formFields} deleteItem={deleteItem} updateStateItem={updateStateItem} />
            {
                addItem &&
                <Modal>
                    <ModalBasicNew title={'Agregar artículo'} propFunctionCloseModal={() => setAddItem(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <Input textlabel='Pieza' placeholder='Ingrese la pieza' />
                            <Input textlabel='IPN' placeholder='Ingrese el IPN' />
                            <Input textlabel='Revisión' placeholder='Ingrese la revisión' />
                            <Input textlabel='Descripción' placeholder='Ingrese la descripción' />
                            <Input textlabel='Existencias' placeholder='Ingrese las existencias' />
                            <PickList label='Estado' optionSelected='Seleccionar estado' options={[
                                {
                                    option: 'Completo',
                                    value: 'completo'
                                },
                                {
                                    option: 'Incompleto',
                                    value: 'incompleto'
                                }
                            ]} />
                            <Input textlabel='Codigo de lote' placeholder='Ingrese el código de lote' />
                            <Input textlabel='Ubicación' placeholder='Ingrese la ubicación' />
                            <Input textlabel='Orden de compra' placeholder='Ingrese la orden de compra' />
                            <Input textlabel='Pieza del proveedor' placeholder='Ingrese la pieza del proveedor' />
                            <Input textlabel='UM' placeholder='Ingrese la unidad de medida' />
                            <Input textlabel='Min' placeholder='Ingrese el mínimo' />
                            <Input textlabel='Max' placeholder='Ingrese el máximo' />
                            <Input textlabel='Valor Promedio' placeholder='Ingrese el valor promedio' />
                            <Input textlabel='Valor Total' placeholder='Ingrese el valor total' />
                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall
                                text={'Guardar artículo'}
                                onClick={() => {}}
                            />
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                </Modal>
            }
            {
                updateItem &&
                <Modal>
                    <ModalBasicNew title={'Actualizar artículo'} propFunctionCloseModal={() => setUpdateItem(false)}>
                        <BoxContainerInputsByInfoBigScroll>
                            <Input textlabel='Pieza' placeholder='Ingrese la pieza' />
                            <Input textlabel='IPN' placeholder='Ingrese el IPN' />
                            <Input textlabel='Revisión' placeholder='Ingrese la revisión' />
                            <Input textlabel='Descripción' placeholder='Ingrese la descripción' />
                            <Input textlabel='Existencias' placeholder='Ingrese las existencias' />
                            <PickList label='Estado' optionSelected='Seleccionar estado' options={[
                                {
                                    option: 'Completo',
                                    value: 'completo'
                                },
                                {
                                    option: 'Incompleto',
                                    value: 'incompleto'
                                }
                            ]} />
                            <Input textlabel='Codigo de lote' placeholder='Ingrese el código de lote' />
                            <Input textlabel='Ubicación' placeholder='Ingrese la ubicación' />
                            <Input textlabel='Orden de compra' placeholder='Ingrese la orden de compra' />
                            <Input textlabel='Pieza del proveedor' placeholder='Ingrese la pieza del proveedor' />
                            <Input textlabel='UM' placeholder='Ingrese la unidad de medida' />
                            <Input textlabel='Min' placeholder='Ingrese el mínimo' />
                            <Input textlabel='Max' placeholder='Ingrese el máximo' />
                            <Input textlabel='Valor Promedio' placeholder='Ingrese el valor promedio' />
                            <Input textlabel='Valor Total' placeholder='Ingrese el valor total' />
                        </BoxContainerInputsByInfoBigScroll>
                        <ContainerButtonsBackandNext>
                            <PrimaryButtonNewSmall
                                text={'Guardar artículo'}
                                onClick={() => {}}
                            />
                        </ContainerButtonsBackandNext>
                    </ModalBasicNew>
                </Modal>
            }
        </PrincipalPage>
    )
}

export default AAStock
