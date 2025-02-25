import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button = ({ children, variant = 'default', ...props }: ButtonProps) => {
  const variants = {
    outline:
      'px-4 py-2 font-bold text-simplifud rounded border-2 border-simplifud disabled:opacity-50',
    default:
      'px-4 py-2 font-bold text-white bg-simplifud rounded disabled:opacity-50',
  };

  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
};

export default Button;
