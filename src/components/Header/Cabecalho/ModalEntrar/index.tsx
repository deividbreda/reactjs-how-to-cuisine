import Modal from "react-modal";
import { OptionsEntrar } from "./OptionsEntrar";

import styles from './styles.module.scss'

interface ModalLoginProps {
    isOpen: boolean,
    onClose: () => void,
}

export function ModalLogin({ isOpen, onClose }: ModalLoginProps){
    return(
        <>
            <Modal isOpen={isOpen} onRequestClose={onClose} 
            overlayClassName="reactModalOverlay"
            className="reactModalContent"> 

                <button type="button" onClick={onClose} 
                className="reactModalClose"> <img src="images/close.svg" alt="Fechar modal"/> </button>

                <div className={styles.modalContent}>
                    <h1> Entrar </h1>
                    <p> Entre agora mesmo com uma das opções abaixo </p>
                    <OptionsEntrar />
                </div>

            </Modal>
        </>
    );
}