import { ComponentPropsWithoutRef } from "react";
import { Container, Label, Input } from "./text-input.styled";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label?: string;
}

const TextInput = ({ id, label = "", ...rest }: TextInputProps) => (
  <Container>
    {label && <Label htmlFor={id}>{label}:</Label>}
    <Input type="text" {...rest} />
  </Container>
);

export default TextInput;
