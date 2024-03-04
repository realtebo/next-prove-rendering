import type {NextPage} from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css"
import Link from "next/link";
import Image from "next/image";

const Hello: NextPage = () => {
    return (<>
        <Head>
            <title>Hello World Page Title</title>
            <meta property="og:title" content="Hello World" key="title" />
        </Head>
        <div className={styles.container}>
            Hello World! 
            <br />
            Questo test è in un div la cui classe è  
            styles/Home.module.css -&gt; classe .container &quot;{styles.container}&quot;
        </div>
        <div>
            Use the HTML anchor for an
            <a href="https://nostarch.com"> external link </a> 
            and the Link component for an
            <Link href="/components/weather"> internal page
            </Link>
            .
            <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
            />
        </div>
    </>);
}

export default Hello;
