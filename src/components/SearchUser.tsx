import { useEffect, useState } from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";

const Container = styled.div`
  display: flex;

  align-items: center;
  width: 100%;
  margin-top: 1rem;

  div {
    display: flex;

    @media screen and (max-width: 767px) {
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  /* max-width: 400px; */
  padding: 0 0.5rem;

  &:focus {
    outline: 2px solid lightblue;
    border: 1px solid lightblue;
  }
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
  background-color: #c8c8f0;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${darken(0.1, "#c8c8f0")};
  }

  & + button {
    background-color: ${lighten(0.1, "#c8c8f0")};

    @media screen and (max-width: 767px) {
      margin-left: 0.5rem;
    }
  }

  & + button:hover {
    background-color: ${lighten(0.2, "#c8c8f0")};
  }

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
`;

interface Repository {
  name: string;
  description: string;
  url: string;
}

interface RepositoryListProps {
  name: string;
  searchType: string;
  listIsLoading: boolean;
  setListIsLoading: (value: boolean) => void;
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
}

interface Repository {
  name: string;
  description: string;
  url: string;
}

interface SearchUserProps {
  username: string;
  setUsername: (arg: string) => void;
  searchType: string;
  listIsLoading: boolean;
  setListIsLoading: (value: boolean) => void;
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
}

export function SearchUser({
  username,
  setUsername,
  searchType,
  listIsLoading,
  setListIsLoading,
  repositories,
  setRepositories,
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
          if (event.key === "Enter" && username !== usernameInput) {
            setRepositories([]);
            setUsername(usernameInput);
            setListIsLoading(true);
          }
        }}
      />
      <div>
        <StyledButton
          onClick={() => {
            if (username !== usernameInput) {
              setRepositories([]);
              setUsername(usernameInput);
              setListIsLoading(true);
            }
          }}
        >
          Search
        </StyledButton>

        <StyledButton onClick={() => handleClear()}>Clear</StyledButton>
      </div>
    </Container>
  );
}
