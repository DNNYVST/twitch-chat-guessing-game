import styled, { css } from "styled-components";

export const Grid = styled.div<{ gap?: string }>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  ${({ gap }) =>
    gap &&
    css`
      grid-gap: ${gap};
    `}
`;

Grid.defaultProps = {
  gap: "0.5rem",
};

export const Column = styled.div<{ size: number }>`
  ${({ size }) =>
    css`
      grid-column: span ${size};
    `}
`;
