import React, { useEffect } from 'react';
import style from './WrapperModal.module.css';

type Props = {
    closeFunction: () => void;
    children: React.ReactNode;
};

const WrapperModal = ({ children, closeFunction }: Props) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeFunction();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeFunction]);

    return (
        <div className={style.overlay}>
            <button
                onClick={closeFunction}
                className={style.closeButton}
            >
                x
            </button>
            {children}
        </div>
    );
};

export default WrapperModal;
