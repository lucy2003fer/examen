import React, { useState } from 'react'

const Filtros = () => {
    const [pruebas, setPruebas] = useState(() => {
        const storedPruebas = localStorage.getItem('pruebas')
        return storedPruebas ? JSON.parse(storedPruebas) : []
    })

    const [valores, setValores] = useState({
        turbidez: '',
        nitratos: '',
        fluoruros: '',
        arsenico: '',
        mercurio: '',
        plomo: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setValores({
            ...valores,
            [name]: value
        })
    }

    const filtrarAgua = () => {
        const turbidez = parseFloat(valores.turbidez)
        const nitratos = parseFloat(valores.nitratos)
        const fluoruros = parseFloat(valores.fluoruros)
        const arsenico = parseFloat(valores.arsenico)
        const mercurio = parseFloat(valores.mercurio)
        const plomo = parseFloat(valores.plomo)

        const limites = {
            turbidez: 1,
            nitratos: 10,
            fluoruros: 1.5,
            arsenico: 0.01,
            mercurio: 0.006,
            plomo: 0.01
        }

        const nuevaPrueba = {
            turbidez: { valorIngresado: turbidez, esPotable: turbidez <= limites.turbidez ? 'Potable' : 'No Potable' },
            nitratos: { valorIngresado: nitratos, esPotable: nitratos <= limites.nitratos ? 'Potable' : 'No Potable' },
            fluoruros: { valorIngresado: fluoruros, esPotable: fluoruros <= limites.fluoruros ? 'Potable' : 'No Potable' },
            arsenico: { valorIngresado: arsenico, esPotable: arsenico <= limites.arsenico ? 'Potable' : 'No Potable' },
            mercurio: { valorIngresado: mercurio, esPotable: mercurio <= limites.mercurio ? 'Potable' : 'No Potable' },
            plomo: { valorIngresado: plomo, esPotable: plomo <= limites.plomo ? 'Potable' : 'No Potable' },
            sonPotable: sonPotable ? 'Potable' : 'No Potable'

        }

        const nuevasPruebas = [...pruebas, nuevaPrueba]
        setPruebas(nuevasPruebas)
        localStorage.setItem('pruebas', JSON.stringify(nuevasPruebas))


        return (
            <div>
                <h2>Sistema de Filtro de Agua</h2>
                <label>Turbidez: <input name="turbidez" value={valores.turbidez} onChange={handleChange} /></label>
                <label>Nitratos: <input name="nitratos" value={valores.nitratos} onChange={handleChange} /></label>
                <label>Fluoruros: <input name="fluoruros" value={valores.fluoruros} onChange={handleChange} /></label>
                <label>Arsénico: <input name="arsenico" value={valores.arsenico} onChange={handleChange} /></label>
                <label>Mercurio: <input name="mercurio" value={valores.mercurio} onChange={handleChange} /></label>
                <label>Plomo: <input name="plomo" value={valores.plomo} onChange={handleChange} /></label>
                <button onClick={filtrarAgua}>Aplicar Filtro</button>

                <h3>Historial de Pruebas</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Elemento</th>
                            <th>Valor ingresado</th>
                            <th>Valor que sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pruebas.map((prueba, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>Turbidez</td>
                                    <td>{prueba.turbidez.valorIngresado}</td>
                                    <td>{prueba.turbidez.esPotable}</td>
                                </tr>
                                <tr>
                                    <td>Nitratos</td>
                                    <td>{prueba.nitratos.valorIngresado}</td>
                                    <td>{prueba.nitratos.esPotable}</td>
                                </tr>
                                <tr>
                                    <td>Fluoruros</td>
                                    <td>{prueba.fluoruros.valorIngresado}</td>
                                    <td>{prueba.fluoruros.esPotable}</td>
                                </tr>
                                <tr>
                                    <td>Arsénico</td>
                                    <td>{prueba.arsenico.valorIngresado}</td>
                                    <td>{prueba.arsenico.esPotable}</td>
                                </tr>
                                <tr>
                                    <td>Mercurio</td>
                                    <td>{prueba.mercurio.valorIngresado}</td>
                                    <td>{prueba.mercurio.esPotable}</td>
                                </tr>
                                <tr>
                                    <td>Plomo</td>
                                    <td>{prueba.plomo.valorIngresado}</td>
                                    <td>{prueba.plomo.esPotable}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>El agua es</td>
                            <td>l</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}
export default Filtros