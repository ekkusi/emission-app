import React from 'react'
import styled from 'styled-components'

import SearchBar from './SearchBar'

const Form = ({ areas, onSubmit }) => (
  <StyledForm onSubmit={onSubmit} autoComplete="off">
    <Label>Country or area (required)</Label>
    <SearchBar areas={areas} name="firstArea"/>
    <Label>Compare to (other area)</Label>
    <SearchBar areas={areas} name="secondArea"/>
    <Label>Years to search</Label>
    <YearInput>
      <Input type="number" name="startYear" placeholder="From"/>
        -
      <Input type="number" name="endYear" placeholder="To"/>
    </YearInput>
    <Checkbox>
      <label><input type="checkbox" name="perpopulation" value="isOn"/>By population</label>
    </Checkbox>
    <SubmitButton type="submit" value="Check emissions"/>
  </StyledForm>
)

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.5rem;

  width: 100%;

  > * {
    margin-bottom: 0.5rem;
  }

  @media (min-width: 600px) {
    align-items: flex-start;
  }
`

const Label = styled.label`
  font-weight: bold;
`

const YearInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const Input = styled.input`
  border: 1px solid #9b9b9b;

  padding: 0.3rem;

  width: 100%;

  @media (min-width: 600px) {
    width: auto;
  }
`

const Checkbox = styled.div`
  label {
    font-size: 0.9rem;
  }
`

const SubmitButton = styled.input`
  align-self: center;

  background-color: white;
  border: 1px solid #459be2;
  border-radius: 2px;
  color: #459be2;

  cursor: pointer;

  padding: 0.3rem 0.5rem;

  font-size: 0.8rem;
  text-transform: uppercase;

  transition: all 0.3s;

  :hover {
    background-color: #459be2;
    color: white;
  }
`

export default Form