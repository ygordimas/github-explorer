import React from "react";

interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    url: string;
  };
}

function RepositoryItem(props: RepositoryItemProps) {
  return (
    <li>
      <strong>{props.repository.name ?? "Default"}</strong>
      <p>{props.repository.description}</p>
      <a href={props.repository.url}>Acessar repositório </a>
    </li>
  );
}

export default RepositoryItem;
