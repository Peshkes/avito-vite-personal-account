import styles from './ModalWindow.module.css';
import React from "react"; // Импортируйте стили

type ModalWindowProps = {
    children: React.ReactNode
}

const ModalWindow = ({children}: ModalWindowProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ModalWindow;
