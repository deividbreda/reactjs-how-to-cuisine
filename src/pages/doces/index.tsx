import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import { useSession } from "next-auth/react";

import styles from '../receitas.module.scss'

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";
import { useModal } from "../../hook/useModal";

type Doce = {
    slug: string,
    img: string,
    title: string,
    timer: string,
    porcao: string,
}

interface DocesProps {
    doces: Doce[],
}

export default function Doces({ doces }: DocesProps){
    const { data: session } = useSession();

    const { openModal } = useModal();

    function handleLogin(){
        openModal();
    }

    return (
        <>
            <Head>
                <title> Doces | How Cuisine </title>
            </Head>

            <div className={styles.categoryFeatured}>
                <img src="/images/doces.jpg" alt="" />
                <div className={styles.cover}>
                    <div className="containerWidth">
                        <h1> Doces </h1>
                    </div>
                </div>
            </div>

            <div className="containerWidth">
                <div className={styles.conteudo}>
                    <div className={styles.links}>                                   
                        <li> 
                            <Link href="/">
                                <a> Home </a> 
                            </Link>              
                        </li>

                        <li className={styles.active}>
                            <Link href="/doces"> 
                                <a href=""> Doces </a> 
                            </Link>    
                        </li>
                    </div>

                    <div className={styles.receitas}>
                        {doces.map(doce => (
                            <div key={doce.slug}>
                                <div className={styles.receita}>
                                    <img src={doce.img} alt={doce.title} />
                                    <div className={styles.texto}>
                                        <h1> {doce.title} </h1>
                                </div>
                                <div className={styles.overlayTexto}>
                                    <div className={styles.texto}>
                                        <div className={styles.info}>
                                            <time> <b> <BsAlarm /> </b> {doce.timer} min </time>
                                            <span> <b> <BiDish /> </b> {doce.porcao} {doce.porcao == "1" ? "porção" : "porções"} </span>
                                        </div>
                                        {!session ? 
                                            <button onClick={handleLogin}> FAZER LOGIN </button> 
                                            : 
                                            <Link href={`/doces/${doce.slug}`}>
                                                <a> VER RECEITA </a>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getByType("doce", {
        pageSize: 100,
    })

    const doces = response.results.map(doce => {
        return {
            slug: doce.uid,
            title: RichText.asText(doce.data.title),
            img: doce.data.img.url,
            timer: doce.data.timer,
            porcao: doce.data.porcao,
        }
    })

    return {
        props: {
            doces,
        }
    }
}