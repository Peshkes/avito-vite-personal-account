import React, { useState, ReactNode } from 'react';
import style  from './DropdownButton.module.css';


interface DropdownButtonProps {
    buttonText: string;
    dropdownContent: ReactNode;
    active: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({buttonText, dropdownContent, active}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={style.container} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`${style.button} ${active ? style.active : style.inactive}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                {buttonText}
            </button>
            {isOpen && (
                <div className={style.dropdown}>
                    {dropdownContent}
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
