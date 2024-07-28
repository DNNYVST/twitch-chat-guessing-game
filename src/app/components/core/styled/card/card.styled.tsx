import styled from "styled-components";
import { smallFont, fontWeightSemiBold } from "../styles";

export const Container = styled.div`
  background: #18181b;
  border-radius: 0.375rem;
  padding: 1rem;
  height: 100%;
  box-shadow: 0 10px 15px -3px black;
`;

export const Title = styled.p`
  color: #efeff1;
  margin-bottom: 0.5rem;
  ${smallFont}
  ${fontWeightSemiBold}
`;
