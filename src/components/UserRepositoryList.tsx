import RepositoryItem from "./RepositoryItem";
import "../styles/repositories.scss";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
  background-color: antiquewhite;
  padding: 1rem;
  border-radius: 1rem;
  margin: 0.5rem 0;
`;

const ListHeader = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
`;

interface Repository {
  name: string;
  description: string;
  url: string;
}

interface UserRepositoryListProps {
  username: string;
}

export default function UserRepositoryList({
  username,
}: UserRepositoryListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repoDirection, setRepoDirection] = useState("asc");

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?direction=${repoDirection}`
    )
      .then((response) => response.json())
      //   .then((data) => console.log(data));
      .then((data) => setRepositories(data));
  }, [repoDirection, username]);

  return (
    <ListContainer>
      <ListHeader>
        <h1>Repositories List</h1>
        <ListButtonsContainer>
          <ListButton onClick={() => setRepoDirection("asc")}>A</ListButton>
          <ListButton onClick={() => setRepoDirection("desc")}>Z</ListButton>
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
}
