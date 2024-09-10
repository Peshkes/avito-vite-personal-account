import React from 'react';
import styles from './FormButton.module.css';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void
    children: React.ReactNode;
}

const FormButton: React.FC<ButtonProps> = ({ type = 'button', onClick, children }) => {
    return (
        <button type={type} className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default FormButton;
