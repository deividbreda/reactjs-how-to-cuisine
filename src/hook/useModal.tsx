import { createContext, ReactNode, useContext, useState } from "react";

interface ModalProviderProps {
    children: ReactNode,
}

interface ModalContextData {
    modal: boolean,
    openModal: () => void,
    closeModal: () => void,
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps){
    const [modal, setModal] = useState(false);

    function openModal(){
        setModal(true);
    }

    function closeModal(){
        setModal(false);
    }
    
    return(
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);

    return context;
}