import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";

import styles from '../receita.module.scss'

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

interface DoceProps {
    doce: {
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

export default function Doce({ doce }: DoceProps){
    return (
        <>
            <Head>
                <title> {doce.title} | How Cuisine </title>
            </Head>

            <div className={styles.categoryFeatured}>
                <img src={doce.img} alt={doce.title} />
                <div className={styles.cover}>
                    <div className="containerWidth">
                        <div className={styles.text}>
                            <h1> {doce.title} </h1>
                            <div className={styles.infos}>
                                <time> <b> <BsAlarm /> </b> {doce.timer} min </time>
                                <span> <b> <BiDish /> </b> {doce.porcao} {doce.porcao == "1" ? "porção" : "porções"} </span>
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
                            <Link href="/doces"> 
                                <a> Doces </a> 
                            </Link> 
                        </li>
                        <li  className={styles.active}> 
                            <Link href={`/doces/${doce.slug}`}>
                                <a href=""> {doce.title} </a> 
                            </Link>
                        </li>
                    </div>

                    <div className={styles.receita}>
                        <div className={styles.chamada}>
                            <h1 className={styles.title}> {doce.title} </h1>
                            <div dangerouslySetInnerHTML={{ __html: doce.descricao }} />
                            <img src={doce.img} alt={doce.title} />
                        </div>
                        <div className={styles.ingredientes} dangerouslySetInnerHTML={{ __html: doce.ingredientes }} />
                        <div className={styles.preparo} dangerouslySetInnerHTML={{ __html: doce.preparo }} /> 
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req });

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

    const response = await prismic.getByUID('doce', String(slug), {})

    const doce = {
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
            doce
        }
    }
}