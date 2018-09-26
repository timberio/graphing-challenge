import React from 'react'
import Bar from './charts/Bar'

const BarChart = props => (
  <div style={{width: '100%', height: '100%'}}>
    <Bar xLabel='Characters' yLabel='Occurrences' {...props} />
  </div>
)

export default BarChart
