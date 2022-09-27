import React from "react";
import { SearchUser } from "./SearchUser";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  padding: 2rem 1rem 1rem;
  background-color: lavender;
  max-width: 800px;
  margin: 0 auto;
`;

export default function Header({ children }: { children: React.ReactNode }) {
  return <StyledHeader>{children}</StyledHeader>;
}
