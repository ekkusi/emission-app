import React from 'react';
import styled from 'styled-components'

import Chart from './Chart'

const Result = ({ data, isByPopulation }) => (
  <Container>
    {/* Render chart if first area has more than 1 record (second area doesn't affect rendering) */}
    {data[0].records.length > 1 ? (
      <Chart data={data} isByPopulation={isByPopulation} />
    ) : (
      // If there's only one record, render text output instead of chart
      <SubContainer>
        {data.map((area) => (
          area.records.length > 0 &&
            <SingleYear key={area.name}>
              <h2>{area.name}</h2>
              <p>Year: {area.records[0].year}</p>
              <p>Emission: {isByPopulation ? 
                `${area.records[0].emission * 1000 / area.records[0].population} Ton CO2/person` : 
                `${area.records[0].emission} Kilo ton CO2`}</p>
            </SingleYear>
          ))}
      </SubContainer>
    )}
  </Container>
);

const Container = styled.div`
  width: 100%;
  min-height: 150px;
  
  position: relative;

  @media (min-width: 600px) {
    min-height: 200px;
  }
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`

const SingleYear = styled.div`
  text-align: center;

  h2 {
    margin: 0.25rem;
  }

  p {
    margin: 0.25rem 0 0.5rem 0;
  }
` 

export default Result