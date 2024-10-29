import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Filtros = () => {
    const [valorTurbidez, setValorTurbidez] = useState('')
    const [valorNitratos, setValorNitratos] = useState('')
    const [valorFluoruros, setValorFluoruros] = useState('')
    const [valorArsenico, setValorArsenico] = useState('')
    const [valorMercurio, setValorMercurio] = useState('')
    const [valorPlomo, setValorPlomo] = useState('')
    
    const pruebaInicial = JSON.parse(localStorage.getItem('Prueba')) || []
    const [prueba, setPrueba] = useState(pruebaInicial)

    const rango = {
        turbidez: { max: 1 },
        nitratos: { max: 10 },
        fluoruros: { max: 1.5 },
        arsenico: { max: 0.01 },
        mercurio: { max: 0.006 },
        plomo: { max: 0.01 },
    }

    const datos = (e) => {
        e.preventDefault()

        const proceso = [
            { elemento: 'Turbidez', valorIngresado: valorTurbidez, valorFiltrado: Math.min(valorTurbidez, rango.turbidez.max), fueraDeRango: valorTurbidez > rango.turbidez.max },
            { elemento: 'Nitratos', valorIngresado: valorNitratos, valorFiltrado: Math.min(valorNitratos, rango.nitratos.max), fueraDeRango: valorNitratos > rango.nitratos.max },
            { elemento: 'Fluoruros', valorIngresado: valorFluoruros, valorFiltrado: Math.min(valorFluoruros, rango.fluoruros.max), fueraDeRango: valorFluoruros > rango.fluoruros.max },
            { elemento: 'Arsénico', valorIngresado: valorArsenico, valorFiltrado: Math.min(valorArsenico, rango.arsenico.max), fueraDeRango: valorArsenico > rango.arsenico.max },
            { elemento: 'Mercurio', valorIngresado: valorMercurio, valorFiltrado: Math.min(valorMercurio, rango.mercurio.max), fueraDeRango: valorMercurio > rango.mercurio.max },
            { elemento: 'Plomo', valorIngresado: valorPlomo, valorFiltrado: Math.min(valorPlomo, rango.plomo.max), fueraDeRango: valorPlomo > rango.plomo.max },
        ]

        //localStorage
        const nuevosResultados = [...prueba, proceso].slice(-5)
        setPrueba(nuevosResultados)
        localStorage.setItem('Prueba', JSON.stringify(nuevosResultados))

        setValorTurbidez('')
        setValorNitratos('')
        setValorFluoruros('')
        setValorArsenico('')
        setValorMercurio('')
        setValorPlomo('')
    }

    return (
        <div className="container my-5 text-white">
            <form onSubmit={datos} className='shadow-lg p-5 bg-success rounded-5'>
                <h1 className="text-center mb-4">Calidad del Agua</h1>
                <div className="row mb-3">
                    {['Turbidez', 'Nitratos', 'Fluoruros', 'Arsénico', 'Mercurio', 'Plomo'].map((elemento, index) => (
                        <div className="col-md-6 mt-3" key={index}>
                            <label><b>{elemento}</b>:</label>
                            <input type="number" value={
                                    elemento === 'Turbidez' ? valorTurbidez :
                                    elemento === 'Nitratos' ? valorNitratos :
                                    elemento === 'Fluoruros' ? valorFluoruros :
                                    elemento === 'Arsénico' ? valorArsenico :
                                    elemento === 'Mercurio' ? valorMercurio :
                                    valorPlomo
                                }
                                onChange={(e) => {
                                    const valor = parseFloat(e.target.value) || '';
                                    elemento === 'Turbidez' ? setValorTurbidez(valor) :
                                    elemento === 'Nitratos' ? setValorNitratos(valor) :
                                    elemento === 'Fluoruros' ? setValorFluoruros(valor) :
                                    elemento === 'Arsénico' ? setValorArsenico(valor) :
                                    elemento === 'Mercurio' ? setValorMercurio(valor) :
                                    setValorPlomo(valor);
                                }}
                                step="0.001"
                                placeholder="Ingrese el valor"
                                className="form-control"
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary">Evaluar Prueba</button>
            </form>

            <h2 className="mt-5">Resultados de las Pruebas</h2>
            <table className="table mt-3 border-5">
                <thead className='table-primary'>
                    <tr>
                        <th>Elemento</th>
                        <th>Valor Ingresado</th>
                        <th>Valor Filtrado</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {prueba.length > 0 ? (
                        prueba.map((test, i) => (
                            <React.Fragment key={i}>
                                {test.map((elemento, j) => (
                                    <tr key={j}>
                                        <td>{elemento.elemento}</td>
                                        <td>{elemento.valorIngresado}</td>
                                        <td>{elemento.valorFiltrado}</td>
                                        <td>{elemento.fueraDeRango ? 'No está en el rango ideal' : 'Está en el rango ideal'}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" className="text-center font-weight-bold">
                                        Resultado:
                                    </td>
                                    <td className='bg-secondary text-white fs-5'>
                                        <b>{test.some((el) => el.fueraDeRango) ? 'No Potable' : 'Potable'}</b>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay pruebas registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Filtros
