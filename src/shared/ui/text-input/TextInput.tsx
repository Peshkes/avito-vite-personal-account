import React from 'react';
import style from './TextInput.module.css';

interface InputProps {
    id: string;
    name: string;
    value: string | number;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
}

const TextInput: React.FC<InputProps> = ({ id, name, value, onChange, type = 'text', placeholder, required = false, label}) => {
    return (
        <div className={style.formGroup}>
            <label htmlFor={id} className={style.label}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={style.input}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default TextInput;
