import styles from './styles.module.scss'

export function Menu(){
    return(
        <>
            <div className={styles.content}>
                <div className="containerWidth">
                    <nav>
                        <a href=""> Bolos e Tortas</a>
                        <a href=""> Doces e Sobremesas</a>
                        <a href=""> Lanches</a>
                        <a href=""> Massas</a>
                        <a href=""> Saladas</a>
                        <a href=""> Peixes e frutos do mar</a>
                        <a href=""> Carnes </a>
                    </nav>
                </div>
            </div>
        </>
    );
}