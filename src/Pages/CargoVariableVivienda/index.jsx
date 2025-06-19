import PrimaryInputLiquidaciones from '@/Components/Molecules/PrimaryInputLiquidaciones'
import TitleDropDown from '@/Components/Molecules/TitleDropDown'
import { useContext, useEffect, useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'
import { useFetchGet } from '@/Hooks/useFetchGet'
import { urlBase, urlGetConfiguracionCargoComercial, urlGetConfiguracionCargoUrbano, urlGetConfiguracionCargoVariableVivienda, urlPutConfiguracionCargoComercial, urlPutConfiguracionCargoUrbano, urlPutConfiguracionCargoVariableVivienda } from '@/Utils/UrlData'
import { AuthContextState } from '@/Context/AuthContextContext'
import { adaptercvv } from '@/Adapters/adapterCargoVariableVivienda'
import { useFetchPut } from '@/Hooks/useFetchPut'
import { GlobalState } from '@/Context/GlobalContext'
import PrincipalPage from '@/Components/Pages/PrincipalPage'
import './cargovariablevivienda.scss'

function CargoVariableVivienda() {

    const { token } = useContext(AuthContextState)
    const { valorConfiguracionExpensas } = useContext(GlobalState)


    const urlViviendaGet = `${urlBase}${urlGetConfiguracionCargoVariableVivienda}`
    const urlComercioGet = `${urlBase}${urlGetConfiguracionCargoComercial}`
    const urlUrbanismoGet = `${urlBase}${urlGetConfiguracionCargoUrbano}`
    const urlViviendaPut = `${urlBase}${urlPutConfiguracionCargoVariableVivienda}`
    const urlComercioPut = `${urlBase}${urlPutConfiguracionCargoComercial}`
    const urlUrbanismoPut = `${urlBase}${urlPutConfiguracionCargoUrbano}`

    const [ dataCargoVariableVivienda, setDataCargoVariableVivienda ] = useState({})

    const { dataGet } = useFetchGet(token, `${valorConfiguracionExpensas === 'LC Construccion Vivienda' ? urlViviendaGet : valorConfiguracionExpensas === 'LC Construccion Comercial' ? urlComercioGet : urlUrbanismoGet }`, '')

    useEffect(() => {
        if (dataGet) {
            setDataCargoVariableVivienda(adaptercvv(dataGet))
        }
    }, [dataGet])


    console.log(dataCargoVariableVivienda)

    const [ TitleDropDownOpen, setTitleDropDownOpen ] = useState({
        factorq: false,
        excepciones: false,
        factorI: false,
        areaq: false,
        factorM : false,
        factorUsos: false
    })

    function handleTitleDropDownOpenFactorq() {
        setTitleDropDownOpen({
            ...TitleDropDownOpen,
            factorq: !TitleDropDownOpen.factorq
        })
    }

    function handleTitleDropDownOpenFactorUsos() {
        setTitleDropDownOpen({
            ...TitleDropDownOpen,
            factorUsos: !TitleDropDownOpen.factorUsos
        })
    }

    function handleTitleDropDownOpenExcepciones() {
        setTitleDropDownOpen({
            ...TitleDropDownOpen,
            excepciones: !TitleDropDownOpen.excepciones
        })
    }

    function handleTitleDropDownOpenFactorI() {
        setTitleDropDownOpen({
            ...TitleDropDownOpen,
            factorI: !TitleDropDownOpen.factorI
        })
    }

    function handleTitleDropDownOpenFactorM() {
        setTitleDropDownOpen({
            ...TitleDropDownOpen,
            factorM: !TitleDropDownOpen.factorM
        })
    }

    function handleTitleDropDownOpenAreaQ() {
        setTitleDropDownOpen({
            ...TitleDropDownOpen,
            areaq: !TitleDropDownOpen.areaq
        })
    }

    function handlePutdata({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            [name]: value
        })
    }

    function handlePutdataFactorQinstitucional({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            factor_q: {
                ...dataCargoVariableVivienda.factor_q,
                institucional: {
                    ...dataCargoVariableVivienda.factor_q.institucional,
                    [name]: value
                }
            }
        })
    }

    function handlePutdataFactorQcomercio({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            factor_q: {
                ...dataCargoVariableVivienda.factor_q,
                comercio: {
                    ...dataCargoVariableVivienda.factor_q.comercio,
                    [name]: value
                }
            }
        })
    }

    function handlePutdataFactorQindustrial({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            factor_q: {
                ...dataCargoVariableVivienda.factor_q,
                industrial: {
                    ...dataCargoVariableVivienda.factor_q.industrial,
                    [name]: value
                }
            }
        })
    }

    function handlePutdatareferenciasexcepciones({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            referencias_excepciones: {
                ...dataCargoVariableVivienda.referencias_excepciones,
                [name]: value
            }
        })
    }

    function handlePutdataFactorI({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            factor_i: {
                ...dataCargoVariableVivienda.factor_i,
                [name]: value
            }
        })
    }

    function handlePutdataAreaQ({ target }) {
        const { name, value } = target
        setDataCargoVariableVivienda({
            ...dataCargoVariableVivienda,
            area_q: {
                ...dataCargoVariableVivienda.area_q,
                [name]: value
            }
        })
    }

    console.log(dataCargoVariableVivienda)

    const { fetchPut } = useFetchPut(token, `${valorConfiguracionExpensas === 'LC Construccion Vivienda' ? urlViviendaPut : valorConfiguracionExpensas === 'LC Construccion Comercial' ? urlComercioPut : urlUrbanismoPut }`, dataCargoVariableVivienda)

    async function handleFetchPutData() {
        await fetchPut('')
        alert('Datos Guardados con exito')
    }

    return (
        <PrincipalPage>
            <section className='global-section-all '>
                        <article className='global-article-tabla-observaciones'>
                            <h2 className='global-h2'>
                                {
                                    valorConfiguracionExpensas === 'LC Construccion Vivienda' ? 'Cargo Variable Vivienda' : valorConfiguracionExpensas === 'LC Construccion Comercial' ? 'Cargo Variable Comercial' : valorConfiguracionExpensas === 'Urbanismo' ? 'Cargo Variable Urbano' : 'Cargo Fijo'
                                }
                            </h2>
                        </article>
                    </section>

                    {
                        valorConfiguracionExpensas === 'cargo fijo' ?
                        null :
                        <section className='global-section-all '>
                            <article className='container-inputs-cvv'>
                                <PrimaryInputLiquidaciones labelText={'UVT Actual'} propValue={dataCargoVariableVivienda.UVT | ''} propFnInput={handlePutdata} propName={'UVT'} />
                                <PrimaryInputLiquidaciones labelText={'Cargo Variable por Factor'} propValue={dataCargoVariableVivienda.cargovariable_por_factor } propFnInput={handlePutdata} propName={'cargovariable_por_factor'} />
                                <PrimaryInputLiquidaciones labelText={'Factor M'} propValue={dataCargoVariableVivienda.factor_m} propFnInput={handlePutdata} propName={'factor_m'} />
                            </article>
                        </section>
                    }

                    {
                        valorConfiguracionExpensas === 'cargo fijo' &&
                        <section className='global-section-all '>
                            <article className='container-inputs-cvv'>
                                <PrimaryInputLiquidaciones labelText={'UVT Actual'} propValue={dataCargoVariableVivienda.UVT | ''} propFnInput={handlePutdata} propName={'UVT'} />
                                <PrimaryInputLiquidaciones labelText={'Salario Minimo'} propValue={dataCargoVariableVivienda.cargovariable_por_factor } propFnInput={handlePutdata} propName={'cargovariable_por_factor'} />
                            </article>
                        </section>
                    }

                    {
                        valorConfiguracionExpensas === 'cargo fijo' ?
                        null :
                        <section className='global-section-all '>
                            <article className='container-inputs-cvv'>
                                <TitleDropDown propFn={handleTitleDropDownOpenFactorq} state={TitleDropDownOpen.factorq} propTitle={'Factor Q'} />
                                {
                                    TitleDropDownOpen.factorq &&
                                    <div>
                                    <h3 className='cargovariablevivienda-h3'>Institucional</h3>
                                    <PrimaryInputLiquidaciones labelText={'1 - 300 mts2'} propValue={dataCargoVariableVivienda.factor_q.institucional.menor_300} propFnInput={handlePutdataFactorQinstitucional} propName={'menor_300'} />
                                    <PrimaryInputLiquidaciones labelText={'301 - 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.institucional.menor_1000} propFnInput={handlePutdataFactorQinstitucional} propName={'menor_1000'} />
                                    <PrimaryInputLiquidaciones labelText={'1000 mts2 - Mas'} propValue={dataCargoVariableVivienda.factor_q.institucional.mayor_1000} propFnInput={handlePutdataFactorQinstitucional} propName={'mayor_1000'} />

                                    <h3 className='cargovariablevivienda-h3'>Comercio</h3>
                                    <PrimaryInputLiquidaciones labelText={'1 - 300 mts2'} propValue={dataCargoVariableVivienda.factor_q.comercio.menor_300} propFnInput={handlePutdataFactorQcomercio} propName={'menor_300'} />
                                    <PrimaryInputLiquidaciones labelText={'301 - 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.comercio.menor_1000} propFnInput={handlePutdataFactorQcomercio} propName={'menor_1000'}/>
                                    <PrimaryInputLiquidaciones labelText={'1000 mts2 - Mas'} propValue={dataCargoVariableVivienda.factor_q.comercio.mayor_1000} propFnInput={handlePutdataFactorQcomercio} propName={'mayor_1000'}/>

                                    <h3 className='cargovariablevivienda-h3'>Industrial</h3>
                                    <PrimaryInputLiquidaciones labelText={'1 - 300 mts2'} propValue={dataCargoVariableVivienda.factor_q.industrial.menor_300} propFnInput={handlePutdataFactorQindustrial} propName={'menor_300'}/>
                                    <PrimaryInputLiquidaciones labelText={'301 - 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.industrial.menor_1000} propFnInput={handlePutdataFactorQindustrial} propName={'menor_1000'} />
                                    <PrimaryInputLiquidaciones labelText={'Mayor a 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.industrial.mayor_1000} propFnInput={handlePutdataFactorQindustrial} propName={'mayor_1000'} />
                                </div>
                                }
                                
                            </article>
                        </section>
                    }

                    {
                        valorConfiguracionExpensas === 'cargo fijo' ?
                        null :
                        <section className='global-section-all '>
                            <article className='container-inputs-cvv'>
                                <TitleDropDown propFn={handleTitleDropDownOpenExcepciones} state={TitleDropDownOpen.excepciones} propTitle={'Referencias por Excepciones'} />
                                {
                                    TitleDropDownOpen.excepciones &&
                                    <div>
                                        <PrimaryInputLiquidaciones labelText={'Modificaciones Licencia Vigente'} propValue={dataCargoVariableVivienda.referencias_excepciones.modificaciones_lic} propFnInput={handlePutdatareferenciasexcepciones} propName={'modificaciones_lic'} />
                                        <PrimaryInputLiquidaciones labelText={'Vivienda Interes Social (VIS)'} propValue={dataCargoVariableVivienda.referencias_excepciones.vis} propFnInput={handlePutdatareferenciasexcepciones} propName={'vis'} />
                                        <PrimaryInputLiquidaciones labelText={'Equ. Dotacional Publico'} propValue={dataCargoVariableVivienda.referencias_excepciones.dotacional_publico} propFnInput={handlePutdatareferenciasexcepciones} propName={'dotacional_publico'} />
                                    </div>
                                }
                                
                            </article>
                        </section>
                    }

                    <section className='global-section-all '>
                        <article className='container-inputs-cvv'>
                            <TitleDropDown propFn={handleTitleDropDownOpenFactorI} state={TitleDropDownOpen.factorI} propTitle={'Factor I'} />
                            {
                                TitleDropDownOpen.factorI &&
                                <div>
                                    <PrimaryInputLiquidaciones labelText={'Estrato 1'} propValue={dataCargoVariableVivienda.factor_i.estrato_1} propFnInput={handlePutdataFactorI} propName={'estrato_1'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 2'} propValue={dataCargoVariableVivienda.factor_i.estrato_2} propFnInput={handlePutdataFactorI} propName={'estrato_2'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 3'} propValue={dataCargoVariableVivienda.factor_i.estrato_3} propFnInput={handlePutdataFactorI} propName={'estrato_3'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 4'} propValue={dataCargoVariableVivienda.factor_i.estrato_4} propFnInput={handlePutdataFactorI} propName={'estrato_4'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 5'} propValue={dataCargoVariableVivienda.factor_i.estrato_5} propFnInput={handlePutdataFactorI} propName={'estrato_5'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 6'} propValue={dataCargoVariableVivienda.factor_i.estrato_6} propFnInput={handlePutdataFactorI} propName={'estrato_6'} />
                                </div>
                            }
                            
                        </article>
                    </section>
                    {
                        valorConfiguracionExpensas === 'cargo fijo' &&

                        <section className='global-section-all '>
                        <article className='container-inputs-cvv'>
                            <TitleDropDown propFn={handleTitleDropDownOpenFactorM} state={TitleDropDownOpen.factorM} propTitle={'Factor M'} />
                            {
                                TitleDropDownOpen.factorM &&
                                <div>
                                    <PrimaryInputLiquidaciones labelText={'Estrato 1'} propValue={dataCargoVariableVivienda.factor_i.estrato_1} propFnInput={handlePutdataFactorI} propName={'estrato_1'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 2'} propValue={dataCargoVariableVivienda.factor_i.estrato_2} propFnInput={handlePutdataFactorI} propName={'estrato_2'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 3'} propValue={dataCargoVariableVivienda.factor_i.estrato_3} propFnInput={handlePutdataFactorI} propName={'estrato_3'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 4'} propValue={dataCargoVariableVivienda.factor_i.estrato_4} propFnInput={handlePutdataFactorI} propName={'estrato_4'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 5'} propValue={dataCargoVariableVivienda.factor_i.estrato_5} propFnInput={handlePutdataFactorI} propName={'estrato_5'} />
                                    <PrimaryInputLiquidaciones labelText={'Estrato 6'} propValue={dataCargoVariableVivienda.factor_i.estrato_6} propFnInput={handlePutdataFactorI} propName={'estrato_6'} />
                                </div>
                            }
                            
                        </article>
                    </section>
                    }

                    {
                        valorConfiguracionExpensas !== 'Urbanismo' && valorConfiguracionExpensas !== 'cargo fijo' &&
                    

                    <section className='global-section-all '>
                        <article className='container-inputs-cvv'>
                            <TitleDropDown propFn={handleTitleDropDownOpenAreaQ} state={TitleDropDownOpen.areaq} propTitle={'Area Q'} />
                            {
                                TitleDropDownOpen.areaq &&
                                <div>
                                    <PrimaryInputLiquidaciones labelText={'Menos de 100 mts2'} propValue={dataCargoVariableVivienda.area_q.menor_100} propFnInput={handlePutdataAreaQ} propName={'menor_100'} />
                                    <PrimaryInputLiquidaciones labelText={'101 mts2 - 11.000 mts2 '} propValue={dataCargoVariableVivienda.area_q.menor_11000} propFnInput={handlePutdataAreaQ} propName={'menor_11000'} />
                                    <PrimaryInputLiquidaciones labelText={'Mayores a 11.000 mts2'} propValue={dataCargoVariableVivienda.area_q.mayor_11000} propFnInput={handlePutdataAreaQ} propName={'mayor_11000'} />
                                </div>
                            }
                            
                        </article>
                    </section>

                    }

                    {
                        valorConfiguracionExpensas === 'cargo fijo' ?
    
                        <section className='global-section-all '>
                            <article className='container-inputs-cvv'>
                                <TitleDropDown propFn={handleTitleDropDownOpenFactorUsos} state={TitleDropDownOpen.factorUsos} propTitle={'Otros usos'} />
                                {
                                    TitleDropDownOpen.factorUsos &&
                                    <div>
                                    <h3 className='cargovariablevivienda-h3'>Institucional</h3>
                                    <PrimaryInputLiquidaciones labelText={'1 - 300 mts2'} propValue={dataCargoVariableVivienda.factor_q.institucional.menor_300} propFnInput={handlePutdataFactorQinstitucional} propName={'menor_300'} />
                                    <PrimaryInputLiquidaciones labelText={'301 - 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.institucional.menor_1000} propFnInput={handlePutdataFactorQinstitucional} propName={'menor_1000'} />
                                    <PrimaryInputLiquidaciones labelText={'1000 mts2 - Mas'} propValue={dataCargoVariableVivienda.factor_q.institucional.mayor_1000} propFnInput={handlePutdataFactorQinstitucional} propName={'mayor_1000'} />

                                    <h3 className='cargovariablevivienda-h3'>Comercio</h3>
                                    <PrimaryInputLiquidaciones labelText={'1 - 300 mts2'} propValue={dataCargoVariableVivienda.factor_q.comercio.menor_300} propFnInput={handlePutdataFactorQcomercio} propName={'menor_300'} />
                                    <PrimaryInputLiquidaciones labelText={'301 - 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.comercio.menor_1000} propFnInput={handlePutdataFactorQcomercio} propName={'menor_1000'}/>
                                    <PrimaryInputLiquidaciones labelText={'1000 mts2 - Mas'} propValue={dataCargoVariableVivienda.factor_q.comercio.mayor_1000} propFnInput={handlePutdataFactorQcomercio} propName={'mayor_1000'}/>

                                    <h3 className='cargovariablevivienda-h3'>Industrial</h3>
                                    <PrimaryInputLiquidaciones labelText={'1 - 300 mts2'} propValue={dataCargoVariableVivienda.factor_q.industrial.menor_300} propFnInput={handlePutdataFactorQindustrial} propName={'menor_300'}/>
                                    <PrimaryInputLiquidaciones labelText={'301 - 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.industrial.menor_1000} propFnInput={handlePutdataFactorQindustrial} propName={'menor_1000'} />
                                    <PrimaryInputLiquidaciones labelText={'Mayor a 1000 mts2'} propValue={dataCargoVariableVivienda.factor_q.industrial.mayor_1000} propFnInput={handlePutdataFactorQindustrial} propName={'mayor_1000'} />
                                </div>
                                }
                                
                            </article>
                        </section>

                        : null
                    }

                    <section className='global-section-all '>
                        <article className='container-inputs-cvv'>
                            <PrimaryButton textButton={'Guardar Datos'} propFunction={handleFetchPutData} />
                        </article>
                    </section>

        </PrincipalPage>
    )
}

export default CargoVariableVivienda
