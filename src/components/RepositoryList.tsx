import { useState, useEffect } from "react";
import styled from "styled-components";
import { LoadingWarning } from "./LoadingWarning";
import RepositoryItem from "./RepositoryItem";

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

    li {
      & + li {
        margin-top: 20px;
      }
    }

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

  & + button {
    margin-left: 0.5rem;
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
          <ListButton onClick={() => setRepoDirection("asc")}>
            A &#8212; Z
          </ListButton>
          <ListButton onClick={() => setRepoDirection("desc")}>
            Z &#8212; A
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
