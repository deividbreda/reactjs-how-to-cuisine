import { Links } from './Links';
import styles from './styles.module.scss'

export function Menu(){
    return(
        <>
            <div className={styles.content}>
                <div className="containerWidth">
                    <nav>
                        <Links />
                    </nav>
                </div>
            </div>
        </>
    );
}