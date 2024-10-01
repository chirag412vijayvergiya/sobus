import React from 'react';
import styled from 'styled-components';

function TeamTitle({ TeamName, color }) {
  return (
    <Container>
      <Title color={color}>
        <h1>
          <span>{TeamName}</span>
        </h1>
      </Title>
    </Container>
  );
}

export default TeamTitle;

const Container = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  padding-top: 20px;
  background-color: var(--bg);

  h1 {
    display: flex;
    align-items: center;
    text-align: center;
    width: 70%; /* Adjust based on your preference */
    margin: 10px 0 20px;
    font-size: 24px; /* You can adjust the font size as needed */
    position: relative;
    color: ${(props) => props.color || 'blue'};

    /* The lines on either side */
    &::before,
    &::after {
      content: '';
      flex: 1;
      border-bottom: 2px solid ${(props) => props.color || 'blue'};
      margin: 0 10px;
    }
  }

  h1 span {
    background-color: var(
      --bg
    ); /* Ensures background is not interrupted by the lines */
    font-weight: bolder;
    letter-spacing: 0.02em;
    padding: 0 10px;
  }

  @media (max-width: 756px) {
    h1 {
      width: 90%;
      font-size: 1.3em;
    }
  }
`;
