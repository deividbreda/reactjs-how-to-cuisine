import styles from './styles.module.scss'

import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export function Footer(){
    return(
        <>
            <div className={styles.content}>
                <div className="containerWidth">
                    <div className={styles.allFooter}>
                        <div className={styles.info}>
                            <img className={styles.imgLogo} src="/images/logorodape.png" alt="" />
                            <p> O maior e melhor site de receitas!</p>
                            <button> Assine já! 🤗</button>
                            <div className={styles.social}>
                                <a href=""> {<FaFacebook/>} </a>
                                <a href=""> {<FaInstagram/>} </a>
                                <a href=""> {<FaLinkedinIn/>} </a>
                                <a href=""> {<FaGithub/>} </a>
                            </div>
                        </div>

                        <div className={styles.links}>
                            <h1> Categorias </h1>
                            <ul>
                                <li><a href=""> Bolos e Tortas </a></li>
                                <li><a href=""> Doces e Sobremesas </a></li>
                                <li><a href=""> Lanches </a></li>
                                <li><a href=""> Massas </a></li>
                                <li><a href=""> Saladas </a></li>
                                <li><a href=""> Peixes e Frutos do mar </a></li>
                                <li><a href=""> Carnes </a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.copyright}>
                        <span> &copy; 2022 How Cuisine</span>
                        <a href=""> Desenvolvido por Deivid Breda </a>
                    </div>
                </div>
            </div>
        </>
    );
}