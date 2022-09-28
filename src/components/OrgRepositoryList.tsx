import RepositoryItem from "./RepositoryItem";
import "../styles/repositories.scss";
import { useState, useEffect } from "react";

// https://api.github.com/orgs/rocketseat/repos

interface Repository {
  name: string;
  description: string;
  url: string;
}

interface RepositoryListProps {
  name: string;
}

function RepositoryList({ name }: RepositoryListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/orgs/${name}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      {Array.isArray(repositories) === false ? (
        <div>Organization not found.</div>
      ) : (
        <>
          <h1>Repositories List</h1>
          <ul>
            {repositories.map((repo) => (
              <RepositoryItem key={repo.name} repository={repo} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default RepositoryList;
