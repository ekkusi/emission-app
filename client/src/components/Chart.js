import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const Chart = ({data, isByPopulation}) => (
  <VictoryChart>
    <VictoryAxis
      tickFormat={(x) => `${x}`}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(y) => `${y}`}
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
        // Map areas records to make line points
        data={area.records.map((record) => {
          return {
            x: record.year,
            y: isByPopulation ? record.emission * 1000 / record.population : record.emission / 1000
          }
      })}/>
    ))}
    {/* Map data to make labels for each given area */}
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
)

export default Chart