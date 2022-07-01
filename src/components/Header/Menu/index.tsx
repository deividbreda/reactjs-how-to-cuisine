import styles from './styles.module.scss'

export function Menu(){
    return(
        <>
            <div className={styles.content}>
                <div className="containerWidth">
                    <nav>
                        <a href=""> Doces</a>
                        <a href=""> Massas</a>
                        <a href=""> Saladas</a>
                        <a href=""> Carnes </a>
                    </nav>
                </div>
            </div>
        </>
    );
}