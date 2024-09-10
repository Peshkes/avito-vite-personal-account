import React from 'react';
import style from './Textarea.module.css';

interface TextareaProps {
    id: string;
    name: string;
    value: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ id, name, value, onChange, placeholder, required = false, label }) => {
    return (
        <div className={style.formGroup}>
            <label htmlFor={id} className={style.label}>{label}</label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={style.textarea}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default Textarea;
