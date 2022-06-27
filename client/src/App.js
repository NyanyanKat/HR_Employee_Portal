import React,{ useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar";
import TopNavigation from "./components/TopNav/TopNavigation";
import styled from "styled-components";
import "./App.css";

const Main = styled.main`
  position: relative;
  transition: all 0.15s;
  margin-left: ${(props) => (props.expanded ? 240 : 64)}px;
`;

function App(props) {
  const [expanded, setExpanded] = useState(false)
  const handleExpaned = (expanded) => {
    setExpanded(expanded)
  }
  return (
    <div className="App">
      <Sidebar handleExpaned={handleExpaned} expanded={expanded} />
      <Main expanded={expanded}>
        <TopNavigation />
      </Main>
    </div>
  );
}

export default App;
