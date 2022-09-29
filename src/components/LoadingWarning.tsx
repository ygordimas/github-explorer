import React from "react";
import { Loader } from "@styled-icons/boxicons-regular/Loader";
import styled from "styled-components";
import { darken, lighten, transparentize } from "polished";
import { rootColors } from "../styles/GlobalStyles";

const StyledLoader = styled(Loader)`
  margin: 0 auto;
  color: ${transparentize(0.2, rootColors.primary)};
  animation: rotation 2s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export function LoadingWarning() {
  return (
    <>
      <StyledLoader size={"10rem"} title="Loading" />
    </>
  );
}
