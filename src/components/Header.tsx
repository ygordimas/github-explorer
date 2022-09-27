import React from "react";
import { SearchUser } from "./SearchUser";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export default function Header() {
  return (
    <StyledHeader>
      <SearchUser />
    </StyledHeader>
  );
}
