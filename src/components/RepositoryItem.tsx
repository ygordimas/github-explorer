import styled from "styled-components";
import { darken, lighten } from "polished";
import { rootColors } from "../styles/GlobalStyles";
import { Github } from "@styled-icons/entypo-social/Github";

const StyledListItem = styled.li`
  /* background-color: lightsalmon; */
  padding: 1rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0.5rem;
  border: 1px solid rgb(0, 0, 0, 0.25);
  box-sizing: border-box;

  transition: border 0.2s;

  div {
    display: flex;
    align-items: center;
  }

  strong {
    font-size: 1.25rem;
    margin-left: 0.5rem;
  }
  &:hover {
    background: ${darken(0.05, rootColors.secondary)};
    border: 1px solid transparent;
  }

  .repositoryLink {
    position: relative;
    z-index: 100;
  }

  .repositoryLink::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.25rem;
    background-color: lightblue;
    z-index: -1;
  }
`;

interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    url: string;
  };
}

function RepositoryItem(props: RepositoryItemProps) {
  return (
    <StyledListItem>
      <div>
        <Github size={"1.5rem"} />
        <strong>{props.repository.name ?? "Untitled"}</strong>
      </div>
      <p>{props.repository.description ?? "No description"}</p>
      <a className="repositoryLink" href={props.repository.url}>
        Access Repository
      </a>
    </StyledListItem>
  );
}

export default RepositoryItem;
