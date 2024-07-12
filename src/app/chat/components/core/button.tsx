import { MouseEventHandler } from "react";

type ButtonTypes = "button" | "reset" | "submit" | undefined;

const Button = ({
  children,
  onClick,
  type,
  disabled = false,
}: {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
  disabled?: boolean;
}) => (
  <button
    className="text-[#efeff1] bg-[#9147ff] hover:bg-[#772ce8] text-sm font-semibold rounded-sm text-sm px-2 py-1 disabled:opacity-40 disabled:hover:bg-[#9147ff] disabled:italic"
    type={type || "button"}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
