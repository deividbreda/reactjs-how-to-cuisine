import Head from 'next/head'

import styles from './styles.module.scss'

export default function Home() {
  return(
    <>
      <Head> 
        <title> Home | How to Cuisine</title>
      </Head>

      <div className="containerWidth">
        <div className={styles.featured}>
          <div className={styles.text}>
            <h1> As melhores <span> receitas </span> da internet estão aqui! </h1>
            <p> Assine por apenas <b> R$ 9,90 </b> e tenha acesso a todas as receitas! </p>
            <button> ASSINAR </button>
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
