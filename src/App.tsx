import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Placeholder } from "./components/Placeholder";
import OrgRepositoryList from "./components/OrgRepositoryList";
import UserRepositoryList from "./components/UserRepositoryList";

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
`;

function App() {
  const [username, setUsername] = useState("");
  const [selectedRadioInput, setSelectedRadioInput] =
    useState("SearchingForUser");
  const [listIsLoading, setListIsLoading] = useState(true);

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
