import Head from "next/head";

import styles from './styles.module.scss'

import { BsFillPatchCheckFill } from "react-icons/bs";
import Link from "next/link";

export default function Checkout(){
    return (
        <>
            <Head>
                <title> Checkout | How Cuisine </title>
            </Head>

            <div className="containerWidth">
                <div className={styles.content}>
                    <b> <BsFillPatchCheckFill /> </b>
                    <h1> INSCRIÇÃO REALIZADA COM SUCESSO! </h1>
                    <span> Obrigado por se inscrever e confiar em nossas receitas! </span>
                    <Link href="/">
                        <a> VER RECEITAS </a>
                    </Link>
                </div>
            </div>
        </>
    );
}