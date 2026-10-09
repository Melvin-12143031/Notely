
import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  type = 'button',
  onClick,
  className = '',
  variant = 'default',
  disabled = false
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={`button button-${variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;