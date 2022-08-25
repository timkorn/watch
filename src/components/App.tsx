import React from "react";
import Card from "./Card";
import CardContainer from "./CardContainer";
import SearchField from "./SearchField";
import Wrapper from "./Wrapper";
interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const handleSearchSubmit = (value: string) => {
    alert(value);
  };
  return (
    <Wrapper>
      <Wrapper.Header>
        <SearchField handleSubmit={handleSearchSubmit} />
        <img src="/AddWatchlist.svg" height="26px" />
      </Wrapper.Header>
      <Wrapper.Main>
        <CardContainer>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardContainer>
      </Wrapper.Main>
    </Wrapper>
  );
};
export default App;
