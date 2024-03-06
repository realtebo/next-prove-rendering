import type {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
    PreviewData,
} from "next"
import { ParsedUrlQuery } from "querystring"
import { fetchNames } from "../utils/fetch-names"

type responseItemType = {
    id: string
    name: string
}

const NamesSSG: NextPage = (
    props: InferGetStaticPropsType<typeof getStaticProps>
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

/**
 * Eseguita automaticamente da next quando viene creata
 * LA VERSIONE STATICA del sito
 *
 * Runs on every request in development : In development (next dev),
 * getStaticProps will be called on every request
 *
 * https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props#runs-on-every-request-in-development
 *
 * In sviluppo, ad ogni refresh viene cmq chiamata (npm run dev)
 * In prod no, (npm run start, che si ricorda richiede una precedente npm run build)
 * - In questo caso, DURANTE, la build [non a runtime quindi] viene eseguita getStaticProps
 *
 * @param context
 * @returns
 */
export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
    console.log("Running getStaticProps")
    let names: responseItemType[] | [] = []
    try {
        names = await fetchNames()
    } catch (err) {}

    return {
        props: {
            names,
        },
        /**
         * ISG - Incremental Static Regeneration
         *  Si applica solo alle pagine che supportano già l'SSG
         * ottimo mix per time-to-first-byte, perchè in fase di build c'è già una
         * versione pronta, sia per il seo, stesso motivo
         * ma ad ogni modo ogni tot secondi se serve riesegue questa function
         * 
            ISR is a hybrid of SSG and SSR that runs purely on the server side. 
            It generates the HTML on the server during the initial build and sends 
            this pre-generated HTML the first time a page is requested. After a specified time has passed, 
            Next.js will fetch the data and regenerate the page on the server in the background. 
            In the process, it invalidates the internal server cache and updates it with the new page. 
            Every subsequent request will receive the up-to-date page. Like SSG, ISR is less costly than SSR and increases a page’s SEO ranking.

            Per fare la prova, 
            - npm run build [esege la function], npm run start [avvia in modalità prod]
            - caricare diverse volte la rotta /names-ssg
                si vedrà che solo ogni 30 secondi viene rieseguita, attingendo da una cache
                che si fa internamente nel mentre
            */
        revalidate: 30,
    }
}

export default NamesSSG
