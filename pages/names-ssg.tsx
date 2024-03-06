import type {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
    PreviewData,
} from "next";
import {ParsedUrlQuery} from "querystring";
import {fetchNames} from "../utils/fetch-names";

type responseItemType = {
    id: string,
    name: string,
};

const NamesSSG: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
     
    const output = props.names.map((item: responseItemType, idx: number) => {
        return (
            <li key={`name-${idx}`}>
                {item.id} : {item.name}
            </li>
        );
    });
     
    return (
        <ul>
            {output}
        </ul>
            );
        };

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

    console.log("Running getStaticProps");
    let names: responseItemType[] | [] = [];
    try {
        names = await fetchNames();
    } catch (err) {}
        
    return {
        props: {
            names
        }
    };
};

export default NamesSSG;