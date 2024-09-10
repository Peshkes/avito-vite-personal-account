import React, {useState} from 'react';
import ModalWindow from './ModalWindow.tsx';
import WrapperModal from "../wrapper-modal/WrapperModal.tsx";

const useModal = (externalBody: React.ReactNode) => {
    const [body, setBody] = useState<React.ReactNode | null>(null);

    const closeModal = () => setBody(null);

    const handleOpenModal = () => {
        setBody(externalBody);
    };

    const ModalComponent  = body ? (
        <WrapperModal closeFunction={closeModal}>
            <ModalWindow>
                {body}
            </ModalWindow>
        </WrapperModal>
    ) : null;

    return {
        handleOpenModal,
        ModalComponent
    };
};

export default useModal;
