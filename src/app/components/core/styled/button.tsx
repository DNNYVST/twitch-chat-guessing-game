import { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";

type ButtonVariants = "primary" | "secondary" | "destructive" | undefined;

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariants;
}

const VARIANTS = {
  primary: css`
    background: #9147ff;
    &:hover:enabled {
      background: #772ce8;
    }
  `,
  secondary: css`
    background: #53535f61;
    &:hover:enabled {
      background: #9147ff;
    }
  `,
  destructive: css`
    background: #53535f61;
    &:hover:enabled {
      background: #ff4f4d;
    }
  `,
};

const Button = styled.button<{ variant?: ButtonVariants }>`
  color: #efeff1;

  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;

  border-radius: 0.125em;
  padding: 0.25em 0.5em;

  &:disabled {
    opacity: 0.4;
    font-style: italic;
    cursor: not-allowed;
  }

  ${({ variant }) => variant && VARIANTS[variant]}
`;

Button.defaultProps = {
  variant: "primary",
};

export default Button;
