"use client";

import styled, { css } from "styled-components";

type ButtonVariants = "primary" | "secondary" | "destructive" | undefined;

const Button = styled.button<{ variant?: ButtonVariants }>`
  margin: 1em;
  color: #efeff1;
  background: #9147ff;
  border: 1px solid #efeff1;
  border-radius: 4px;
  padding: 0.25em 0.5em;

  &:hover {
    background-color: #772ce8;
  }

  ${({ variant }) =>
    variant &&
    css`
      background: #53535f61;
    `}
`;

export default function Page() {
  return (
    <>
      <Button variant="secondary">button</Button>
      <div className="flex flex-row items-stretch space-x-4 border-2 border-red-600 my-[5%] mx-[5%] sm:mx-[20%]">
        <div className="flex flex-col w-1/2 space-y-4">
          <div className="p-4 border-2 border-purple-500 h-3/6">Projects</div>
          <div className="p-4 border-2 border-purple-500 h-3/6">Empty </div>
        </div>
        <div className="w-1/2 p-6 border-2 border-purple-500 ">Study/Work</div>
      </div>
    </>
  );
}
