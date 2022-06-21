import styles from './styles.module.scss'

import { FaSearch, FaSignInAlt } from "react-icons/fa";

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
                                      
                        <a> ENTRAR {<FaSignInAlt />}</a>
                    </div>
                </div>
            </header>
        </>
    )
}