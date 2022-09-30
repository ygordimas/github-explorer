import { useState } from "react";
import Header from "./components/Header";

import styled from "styled-components";
import { RepositoryList } from "./components/RepositoryList";

import GlobalStyles from "./styles/GlobalStyles";

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: var(--secondary);
  padding: 1rem;
  border-radius: 1rem;
  margin: 0.5rem auto;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

interface Repository {
  name: string;
  description: string;
  url: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [selectedRadioInput, setSelectedRadioInput] =
    useState("SearchingForUser");
  const [listIsLoading, setListIsLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  return (
    <>
      <GlobalStyles />
      <Header
        username={username}
        setUsername={setUsername}
        selectedRadioInput={selectedRadioInput}
        setSelectedRadioInput={setSelectedRadioInput}
        listIsLoading={listIsLoading}
        setListIsLoading={setListIsLoading}
        repositories={repositories}
        setRepositories={setRepositories}
      />
      <Content>
        {/* {username && selectedRadioInput === "SearchingForUser" ? (
          <UserRepositoryList username={username} />
        ) : username && selectedRadioInput === "SearchingForOrg" ? (
          <OrgRepositoryList name={username} />
        ) : (
          <Placeholder />
        )} */}
        {username ? (
          <RepositoryList
            name={username}
            searchType={selectedRadioInput}
            listIsLoading={listIsLoading}
            setListIsLoading={setListIsLoading}
            repositories={repositories}
            setRepositories={setRepositories}
          />
        ) : (
          <div>
            A list of the{" "}
            {selectedRadioInput === "SearchingForUser"
              ? "user"
              : "organization"}
            's repositories will appear here.
          </div>
        )}
      </Content>
    </>
  );
}

export default App;
