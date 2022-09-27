import { useEffect, useState } from "react";
import Header from "./components/Header";
import OrgRepositoryList from "./components/OrgRepositoryList";
import { SearchUser } from "./components/SearchUser";

import UserRepositoryList from "./components/UserRepositoryList";

import styled from "styled-components";

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  display: block;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <Header>
        <HeaderTitle>Github Explorer</HeaderTitle>
        <SearchUser username={username} setUsername={setUsername} />
      </Header>
      <Content>
        {username ? (
          <UserRepositoryList username={username} />
        ) : (
          <div>Nothing</div>
        )}
      </Content>
    </>
  );
}

export default App;
