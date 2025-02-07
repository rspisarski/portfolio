import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className,
  variant = 'primary',
  size = 'md',
  ...props 
}: ButtonProps) {
  const baseStyles = "border rounded-md transition-colors duration-200";
  
  const variants = {
    primary: `
      dark:bg-brand-dark-purple dark:border-brand-light-purple dark:text-brand-purple 
      bg-white border-brand-light-purple text-brand-dark-purple 
      hover:bg-brand-purple hover:text-brand-dark-theme-text hover:border-brand-purple 
      dark:hover:bg-brand-purple dark:hover:text-brand-dark-theme-text dark:hover:border-brand-purple
    `,
    success: "bg-green-500 text-white border-green-500",
    danger: "bg-red-500 text-white border-red-500"
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 