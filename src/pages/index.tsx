import { GetStaticProps } from 'next'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { BotaoAssinar } from '../components/Homepage/BotaoAssinar'
import { getPrismicClient } from '../services/prismic'
import { stripe } from '../services/stripe'

import { BsAlarm } from "react-icons/bs";
import { BiDish } from "react-icons/bi";

import styles from './styles.module.scss'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useModal } from '../hook/useModal'

type Doces = {
  slug: string,
  title: string,
  img: string,
  type: string,
  timer: number,
  porcao: number,
}

type Massas = {
  slug: string,
  title: string,
  img: string,
  type: string,
  timer: number,
  porcao: number,
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
  const { data: session } = useSession();

  const { openModal } = useModal();

  function handleLogin() {
    openModal();
  }

  return(
    <>
      <Head> 
        <title> Home | How to Cuisine</title>
      </Head>

      <div className="containerWidth">
        <div className={styles.featured}>
          <div className={styles.text}>
            <h1> As melhores <span> receitas </span> da internet estão aqui! </h1>
            <p> Assine por apenas <b> {produto.preco} mensal </b> e tenha acesso a todas as receitas! </p>
            <BotaoAssinar />
          </div>
          <img src="/images/cartoonchef.png" alt="" />
        </div>

        <div className={styles.posts}>
          <div className={styles.category}>
            <div className={styles.doces}>
              {doces.map(doce => (
                <div key={doce.slug} className={styles.doce}>
                  {!session ?
                    <a onClick={handleLogin}>
                      <img src={doce.img} alt={doce.title} />
                      <div className={styles.cover}>
                        <Link href="/doces">
                          <span> 
                            {doce.type} 
                          </span>
                        </Link>
                        <h2> {doce.title} </h2>
                        <div className={styles.itens}>
                          <p> <b> <BsAlarm /> </b> {doce.timer} min </p>
                          <p className={styles.porcao}> <b> <BiDish /> </b> {doce.porcao} {doce.porcao == 1 ? "porção" : "porções"} </p>
                        </div> 
                      </div>
                    </a>
                  :
                    <Link href={`/doces/${doce.slug}`}>
                      <a>
                        <img src={doce.img} alt={doce.title} />
                        <div className={styles.cover}>
                          <Link href="/doces">
                            <span> 
                              {doce.type} 
                            </span>
                          </Link>
                          <h2> {doce.title} </h2>
                          <div className={styles.itens}>
                            <p> <b> <BsAlarm /> </b> {doce.timer} min </p>
                            <p className={styles.porcao}> <b> <BiDish /> </b> {doce.porcao} {doce.porcao == 1 ? "porção" : "porções"} </p>
                          </div> 
                        </div>
                      </a>
                    </Link>
                  }
                </div>  
              ))}              
            </div>
          </div>

          <div className={styles.category}> 
            <div className={styles.massas}>
              {massas.map(massa => (
                <div key={massa.slug} className={styles.massa}>
                  {!session ?
                    <a onClick={handleLogin}>
                      <img src={massa.img} alt={massa.title} />
                      <Link href="/massas">
                        <span> 
                          {massa.type} 
                        </span>
                      </Link>
                      <div className={styles.textoMassa}>
                        <h1> {massa.title} </h1>
                        <div className={styles.itens}>
                          <p> <b> <BsAlarm /> </b> {massa.timer} min </p>
                          <p className={styles.porcao}> <b> <BiDish /> </b> {massa.porcao} {massa.porcao == 1 ? "porção" : "porções"} </p>
                        </div>                   
                      </div>
                    </a>
                  :
                    <Link href={`/massas/${massa.slug}`}>
                      <a>
                        <img src={massa.img} alt={massa.title} />
                        <Link href="/massas">
                          <span> 
                            {massa.type} 
                          </span>
                        </Link>
                        <div className={styles.textoMassa}>
                          <h1> {massa.title} </h1>
                          <div className={styles.itens}>
                            <p> <b> <BsAlarm /> </b> {massa.timer} min </p>
                            <p className={styles.porcao}> <b> <BiDish /> </b> {massa.porcao} {massa.porcao == 1 ? "porção" : "porções"} </p>
                          </div>                   
                        </div>
                      </a>
                    </Link>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className={styles.category}>
            <div className={styles.carnes}>
              {carnes.map(carne => (
                <div key={carne.slug} className={styles.carne}>
                  {!session ?
                    <a onClick={handleLogin}>
                      <img className={styles.img} src={carne.img} alt={carne.title} />
                      <div className={styles.cover}>
                        <Link href="/carnes">
                          <span> 
                            {carne.type} 
                          </span>
                        </Link>
                        <h1> {carne.title} </h1> 
                      </div>
                    </a>
                  :
                    <Link href={`/carnes/${carne.slug}`}>
                      <a>
                        <img className={styles.img} src={carne.img} alt={carne.title} />
                        <div className={styles.cover}>
                          <Link href="/carnes">
                            <span> 
                              {carne.type} 
                            </span>
                          </Link>
                          <h1> {carne.title} </h1> 
                        </div>
                      </a>
                    </Link>
                  }
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
      porcao: massa.data.porcao,
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
      porcao: doce.data.porcao,
    };
  })

  return {
    props: {
      produto, doces, massas, carnes
    },
  
  }
}
