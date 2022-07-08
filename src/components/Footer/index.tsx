import styles from './styles.module.scss'

import { FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Link from 'next/link';
import { Links } from './Links';

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
                            <Links />
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