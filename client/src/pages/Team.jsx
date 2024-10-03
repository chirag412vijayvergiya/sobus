import { useState } from 'react';
import styled from 'styled-components';
import Team23 from '../components/Team/Team23';

function Team() {
  const [state, setState] = useState(2024);
  const year_3 = 2024;
  const year_2 = 2022;
  const year_1 = 2021;

  return (
    <Box>
      <TwoTabs>
        <Tab onClick={() => setState(year_3)} state={state} year={year_3}>
          {year_3}
        </Tab>
        {/* <Tab onClick={() => setState(year_2)} state={state} year={year_2}>
          {year_2}
        </Tab>
        <Tab onClick={() => setState(year_1)} state={state} year={year_1}>
          {year_1}
        </Tab> */}
      </TwoTabs>

      {/* Contents for each year */}
      <div className="contents">
        {state === year_3 && <Team23 />}
        {state === year_2 && <div>Content for {year_2}</div>}
        {state === year_1 && <div>Content for {year_1}</div>}
      </div>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 50px;
  background-color: var(--bg);
`;

const TwoTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg);
`;

const Tab = styled.div`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  width: 14%;
  font-size: 23px;
  margin-bottom: 20px;
  border-bottom: ${(props) =>
    props.state === props.year ? `2px solid #4285F4` : `none`};
  color: var(--about-para);
  background-color: var(--bg);

  @media (max-width: 500px) {
    font-size: 20px;
    padding-left: 7px;
    padding-right: 7px;
    text-align: center;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #eaecee;
    color: var(--tab-hover);
  }
`;

export default Team;
