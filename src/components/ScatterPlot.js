import React from 'react'
import Scatter from './charts/Scatter'
import {ALPHABET} from '../utils/stringStats'

const ScatterPlot = props => (
  <div style={{width: '100%', height: '100%'}}>
    <Scatter
      xDomain={ALPHABET}
      yDomain={ALPHABET}
      title='Characters Side By Side'
      radiusFactor={4}
      {...props}
    />
  </div>
)

export default ScatterPlot
