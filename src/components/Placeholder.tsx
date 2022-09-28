import styled from "styled-components";

const PlaceholderContainer = styled.div`
  background-color: blanchedalmond;
`;

export function Placeholder() {
  return (
    <PlaceholderContainer>
      Once a Github username is provided, a list of it's public repositories
      will appear here.
    </PlaceholderContainer>
  );
}
