import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  ariaLabel: string;
  variant?: ButtonVariants;
}

type ButtonVariants = "primary" | "secondary" | "destructive" | undefined;

const variants: any = {
  primary: "bg-[#9147ff] hover:bg-[#772ce8]",
  secondary: "bg-[#53535f61] hover:bg-[#9147ff]",
  destructive: "bg-[#53535f61] hover:bg-[#ff4f4d]",
};

const Button = ({
  children,
  ariaLabel,
  variant = "primary",
  ...rest
}: ButtonProps) => (
  <button
    className={`text-[#efeff1] ${variants[variant]} text-sm font-semibold rounded-sm text-sm px-2 py-1 disabled:opacity-40 disabled:hover:bg-[#9147ff] disabled:italic disabled:cursor-not-allowed`}
    aria-label={ariaLabel}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
