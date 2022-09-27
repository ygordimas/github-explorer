import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  max-width: 400px;
  padding: 0 0.5rem;
`;

export function SearchUser() {
  return (
    <>
      <StyledInput
        type="text"
        name="username"
        id="username"
        placeholder="Search for User"
      />
    </>
  );
}
