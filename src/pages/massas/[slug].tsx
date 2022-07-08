import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Link from "next/link";

import styles from '../receita.module.scss'

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

interface MassaProps {
    massa: {
        slug: string,
        img: string,
        title: string,
        timer: string,
        porcao: string,
        descricao: string,
        ingredientes: string,
        preparo: string,
    }
}

export default function Massa({ massa }: MassaProps){
    return(
        <>
            <Head>
                <title> {massa.title} | How Cuisine</title>
            </Head>

            <div className={styles.categoryFeatured}>
                <img src={massa.img} alt="" />
                <div className={styles.cover}>
                    <div className="containerWidth">
                        <div className={styles.text}>
                            <h1> {massa.title} </h1>
                            <div className={styles.infos}>
                                <time> <b> <BsAlarm /> </b> {massa.timer} min </time>
                                <span> <b> <BiDish /> </b> {massa.porcao} {massa.porcao == "1" ? "porção" : "porções"} </span>
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
                                <a href=""> Home </a> 
                            </Link>
                        </li>

                        <li> 
                            <Link href="/massas">
                                <a href=""> Massas </a> 
                            </Link>
                        </li>

                        <li  className={styles.active}> 
                            <Link href={`/massas/${massa.slug}`}>
                                <a href=""> {massa.title} </a> 
                            </Link>
                        </li>
                    </div>

                    <div className={styles.receita}>
                        <div className={styles.chamada}>
                            <h1 className={styles.title}> {massa.title} </h1>
                            <div dangerouslySetInnerHTML={{ __html: massa.descricao }} />
                            <img src={massa.img} alt={massa.title} />
                        </div>
                        <div className={styles.ingredientes} dangerouslySetInnerHTML={{ __html: massa.ingredientes }} />
                        <div className={styles.preparo} dangerouslySetInnerHTML={{ __html: massa.preparo }} /> 
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

    const response = await prismic.getByUID('massa', String(slug), {})

    const massa = {
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
        props: { massa }
    }
}