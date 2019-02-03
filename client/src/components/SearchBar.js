import React from 'react'
import styled from 'styled-components'

import Suggestions from './Suggestions'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      isFocused: false,
      areas: []
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleEnter = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  }

  handleInputFocusOut = (event) => {
    this.focusOutTimeout = setTimeout(() => {
      this.setState({areas: []})
    }, 200)
  }

  handleFocusIn = (event) => {
    this.setAreas(event.target.value);
  }

  handleInputChange = (event) => {
    this.setAreas(event.target.value);
  }

  handleClick = (event) => {
    // Clears focusout timeout, when one of the suggestions is clicked
    if (this.contRef.contains(event.target)) {
      clearTimeout(this.focusOutTimeout);
    }
  }

  handleSuggestionClick = (event) => {
    this.inputRef.current.value = event.target.innerHTML;
    this.setState({areas: []})
  }

  setAreas = (inputText) => {
    const areas = this.props.areas;
    if (inputText.trim().length === 0) return this.setState({areas: []});
    this.setState({
      areas: areas.filter((area) => area.substr(0, inputText.trim().length).toUpperCase() === inputText.trim().toUpperCase())
    })
  }

  setContRef = (node) => {
    this.contRef = node
  }

  render() {
    return (
      <Container ref={this.setContRef}>
        <Input 
          ref={this.inputRef} 
          type="text" 
          name={this.props.name} 
          placeholder="Country or area"
          onKeyPress={this.handleEnter}
          onFocus={this.handleFocusIn}
          onBlur={this.handleInputFocusOut}
          onChange={this.handleInputChange}
        />
        <Suggestions areas={this.state.areas} onClick={this.handleSuggestionClick}/>
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  border: 1px solid #9b9b9b;

  width: 100%;
  padding: 0.3rem;
`

export default SearchBar