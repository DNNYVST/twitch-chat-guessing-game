import { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";
import { disabled, smallFont, fontWeightSemiBold } from "../styles";

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

  ${smallFont}
  ${fontWeightSemiBold}

  border-radius: 0.125rem;
  padding: 0.25rem 0.5rem;

  ${disabled}

  ${({ variant }) => variant && VARIANTS[variant]}
`;

Button.defaultProps = {
  variant: "primary",
};

export default Button;
