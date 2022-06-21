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
      </div>
    </>
  )
}
