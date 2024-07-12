import { ChangeEventHandler } from "react";

const TextInput = ({
  title,
  id,
  value,
  onChange,
  placeholder = "",
  label = "",
}: {
  title: string;
  id: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
}) => (
  <>
    {label && (
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#efeff1]"
      >
        {label}:
      </label>
    )}
    <input
      className="text-[#efeff1] text-sm font-medium border border-black bg-inherit rounded-sm px-2 py-1"
      type="text"
      title={title}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </>
);

export default TextInput;
