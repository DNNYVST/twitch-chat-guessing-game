import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import { disabled, smallFont, fontWeightMedium } from "./styles";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label?: string;
}

const Container = styled.div`
  color: #efeff1;
  ${smallFont}
`;

const Label = styled.label`
  display: block;
  ${fontWeightMedium}
`;

const Input = styled.input`
  background: inherit;

  border: 1px solid black;
  border-radius: 0.125rem;
  padding: 0.25rem 0.5rem;

  &:focus {
    outline: none;
    border-color: #9147ff;
  }

  ${disabled}
`;

const TextInput = ({ id, label = "", ...rest }: TextInputProps) => (
  <Container>
    {label && <Label htmlFor={id}>{label}:</Label>}
    <Input type="text" {...rest} />
  </Container>
);

export default TextInput;
