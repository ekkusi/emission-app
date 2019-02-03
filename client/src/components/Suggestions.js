import React from 'react';
import styled from 'styled-components';
const Suggestions = ({ areas, onClick }) => (
  <List>
    {areas.map((area, index) => (
      <ListItem index={index} key={area} onClick={onClick}>{area}</ListItem>
    ))}
  </List>
)

export default Suggestions;

const List = styled.ul`
  position: absolute;
  z-index: 100;

  margin: 0;
  padding: 0;

  list-style: none;
  text-align: center;

  width: 100%;
`

const ListItem = styled.li`
  position: relative;

  background-color: white;
  border: 1px solid #9b9b9b;
  border-top: none;

  cursor: pointer;

  font-size: 0.8rem;

  padding: 0.3rem 0;

  transition: background-color 0.3s;

  :hover {
    background-color: #cecece;
  }
`