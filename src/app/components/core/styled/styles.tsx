import { css } from "styled-components";

export const disabled = css`
  &:disabled {
    opacity: 0.4;
    font-style: italic;
    cursor: not-allowed;
  }
`;

export const smallFont = css`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const fontWeightMedium = css`
  font-weight: 500;
`;

export const fontWeightSemiBold = css`
  font-weight: 600;
`;
