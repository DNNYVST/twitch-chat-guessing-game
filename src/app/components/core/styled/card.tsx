import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { smallFont } from "./styles";

const Container = styled.div`
  display: block;
  background: #1f1f23;
  border: 1px solid black;
  border-radius: 0.375rem;
  padding: 1rem;
  height: 100%;
  box-shadow: 0 10px 15px -3px black;
`;

const Title = styled.p`
  color: #efeff1;
  display: block;
  margin-bottom: 0.5rem;
  ${smallFont}
  font-weight: 500;
`;

const Card = ({
  title,
  children,
  button = null,
}: {
  title: string;
  children: ReactNode;
  button?: ReactNode;
}) => (
  <Container>
    <Title>
      {title} <span style={{ float: "right" }}>{button}</span>
    </Title>
    {children}
  </Container>
);

export default Card;
