import RepositoryItem from "./RepositoryItem";
import "../styles/repositories.scss";
import { useState, useEffect } from "react";

interface Repository {
  name: string;
  description: string;
  url: string;
}

export default function UserRepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repoDirection, setRepoDirection] = useState("asc");

  useEffect(() => {
    fetch(
      `https://api.github.com/users/ygordimas/repos?direction=${repoDirection}`
    )
      .then((response) => response.json())
      //   .then((data) => console.log(data));
      .then((data) => setRepositories(data));
  }, [repoDirection]);

  return (
    <section className="repository-list">
      <h1>Repositories List</h1>
      <button onClick={() => setRepoDirection("asc")}>Sobe</button>
      <button onClick={() => setRepoDirection("desc")}>Desce</button>
      <ul>
        {repositories.map((repo) => (
          <RepositoryItem key={repo.name} repository={repo} />
        ))}
      </ul>
    </section>
  );
}
