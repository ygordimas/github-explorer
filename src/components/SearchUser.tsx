import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;

  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  /* max-width: 400px; */
  padding: 0 0.5rem;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  height: 1.75rem;
  margin-left: 0.5rem;
  border: 0;
  cursor: pointer;
`;

interface SearchUserProps {
  username: string;
  setUsername: (arg: string) => void;
  searchType: string;
}

export function SearchUser({
  username,
  setUsername,
  searchType,
}: SearchUserProps) {
  const [usernameInput, setUsernameInput] = useState("");

  //guarantees that input field will be cleared when a different radio button is selected
  useEffect(() => {
    setUsernameInput(username);
  }, [username]);

  const handleClear = () => {
    setUsernameInput("");
    setUsername("");
  };

  return (
    <Container>
      <StyledInput
        type="text"
        name="username"
        id="username"
        placeholder={`Insert ${
          searchType === "SearchingForUser" ? "username" : "organization's name"
        } here`}
        value={usernameInput}
        onChange={(event) => setUsernameInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setUsername(usernameInput);
          }
        }}
      />
      <StyledButton onClick={() => setUsername(usernameInput)}>
        Search
      </StyledButton>

      <StyledButton onClick={() => handleClear()}>Clear</StyledButton>
    </Container>
  );
}
