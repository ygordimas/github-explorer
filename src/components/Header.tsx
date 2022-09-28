import React from "react";
import { SearchUser } from "./SearchUser";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  padding: 2rem 1rem 1rem;
  background-color: lavender;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 0 0 0.5rem 0.5rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  display: block;
`;

const HeaderSection = styled.div`
  width: 100%;
`;

const HeaderRadioInput = styled.input`
  margin-top: 1rem;
  padding: 1rem;

  & + button {
    margin-left: 0.5rem;
  }
`;

const HeaderRadioLabel = styled.label`
  margin-left: 0.5rem;
`;

interface HeaderProps {
  username: string;
  setUsername: (value: string) => void;
  selectedRadioInput: string;
  setSelectedRadioInput: (value: string) => void;
}

export default function Header({
  username,
  setUsername,
  selectedRadioInput,
  setSelectedRadioInput,
}: HeaderProps) {
  const isRadioSelected = (value: string): boolean =>
    selectedRadioInput === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioInput(e.currentTarget.value);

  return (
    <StyledHeader>
      <HeaderTitle>Github Explorer</HeaderTitle>
      <HeaderSection>
        <div>
          <HeaderRadioInput
            type="radio"
            name="header-radio-button"
            id="header-radio-button-user"
            value="SearchingForUser"
            checked={isRadioSelected("SearchingForUser")}
            onChange={handleRadioClick}
          />
          <HeaderRadioLabel htmlFor="header-radio-button-user">
            Exploring an User's Repositories
          </HeaderRadioLabel>
        </div>

        <div>
          <HeaderRadioInput
            type="radio"
            name="header-radio-button"
            id="header-radio-button-org"
            value="SearchingForOrg"
            checked={isRadioSelected("SearchingForOrg")}
            onChange={handleRadioClick}
          />
          <HeaderRadioLabel htmlFor="header-radio-button-org">
            Exploring an Organization's Repositories
          </HeaderRadioLabel>
        </div>
      </HeaderSection>
      <SearchUser
        username={username}
        setUsername={setUsername}
        searchType={selectedRadioInput}
      />
    </StyledHeader>
  );
}

// export default function Header({ children }: { children: React.ReactNode }) {
//   return <StyledHeader>{children}</StyledHeader>;
// }
