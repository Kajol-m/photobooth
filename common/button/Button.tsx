import React from "react";

// Updated variants to match the styling needs (Red, Cream, Pink)
export type ButtonVariant = "primary" | "secondary" | "pink";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  className = "",
  type,
  disabled,
  ...rest
}) => {
  const getButtonClass = (variant: ButtonVariant) => {
    // Shared base classes for layout and animation container
    const baseClasses = "group relative h-9 md:h-10  w-28 md:w-45 overflow-hidden cursor-pointer border-2 transition-all duration-300 text-sm md:text-xl";
    
    switch (variant) {
      case "primary": 
        return `${baseClasses} bg-[#CA152A] text-[#F5F5DA] border-[#CA152A]`;
      case "secondary": 
        return `${baseClasses} bg-[#F5F5DA] text-[#CA152A] border-[#CA152A]`;
      case "pink":
        return `${baseClasses} bg-[#F9CBD6] text-[#CA152A] border-[#CA152A]`;
      default:
        return baseClasses;
    }
  };

  return (
    <button
      className={`${getButtonClass(variant)} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...rest}
    >
      <div className="absolute inset-0 h-full w-full transition-all duration-300 ease-out group-hover:translate-y-full">
        {/* Visible Text */}
        <span className="absolute h-full w-full flex items-center justify-center">
          {children}
        </span>

        {/* Hidden Text (Slides in from top) */}
        <span className="absolute -top-full h-full w-full flex items-center justify-center">
          {children}
        </span>
      </div>
    </button>
  );
};

export default Button;