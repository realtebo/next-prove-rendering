import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
    PreviewData,
} from "next"
import { ParsedUrlQuery } from "querystring"
import { fetchNames } from "../utils/fetch-names"

type responseItemType = {
    id: string
    name: string
}

/**
 * To use SSR for a page, export an additional async function, getServerSideProps, from that page.
 * Next.js calls this function on every request and passes the fetched data to the page’s props argument
 * to pre-render it before sending it to the client.
 */
const NamesSSR: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const output = props.names.map((item: responseItemType, idx: number) => {
        return (
            <li key={`name-${idx}`}>
                {item.id} : {item.name}
            </li>
        )
    })

    return <ul>{output}</ul>
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    console.log("Running getServerSideProps")

    // responseItemType[] | [] = []; indica che
    // se non è un array di responseItemType,
    // deve essere un array ed esattamente un array vuoto
    let names: responseItemType[] | [] = []
    try {
        names = await fetchNames()
    } catch (err) {}
    return {
        props: {
            names,
        },
    }
}

export default NamesSSR
