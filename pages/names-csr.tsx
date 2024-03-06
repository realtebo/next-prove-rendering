import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { fetchNames } from "../utils/fetch-names"

type responseItemType = {
    id: string
    name: string
}

const NamesCSR: NextPage = () => {
    const [data, setData] = useState<responseItemType[] | []>()

    /**
     * We cannot declare the useEffect hook as an async function, because it returns
     * either an undefined value or a function, whereas an async function returns a
     * promise, and therefore TSC would throw an error. To avoid this, we need to
     * wrap the await call in an async function, fetchData, and then call that
     * function
     */
    useEffect(() => {
        const fetchData = async () => {
            console.log("Running fetchData in pure Client Side Rendering")
            let names
            try {
                names = await fetchNames()
            } catch (err) {
                console.log("ERR", err)
            }
            setData(names)
        }
        fetchData()
    }, []) //Nota BENE: l'array delle dipendenze è settato ma volutamente vuoto
    // vuole provacare un primo rendering iniziale e nessun aggiornamento successivo
    // a meno che non si rientri nella pagina

    const output = data?.map((item: responseItemType, idx: number) => {
        return (
            <li key={`name-${idx}`}>
                {item.id} : {item.name}
            </li>
        )
    })

    return <ul>{output}</ul>
}

export default NamesCSR
