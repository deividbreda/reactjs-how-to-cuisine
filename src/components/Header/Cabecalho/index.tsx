import styles from './styles.module.scss'

import { FaSearch } from "react-icons/fa";
import { BotaoEntrar } from './BotaoEntrar';

export function Cabecalho(){
    return (
        <>
            <header className={styles.cabecalho}>
                <div className="containerWidth">
                    <div className={styles.allCabecalho}>           
                        <img className={styles.imgLogo} src="/images/logo.png" alt="" />
                       
                        <div className={styles.pesquisa}>
                            <input type="text" placeholder="Encontre uma receita..." />
                            <button> {<FaSearch />} </button>
                        </div>
                                      
                        <BotaoEntrar />
                    </div>
                </div>
            </header>
        </>
    )
}