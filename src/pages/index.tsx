import { GetStaticProps } from 'next'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { BotaoAssinar } from '../components/Homepage/BotaoAssinar'
import { getPrismicClient } from '../services/prismic'
import { stripe } from '../services/stripe'

import { FaRegClock } from "react-icons/fa";

import styles from './styles.module.scss'

type Doces = {
  slug: string,
  title: string,
  img: string,
  type: string,
  timer: number,
}

type Massas = {
  slug: string,
  title: string,
  img: string,
  type: string,
  timer: number,
}

type Carnes = {
  slug: string,
  title: string,
  img: string,
  type: string,
}

interface HomeProps {
  produto: {
    priceId: string,
    preco: number,
  }

  doces: Doces[],
  massas: Massas[],
  carnes: Carnes[],
}

export default function Home({ produto, doces, massas, carnes }: HomeProps) {
  return(
    <>
      <Head> 
        <title> Home | How to Cuisine</title>
      </Head>

      <div className="containerWidth">
        <div className={styles.featured}>
          <div className={styles.text}>
            <h1> As melhores <span> receitas </span> da internet estão aqui! </h1>
            <p> Assine por apenas <b> {produto.preco} </b> e tenha acesso a todas as receitas! </p>
            <BotaoAssinar />
          </div>
          <img src="/images/cartoonchef.png" alt="" />
        </div>

        <div className={styles.posts}>
          <div className={styles.category}>
            <div className={styles.doces}>
              {doces.map(doce => (
                <div key={doce.slug} className={styles.doce}>
                  <a href="">
                    <img src={doce.img} alt={doce.title} />
                    <div className={styles.cover}>
                      <span> {doce.type} </span>
                      <h2> {doce.title} </h2>
                      <time> <FaRegClock />  {doce.timer} min </time>
                    </div>
                  </a>
                </div>  
              ))}              
            </div>
          </div>

          <div className={styles.category}> 
            <div className={styles.massas}>
              {massas.map(massa => (
                <div key={massa.slug} className={styles.massa}>
                  <a href="">
                    <img src={massa.img} alt={massa.title} />
                    <span> {massa.type} </span>
                    <div className={styles.textoMassa}>
                      <h1> {massa.title} </h1>
                      <time> <FaRegClock /> {massa.timer} min </time>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.category}>
            <div className={styles.carnes}>
              {carnes.map(carne => (
                <div key={carne.slug} className={styles.carne}>
                  <a href="">
                    <img className={styles.img} src={carne.img} alt={carne.title} />
                    <div className={styles.cover}>
                      <span> {carne.type} </span>
                      <h1> {carne.title} </h1> 
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LGpgaIwAI4l91H0BX786OkY');

  const produto = {
    priceId: price.id,
    preco: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100),
  }

  const prismic = getPrismicClient()

  const responseCarnes = await prismic.getByType("carne", {
    pageSize: 4,
  });

  const carnes = responseCarnes.results.map(carne => {
    return {
      slug: carne.uid,
      title: RichText.asText(carne.data.title),
      img: carne.data.img.url,
      type: carne.data.type,
    }
  })

  const responseMassas = await prismic.getByType("massa", {
    pageSize: 3,
  });

  const massas = responseMassas.results.map(massa => {
    return {
      slug: massa.uid,
      title: RichText.asText(massa.data.title),
      img: massa.data.img.url,
      type: massa.data.type,
      timer: massa.data.timer,
    }
  })

  const responseDoces = await prismic.getByType("doce", {
    pageSize: 2,
  });

  const doces = responseDoces.results.map(doce => {
    return {
      slug: doce.uid,
      title: RichText.asText(doce.data.title),
      img: doce.data.img.url,
      type: doce.data.type,
      timer: doce.data.timer,
    };
  })

  console.log(doces)

  return {
    props: {
      produto, doces, massas, carnes
    },
  
  }
}
