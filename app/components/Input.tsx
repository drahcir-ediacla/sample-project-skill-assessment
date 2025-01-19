"use client";

import styles from './style.module.css';

interface InputProps {
    id?: string;
    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
}

const Input = ({ id, type, name, value, placeholder, className, disabled = false, readOnly = false, onChange }: InputProps) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly} 
            className={`${styles.inputField} ${className || ''}`.trim()}
            onChange={onChange}
        />
    )
}

export default Input