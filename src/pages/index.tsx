import { GetStaticProps } from 'next'
import Head from 'next/head'
import { BotaoAssinar } from '../components/Homepage/BotaoAssinar'
import { stripe } from '../services/stripe'

import styles from './styles.module.scss'

interface HomeProps {
  produto: {
    priceId: string,
    preco: number,
  }
}

export default function Home({ produto }: HomeProps) {
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
              <div className={styles.doce}>
                <a href="">
                  <img src="/images/testeimg.png" alt="" />
                  <div className={styles.cover}>
                    <h2> Churros mexicano </h2>
                    <time> 12/06/2022 </time>
                  </div>
                </a>
              </div>  

              <div className={styles.doce}>
                <a href="">
                  <img src="/images/testeimg.png" alt="" />
                  <div className={styles.cover}>
                    <h2> Churros mexicano </h2>
                    <time> 12/06/2022 </time>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.category}> 
            <div className={styles.massas}>
              <div className={styles.massa}>
                <a href="">
                  <img src="/images/testeimg.png" alt="" />
                  <div className={styles.textoMassa}>
                    <h1> Lasanha a Bolonhesa </h1>
                    <time> 12/02/2022 </time>
                  </div>
                </a>
              </div>

              <div className={styles.massa}>
                <a href="">
                  <img src="/images/testeimg.png" alt="" />
                  <div className={styles.textoMassa}>
                    <h1> Lasanha a Bolonhesa </h1>
                    <time> 12/02/2022 </time>
                  </div>
                </a>
              </div>

              <div className={styles.massa}>
                <a href="">
                  <img src="/images/testeimg.png" alt="" />
                  <div className={styles.textoMassa}>
                    <h1> Lasanha a Bolonhesa </h1>
                    <time> 12/02/2022 </time>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.category}>
            <div className={styles.carnes}>
              <div className={styles.carne}>
                <a href="">
                  <img className={styles.img} src="/images/testeimg.png" alt="" />
                  <div className={styles.cover}>
                    <h1> Carne ao Molho Madeira </h1>
                  </div>
                </a>
              </div>

              <div className={styles.carne}>
                <a href="">
                  <img className={styles.img} src="/images/testeimg.png" alt="" />
                  <div className={styles.cover}>
                    <h1> Carne ao Molho Madeira </h1>
                  </div>
                </a>
              </div>

              <div className={styles.carne}>
                <a href="">
                  <img className={styles.img} src="/images/testeimg.png" alt="" />
                  <div className={styles.cover}>
                    <h1> Carne ao Molho Madeira </h1>
                  </div>
                </a>
              </div>

              <div className={styles.carne}>
                <a href="">
                  <img className={styles.img} src="/images/testeimg.png" alt="" />
                  <div className={styles.cover}>
                    <h1> Carne ao Molho Madeira </h1>
                  </div>
                </a>
              </div>
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

  return {
    props: {
      produto,
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}
