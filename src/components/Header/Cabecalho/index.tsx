import styles from './styles.module.scss'

import { FaSearch } from "react-icons/fa";
import { BotaoEntrar } from './BotaoEntrar';
import Link from 'next/link';

export function Cabecalho(){
    return (
        <>
            <header className={styles.cabecalho}>
                <div className="containerWidth">
                    <div className={styles.allCabecalho}>  
                        <Link href="/">    
                            <a> 
                                <img className={styles.imgLogo} src="/images/logo.png" alt="" />
                            </a> 
                        </Link> 
                       
                        <div className={styles.pesquisa}>
                            <input type="text" placeholder="Encontre uma receita..." />
                            <button> {<FaSearch />} </button>
                        </div>

                        <div className={styles.botao}>
                            <BotaoEntrar />
                        </div>          
                    </div>
                </div>
            </header>
        </>
    )
}