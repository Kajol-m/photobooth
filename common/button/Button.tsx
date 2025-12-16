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
    // 1. REMOVED fixed w/h classes (w-28, h-9, etc.)
    // 2. ADDED padding (px-6 py-1.5) and min-width for consistent sizing
    const baseClasses = 
      "group relative inline-flex items-center justify-center overflow-hidden cursor-pointer border-2  text-sm md:text-xl font-medium px-8 md:px-8 whitespace-nowrap";
    
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
      {/* 3. GHOST ELEMENT FOR SIZING
         This invisible span sits normally in the DOM flow. 
         It forces the button to be exactly as wide/tall as the text requires. 
      */}
      <span className="invisible opacity-0 select-none">
        {children}
      </span>

      {/* 4. ANIMATION CONTAINER 
         Kept absolute to overlay the ghost element perfectly.
      */}
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