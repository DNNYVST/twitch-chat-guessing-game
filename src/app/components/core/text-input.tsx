import { ComponentPropsWithoutRef } from "react";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  ariaLabel: string;
  id: string;
  label?: string;
}

const TextInput = ({ ariaLabel, id, label = "", ...rest }: TextInputProps) => (
  <>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-[#efeff1]">
        {label}:
      </label>
    )}
    <input
      className="text-[#efeff1] text-sm border border-black bg-inherit rounded-sm px-2 py-1 focus:outline-none focus:border-[#9147ff] disabled:opacity-40 disabled:italic disabled:cursor-not-allowed"
      type="text"
      aria-label={ariaLabel}
      {...rest}
    />
  </>
);

export default TextInput;
