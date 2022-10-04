import { useState, useEffect } from "react";
import styled from "styled-components";
import { LoadingWarning } from "./LoadingWarning";
import RepositoryItem from "./RepositoryItem";
import { DownArrowAlt } from "@styled-icons/boxicons-regular/DownArrowAlt";
import { darken, lighten } from "polished";
import { rootColors } from "../styles/GlobalStyles";

const ListContainer = styled.div`
  width: 100%;
`;

const ListHeader = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ListSection = styled.section`
  h1 {
    margin-bottom: 16px;
  }

  ul {
    list-style: none;

    p {
      font-size: 14px;
      color: #444;
      margin-top: 8px;
    }

    a {
      display: inline-block;
      margin-top: 16px;
      text-decoration: none;
      color: #8257e6;
    }
  }
`;

const ListButtonsContainer = styled.div`
  display: flex;
`;

const ListButton = styled.button`
  padding: 1rem;
  background-color: var(--primary);
  border: 0;
  cursor: pointer;

  border-radius: 0.25rem;

  & + button {
    margin-left: 0.5rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      width: 3rem;
    }
  }

  &:disabled {
    border: 1px solid rgb(0, 0, 0, 0.25);
    cursor: default;
    background-color: ${lighten(0.1, "#c8c8f0")};
  }

  &:disabled:hover {
    background-color: ${lighten(0.1, "#c8c8f0")};
  }

  &:hover {
    background-color: ${darken(0.1, rootColors.primary)};
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

export function RepositoryList({
  name,
  searchType,
  listIsLoading,
  setListIsLoading,
  repositories,
  setRepositories,
}: // setRepositories,
RepositoryListProps) {
  const [repoDirection, setRepoDirection] = useState("asc");
  const [error, setError] = useState(null);
  const [emptyResponse, setEmptyResponse] = useState(false);

  //collects API data from github based on condition (user | org)
  useEffect(() => {
    setError(null);
    setEmptyResponse(false);
    if (searchType === "SearchingForUser") {
      fetch(
        `https://api.github.com/users/${name}/repos?sort=full_name&direction=${repoDirection}`
      )
        .then((response) => {
          if (!response.ok && response.status === 404) {
            throw new Error(`User not found`);
          }
          return response.json();
        })
        .then((data) => {
          setRepositories(data);
          setListIsLoading(false);
          if (data.length === 0) {
            setEmptyResponse(true);
          }
        })
        .catch((err) => {
          setListIsLoading(false);
          setRepositories([]);
          setError(err.message);
        });
    } else if (searchType === "SearchingForOrg") {
      fetch(
        `https://api.github.com/orgs/${name}/repos?sort=full_name&direction=${repoDirection}`
      )
        .then((response) => {
          if (!response.ok && response.status === 404) {
            throw new Error(`Organization not found.`);
          }
          return response.json();
        })
        .then((data) => {
          setRepositories(data);
          setListIsLoading(false);
          if (data.length === 0) {
            setEmptyResponse(true);
          }
        })
        .catch((err) => {
          setListIsLoading(false);
          setRepositories([]);
          setError(err.message);
        });
    }
  }, [name, repoDirection]);

  const List = () => (
    <ListContainer>
      <ListHeader>
        <h1>Repositories List</h1>
        <ListButtonsContainer>
          <ListButton
            disabled={repoDirection === "asc"}
            onClick={() => setRepoDirection("asc")}
          >
            <div>
              <DownArrowAlt size={"1rem"} /> <p>A &#8212; Z</p>
            </div>
          </ListButton>
          <ListButton
            disabled={repoDirection === "desc"}
            onClick={() => setRepoDirection("desc")}
          >
            <div>
              <DownArrowAlt size={"1rem"} /> <p>Z &#8212; A</p>
            </div>
          </ListButton>
        </ListButtonsContainer>
      </ListHeader>
      <ListSection>
        <ul>
          {repositories.map((repo) => (
            <RepositoryItem key={repo.name} repository={repo} />
          ))}
        </ul>
      </ListSection>
    </ListContainer>
  );

  return (
    <>
      {error && <div>{error}</div>}
      {listIsLoading && <LoadingWarning />}
      {emptyResponse && (
        <div>
          {searchType === "SearchingForUser" ? "User" : "Organization"} exists,
          but no public repositories available for showing.
        </div>
      )}
      {repositories.length >= 1 && <List />}

      {/* {Array.isArray(repositories) ? (
        <ListContainer>
          <ListHeader>
            <h1>Repositories List</h1>
            <ListButtonsContainer>
              <ListButton onClick={() => setRepoDirection("asc")}>A</ListButton>
              <ListButton onClick={() => setRepoDirection("desc")}>
                Z
              </ListButton>
            </ListButtonsContainer>
          </ListHeader>
          <ListSection>
            <ul>
              {repositories.map((repo) => (
                <RepositoryItem key={repo.name} repository={repo} />
              ))}
            </ul>
          </ListSection>
        </ListContainer>
      ) : (
        <div>
          We were unable to find an{" "}
          {searchType === "SearchingForUser" ? "user" : "organization"} named '
          {name}'.
        </div>
      )} */}
    </>
  );
}
