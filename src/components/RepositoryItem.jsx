import React from "react";

function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.name ?? "Default"}</strong>
      <p>{props.description}</p>
      <a href={props.url}>Acessar repositório </a>
    </li>
  );
}

export default RepositoryItem;
