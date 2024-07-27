import { ReactNode } from "react";
import { Container, Title } from "./card.styled";

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
