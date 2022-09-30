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

interface RepositoryListProps {
  name: string;
  searchType: string;
  listIsLoading: boolean;
  setListIsLoading: (value: boolean) => void;
  // setRepositories: (value: string) => void;
}

interface Repository {
  name: string;
  description: string;
  url: string;
}

export function RepositoryList({
  name,
  searchType,
  listIsLoading,
  setListIsLoading,
}: // setRepositories,
RepositoryListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repoDirection, setRepoDirection] = useState("asc");

  //collects API data from github based on condition (user | org)
  useEffect(() => {
    setRepositories([]);
    if (searchType === "SearchingForUser") {
      fetch(
        `https://api.github.com/users/${name}/repos?sort=full_name&direction=${repoDirection}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRepositories(data);
          setListIsLoading(false);
        });
    } else if (searchType === "SearchingForOrg") {
      fetch(
        `https://api.github.com/orgs/${name}/repos?sort=full_name&direction=${repoDirection}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRepositories(data);
          setListIsLoading(false);
        });
    }
  }, [name, repoDirection]);

  const ListRender = () => (
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

  const rendersList = () => {
    if (Array.isArray(repositories) && repositories.length > 1) {
      return <ListRender />;
    } else if (listIsLoading === false) {
      return (
        <div>
          We were unable to find an{" "}
          {searchType === "SearchingForUser" ? "user" : "organization"} named '
          {name}'.
        </div>
      );
    }
  };

  return (
    <>
      {listIsLoading && <LoadingWarning />}

      {rendersList()}

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
