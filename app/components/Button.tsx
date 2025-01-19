"use client";

import styles from './style.module.css';

interface ButtonProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  label?: string;
  className?: string;
}

const Button = ({ onClick, label, className }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`${styles.buttonClass} ${className || ''}`.trim()}
    >
      {label}
    </button>
  );
};

export default Button;
