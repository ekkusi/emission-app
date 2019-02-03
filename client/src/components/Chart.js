import React from 'react';
import styled from 'styled-components'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const Chart = ({ data, error, isByPopulation }) => {
  return  (
    <Container>
      {error.length > 0 ? (
        <Error>{error}</Error>
      ) : (
        // Render chart if first area has more than 1 record (second area doesn't affect rendering)
        data[0].records.length > 1 ? (
          <VictoryChart>
            <VictoryAxis
              tickFormat={(x) => `${x}`}
            />
            <VictoryAxis
              dependentAxis
            />
            {/* Map data to make lines for each given area */}
            {data.map((area, index) => (
              <VictoryLine
                key={area.name}
                style={{
                  data: {
                    stroke: index % 2 ? '#459be2' : 'black'
                  }
                }}
                data={area.records.map((record) => {
                  return {
                    x: record.year,
                    y: isByPopulation ? record.emission * 1000 / record.population : record.emission / 1000
                  }
              })}/>
            ))}
            {data.map((area, index) => (
              <VictoryLabel
                key={area.name} 
                style={{
                  stroke: index % 2 ? '#459be2' : 'black',
                  strokeWidth: 0.5,
                  fontSize: '15px',
                }}
                textAnchor="middle"
                text={area.name}
                x={215}
                y={index % 2 ? 40 : 20}
              />
            ))}
            <VictoryLabel
              text="year"
              x={210}
              y={238}
            />
            <VictoryLabel 
              text={ isByPopulation ? "Ton CO2/person" : "Metric ton CO2" }
              x={60}
              y={180}
              angle={270}
            />
          </VictoryChart>
        ) : (
          // If there's only one record, render text output instead of chart
          data[0].records.length > 0 &&
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
          )
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 150px;
  
  position: relative;

  @media (min-width: 600px) {
    min-height: 200px;
  }
`

const Error = styled.p`
  margin: 0;

  font-weight: 700;
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export default Chart