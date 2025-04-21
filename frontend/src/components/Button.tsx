import React from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'outline' | 'link';
  block?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = '',
  style,
  variant = 'default',
  block = false,
}) => {
  const getButtonClass = () => {
    let baseClass = 'btn';

    if (variant === 'outline') {
      baseClass += ' btn-outline';
    } else if (variant === 'link') {
      baseClass += ' btn-link';
    }

    if (block) {
      baseClass += ' btn-block';
    }

    return `${baseClass} ${className}`;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={getButtonClass()}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
