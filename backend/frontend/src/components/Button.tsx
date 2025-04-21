import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = '',
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`neo-btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
