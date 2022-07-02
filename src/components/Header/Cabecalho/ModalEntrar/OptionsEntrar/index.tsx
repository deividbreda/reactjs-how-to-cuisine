import { signIn } from 'next-auth/react';

import styles from './styles.module.scss'

import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";

export function OptionsEntrar() {
    return(
        <div className={styles.options}>
            <button onClick={() => signIn('github')}> {<FaGithub />} Github </button>
            <button> {<FaGoogle />} Google </button>
            <button> {<FaFacebook />} Facebook </button>
        </div>
    );
}