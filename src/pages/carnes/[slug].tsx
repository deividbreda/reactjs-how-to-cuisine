import Head from "next/head";
import { GetServerSideProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import Link from "next/link";

import styles from '../receita.module.scss'

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

interface CarneProps {
    carne: {
        slug: string,
        img: string,
        title: string,
        timer: string,
        porcao: string,
        descricao: string,
        ingredientes: string,
        preparo: string
    }
}

export default function Carne({ carne }: CarneProps){
    return (
        <>
            <Head>
                <title> {carne.title} | How Cuisine </title>
            </Head>

            <div className={styles.categoryFeatured}>
                <img src={carne.img} alt={carne.title} />
                <div className={styles.cover}>
                    <div className="containerWidth">
                        <div className={styles.text}>
                            <h1> {carne.title} </h1>
                            <div className={styles.infos}>
                                <time> <b> <BsAlarm /> </b> {carne.timer} min </time>
                                <span> <b> <BiDish /> </b> {carne.porcao} {carne.porcao == "1" ? "porção" : "porções"} </span>
                            </div>
                        </div>
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
                        <li> 
                            <Link href="/carnes">
                                <a> Carnes </a> 
                            </Link>
                        </li>
                        <li className={styles.active}> 
                            <Link href={`carnes/${carne.slug}`}>
                                <a> {carne.title} </a> 
                            </Link>
                        </li>
                    </div>

                    <div className={styles.receita}>
                        <div className={styles.chamada}>
                            <h1 className={styles.title}> {carne.title} </h1>
                            <div dangerouslySetInnerHTML={{ __html: carne.descricao }} />
                            <img src={carne.img} alt={carne.title} />
                        </div>
                        <div className={styles.ingredientes} dangerouslySetInnerHTML={{ __html: carne.ingredientes }} />
                        <div className={styles.preparo} dangerouslySetInnerHTML={{ __html: carne.preparo }} /> 
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({req})
    
    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/inscricao',
                permanent: false,
            }
        }
    }
    
    const { slug } = params;
    const prismic = getPrismicClient(req);
    const response = await prismic.getByUID('carne', String(slug), {})

    const carne = {
        slug,
        title: RichText.asText(response.data.title),
        descricao: RichText.asHtml(response.data.descricao),
        timer: response.data.timer,
        porcao: response.data.porcao,
        img: response.data.img.url,
        ingredientes: RichText.asHtml(response.data.ingredientes),
        preparo: RichText.asHtml(response.data.preparo),
    }

    return {
        props: {
            carne
        }
    }
}