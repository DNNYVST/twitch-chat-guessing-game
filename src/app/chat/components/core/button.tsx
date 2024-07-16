import { MouseEventHandler } from "react";

type ButtonTypes = "button" | "reset" | "submit" | undefined;

type ButtonVariants = "primary" | "secondary" | undefined;

const variants: any = {
  primary: "bg-[#9147ff] hover:bg-[#772ce8]",
  secondary: "bg-[#53535f61] hover:bg-[#FF8280]",
};

const Button = ({
  children,
  onClick,
  type,
  variant = "primary",
  disabled = false,
}: {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
  variant?: ButtonVariants;
  disabled?: boolean;
}) => (
  <button
    className={`text-[#efeff1] ${variants[variant]} text-sm font-semibold rounded-sm text-sm px-2 py-1 disabled:opacity-40 disabled:hover:bg-[#9147ff] disabled:italic`}
    type={type || "button"}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
