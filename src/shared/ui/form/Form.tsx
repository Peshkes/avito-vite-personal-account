import React from 'react';
import styles from './Form.module.css';

interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
        {children}
        </form>
);
};

export default Form;
