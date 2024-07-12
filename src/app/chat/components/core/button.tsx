import { MouseEventHandler } from "react";

type ButtonTypes = "button" | "reset" | "submit" | undefined;

const Button = ({
  children,
  onClick,
  type,
  ...rest
}: {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
}) => (
  <button
    className="text-[#efeff1] bg-[#9147ff] hover:bg-[#772ce8] text-sm font-semibold rounded-sm text-sm px-2 py-1"
    type={type || "button"}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
