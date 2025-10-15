import './Button.css';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) {
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim();
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;