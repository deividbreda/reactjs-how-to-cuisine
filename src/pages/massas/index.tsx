import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import { useModal } from "../../hook/useModal";
import { useSession } from "next-auth/react";

import styles from '../receitas.module.scss'

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

type Massa = {
    slug: string,
    img: string,
    title: string,
    timer: string,
    porcao: string,
}

interface MassasProps {
    massas: Massa[],
}

export default function Massas({ massas }: MassasProps){
    const { data: session } = useSession();

    const { openModal } = useModal();

    function handleLogin() {
        openModal();
    }

    return(
        <>
            <Head>
                <title> Massas | How Cuisine</title>
            </Head>

            <div className={styles.categoryFeatured}>
                <img src="/images/massas.jpg" alt="" />
                <div className={styles.cover}>
                    <div className="containerWidth">
                        <h1> Massas </h1>
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
                            <Link href="/massas"> 
                                <a href=""> Massas </a> 
                            </Link>    
                        </li>
                    </div>

                    <div className={styles.receitas}>
                        {massas.map(massa => (
                            <div key={massa.slug}>
                                <div className={styles.receita}>
                                    <img src={massa.img} alt={massa.title} />
                                    <div className={styles.texto}>
                                        <h1> {massa.title} </h1>
                                </div>
                                <div className={styles.overlayTexto}>
                                    <div className={styles.texto}>
                                        <div className={styles.info}>
                                            <time> <b> <BsAlarm /> </b> {massa.timer} min </time>
                                            <span> <b> <BiDish /> </b> {massa.porcao} {massa.porcao == "1" ? "porção" : "porções"} </span>
                                        </div>
                                        {!session ? 
                                            <button onClick={handleLogin}> FAZER LOGIN </button> 
                                            : 
                                            <Link href={`/massas/${massa.slug}`}>
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

    const response = await prismic.getByType("massa", {
        pageSize: 100,
    })

    const massas = response.results.map(massa => {
        return {
            slug: massa.uid,
            title: RichText.asText(massa.data.title),
            img: massa.data.img.url,
            timer: massa.data.timer,
            porcao: massa.data.porcao,
        }
    })

    return {
        props: {
            massas
        }
    }
}