import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css'

import Form from './components/Form'
import Chart from './components/Chart'

class App extends Component {
  state = {
    areas: [],
    records: [{
      name: 'World',
      records: []
    }],
    isByPopulation: false,
    error: ''
  }

  componentDidMount() {
    // Fetch areas
    fetch('/api/area').then((res) => {
      res.json().then((data) => {
        const areas = data.areas;
        this.setState({
          areas: areas.map((area) => area.name)
        })
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error)
    });

    this.getAndRenderRecords('World', undefined, undefined, undefined, false);
  }


  getAndRenderRecords = (firstArea, secondArea, startYear, endYear, isByPopulation) => {
    let firstAreaRecords;
    // Fetch records for given first area
    fetch(`/api/record/${firstArea}/${startYear}/${endYear}`).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          throw data.error;
        }
        firstAreaRecords = data.records;
      }).then((res) => {
        // Fetch records for second area
        fetch(`/api/record/${secondArea}/${startYear}/${endYear}`).then((res) => {
          res.json().then((data) => {
            // If query returns error, set only first area's records
            if (data.error) {
              return this.setState({
                records: [{
                  name: firstArea,
                  records: firstAreaRecords
                }],
                isByPopulation: isByPopulation,
                error: ''
              })
            }
            return this.setState({
              records: [{
                name: firstArea,
                records: firstAreaRecords
              }, {
                name: secondArea,
                records: data.records
              }],
              isByPopulation: isByPopulation,
              error: ''
            })
          })
        })
      }).catch((e) => {
        // If first query returns error, set the error and clear records
        return this.setState({
          records: [],
          error: e
        })
      })
    }).catch((e) => {
      console.log(e);
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const firstArea = event.target.firstArea.value ? event.target.firstArea.value : undefined;
    const secondArea = event.target.secondArea.value ? event.target.secondArea.value : undefined;
    const startYear = event.target.startYear.value ? event.target.startYear.value : undefined;
    const endYear = event.target.endYear.value ? event.target.endYear.value : undefined;
    const isByPopulation = event.target.perpopulation.checked;

    this.getAndRenderRecords(firstArea, secondArea, startYear, endYear, isByPopulation)
  }

  render() {
    const {areas, records, error, isByPopulation} = this.state;
    return (
      <Container>
        <Wrapper>
          <Form areas={areas} onSubmit={this.onFormSubmit}/>
          <Chart data={records} error={error} isByPopulation={isByPopulation}/>
        </Wrapper>
      </Container>
    );
  }
}

const Container = styled.div`
  background: url("images/cloud.jpeg");
  background-size: cover;
  background-positon: center center;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  
  min-width: 100vw;
  min-height: 100vh;

  overflow: hidden;
`

const Wrapper = styled.div`
  background-color: white;
  box-shadow: 2px 3px 15px -5px black;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem 1rem 0 1rem;
  width: 100%;

  @media (min-width: 600px) {
    width: 600px;
  }
`

export default App;
