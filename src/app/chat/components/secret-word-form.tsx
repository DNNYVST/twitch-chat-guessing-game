import { useState } from "react";
import TextInput from "./core/text-input";
import Button from "./core/button";

const SecretWordForm = ({ onSubmit }: { onSubmit: Function }) => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <div className="mb-2">
        <TextInput
          title="Enter secret word"
          placeholder="Enter secret word"
          id="secretword"
          value={value}
          onChange={({ target: { value } }) => setValue(value.trim())}
        />
      </div>
      <Button
        aria-label="Save secret word"
        onClick={() => onSubmit(value)}
        disabled={!value}
      >
        Save
      </Button>
    </>
  );
};

export default SecretWordForm;
