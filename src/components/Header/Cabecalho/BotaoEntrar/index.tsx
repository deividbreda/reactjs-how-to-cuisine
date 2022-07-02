import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { ModalLogin } from "../ModalEntrar";

import styles from '../../Cabecalho/styles.module.scss'

import { FaSignInAlt } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi";
import { useModal } from "../../../../hook/useModal";

export function BotaoEntrar() {
    const {data: session} = useSession();
    
    const { openModal, closeModal, modal } = useModal();

    function handleOpenModalLogin() {
        openModal();
    }

    function handleCloseModalLogin() {
        closeModal();
    }

    return(
        <>
            <ModalLogin isOpen={modal} onClose={handleCloseModalLogin} />
            {session ? (
                <a className={styles.logado} onClick={() => signOut()}> {session.user.name} <FiLogOut /> </a>
            ) : (
                <a onClick={handleOpenModalLogin}> Entrar <FaSignInAlt /> </a>
            )}
            
        </>
    );
}