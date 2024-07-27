import styled, { css } from "styled-components";
import { smallFont, fontWeightMedium } from "../components/core/styled/styles";
export interface Message {
  name: string;
  color: string;
  message: string;
}

const Container = styled.div`
  display: inline-block;
  ${smallFont}
  ${fontWeightMedium}
`;

export const Username = styled.p<{ color: string }>`
  ${({ color }) =>
    css`
      color: ${color};
      ${color === "#000000" &&
      css`
        -webkit-text-stroke-width: 0.025rem;
        -webkit-text-stroke-color: #efeff1;
      `}
    `}
`;

const UsernameWrapper = styled(Username)`
  display: inline-block;
  font-weight: bold;
`;

const Message = styled.span`
  color: #efeff1;
`;

const UserMessage = ({ name, color, message }: Message) => (
  <Container>
    <UsernameWrapper color={color}>{name}</UsernameWrapper>
    <Message>: {message}</Message>
  </Container>
);

export default UserMessage;
