import React from "react";

export type ButtonVariant="primary" | "secondary" | "enter";

export interface ButtonProps{
    variant: ButtonVariant;
    onClick?:()=>void;
    children: React.ReactNode;
    className?: string;
    type?:"button" | "submit" | "reset";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  className,
  type,
  ...rest
}) => {
  const getButtonClass = (variant: ButtonVariant) => {
    switch (variant) {
      case "primary":
        return "bg-white lg:text-md md:text-sm text-xs border border-black lg:py-2 py-1 lg:px-5 px-2 hover:underline underline-offset-4 decoration-1 whitespace-nowrap";
      case "secondary":
        return "bg-black text-white pt-2 pb-2 pl-5 pr-5 hover:underline underline-offset-4 decoration-1";
      case "enter":
        return "bg-black text-[#f5aebb] text-bold py-2 px-5 hover:scale-125 shadow-[0_0_25px_15px_#f5aebb]";
      default:
        return "";
    }
  };

  return (
    <button
      className={`${getButtonClass(variant)} ${className}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
