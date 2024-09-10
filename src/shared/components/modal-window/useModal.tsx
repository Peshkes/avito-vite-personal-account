import React, {useState} from 'react';
import ModalWindow from './ModalWindow.tsx';
import WrapperModal from "../wrapper-modal/WrapperModal.tsx";

const useModal = (body: React.ReactNode) => {
    const [modalWindow, setModalWindow] = useState<React.ReactNode | null>(null);

    const closeModal = () => setModalWindow(null);

    const handleOpenModal = () => {
        setModalWindow(body);
    };

    const ModalComponent  = modalWindow ? (
        <WrapperModal closeFunction={closeModal}>
            <ModalWindow>
                {modalWindow}
            </ModalWindow>
        </WrapperModal>
    ) : null;

    return {
        handleOpenModal,
        ModalComponent
    };
};

export default useModal;
