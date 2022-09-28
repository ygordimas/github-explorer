import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Placeholder } from "./components/Placeholder";
import OrgRepositoryList from "./components/OrgRepositoryList";
import UserRepositoryList from "./components/UserRepositoryList";

import styled from "styled-components";
import { RepositoryList } from "./components/RepositoryList";

const Content = styled.div`
  width: 100%;
  max-width: 800px;

  background-color: antiquewhite;
  padding: 1rem;
  border-radius: 1rem;
  margin: 0.5rem auto;
`;

function App() {
  const [username, setUsername] = useState("");
  const [selectedRadioInput, setSelectedRadioInput] =
    useState("SearchingForUser");

  return (
    <>
      <Header
        username={username}
        setUsername={setUsername}
        selectedRadioInput={selectedRadioInput}
        setSelectedRadioInput={setSelectedRadioInput}
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
          <RepositoryList name={username} searchType={selectedRadioInput} />
        ) : (
          <div>Insert valid information</div>
        )}
      </Content>
    </>
  );
}

export default App;
