import Head from "next/head";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useModal } from "../../hook/useModal";

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

import styles from '../receitas.module.scss'

type Carne = {
    slug: string,
    img: string,
    title: string,
    timer: string,
    porcao: string,
}

interface CarnesProps {
    carnes: Carne[],
}

export default function Carnes({ carnes }: CarnesProps){
    const { data: session } = useSession();

    const { openModal } = useModal()

    async function handleLogin() {
        openModal()
    }

    return(
        <>
            <Head>
                <title> Carnes | How Cuisine </title>
            </Head>

            <div className={styles.categoryFeatured}>
                <img src="/images/carnes.jpg" alt="" />
                <div className={styles.cover}>
                    <div className="containerWidth">
                        <h1> Carnes </h1>
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
                            <Link href="/carnes"> 
                                <a href=""> Carnes </a> 
                            </Link>    
                        </li>
                    </div>

                    <div className={styles.receitas}>
                        {carnes.map(carne => (
                            <div key={carne.slug}>
                                <div className={styles.receita}>
                                    <img src={carne.img} alt={carne.title} />
                                    <div className={styles.texto}>
                                        <h1> {carne.title} </h1>
                                </div>
                                <div className={styles.overlayTexto}>
                                    <div className={styles.texto}>
                                        <div className={styles.info}>
                                            <time> <b> <BsAlarm /> </b> {carne.timer} min </time>
                                            <span> <b> <BiDish /> </b> {carne.porcao} {carne.porcao == "1" ? "porção" : "porções"} </span>
                                        </div>
                                        {!session ? 
                                            <button onClick={handleLogin}> FAZER LOGIN </button> 
                                            : 
                                            <Link href={`/carnes/${carne.slug}`}>
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

    const response = await prismic.getByType("carne", {
        pageSize: 100,
    })

    const carnes = response.results.map(carne => {
        return {
            slug: carne.uid,
            title: RichText.asText(carne.data.title),
            img: carne.data.img.url,
            timer: carne.data.timer,
            porcao: carne.data.porcao,
        }
    })

    return {
        props: {
            carnes,
        }
    }
}

