import React, { useEffect, useState } from 'react'
import axios from 'axios'
const StarWarsApi = () => {
    const [mainMenu, setMainMenu] = useState()
    const [selecMainMenu, setSelecMainMenu] = useState()
    const [starWarsFind, setstarWarsFind] = useState({})
    const [showResult, setShowResult] = useState([])
    const [errors, setErrors] = useState(false)
    const [mensageErro, setMensageErro] = useState()

    useEffect(() => {
        const fecthData = async () => {
            try {
                const { data } = await axios.get(`https://swapi.dev/api/`)
                console.log(data)
                setMainMenu(Object.keys(data))
                console.log("en fecthData", mainMenu)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [errors]
    )

    const onchageHandler = ({ target: { name, value } }) => {
        console.log("onchageHandler ", name, value)
        setstarWarsFind({ ...starWarsFind, ...{ [name]: value } })
        console.log("starwarefind ", starWarsFind)
        if (errors === true) {
            setErrors(false)
            console.log("Cambio estado de erros ", errors)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log("**** onSubmitHandler****")
        console.log("ID : ", starWarsFind.ID)
        console.log("https://swapi.dev/api/", starWarsFind.selection)

        try {
            const { data } = await axios.get(`https://swapi.dev/api/${starWarsFind.selection}/${starWarsFind.ID}`)
            console.log("data en on subnmit: ", data)
            setShowResult(Object.entries(data))
            console.log("en showResult ", showResult)

            if (e.response.status === 404) {
                console.log("pasa por error ")
            }
        } catch (error) {
            console.log(" entro por error 404")
            setErrors(true)

        }
        console.log("Errors : ", errors)
    }


    if (!mainMenu) return <span> <h3>Loading..........</h3></span>
    const showMensageError = () => {
        if (errors) {
            return (
                <h3>"Estos no son los droides que está buscando" </h3>
            )

        }
    }

    return (
        <div> que la fuerza te acompañe
            {console.log("dentro html", mainMenu)}


            <form onSubmit={onSubmitHandler}>
                {/* <select name="selection" value={selecMainMenu} onChange={e => setSelecMainMenu(e.target.value)}> */}
                <select name="selection" onChange={onchageHandler}>
                    {mainMenu.map((menu, key) => (
                        <option key={key} value={menu}>{menu}</option>
                    ))}
                </select>
                <div>
                    <label htmlFor="ID"> ID element</label>
                    <input type="text" name="ID" onChange={onchageHandler} />
                </div>
                <input type="submit" />
            </form>

            <h3>Star wars encyclopedia </h3>
            <div>
                {showResult.map(([atribut, value], key) => (
                    <p key={key}>{atribut} <b>:</b> {value} </p>
                ))}
            </div>
            <div>
                {errors ? "Estos no son los droides que está buscando" : " LA fuerza te acompañe siempre"}
                {/* <img src="https://lumiere-a.akamaihd.net/v1/images/Obi-Wan-Kenobi_6d775533.jpeg?region=0%2C0%2C1536%2C864&width=768" alt="Ben Kenobi gazing into the distance" /> */}
            </div>
            <div>
                <showMensageError />

            </div>
        </div>
    )
}
export default StarWarsApi