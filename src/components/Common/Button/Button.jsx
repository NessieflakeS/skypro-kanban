import { StyledButton } from './Button.styled';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  full = false,
  ...props 
}) {
  return (
    <StyledButton 
      $variant={variant}        
      $size={size}            
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      $full={full}            
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;