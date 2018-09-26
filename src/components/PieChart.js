import React from 'react'
import PropTypes from 'prop-types'
import Pie from './charts/Pie'

const PieChart = props => {
  const {hover, ...otherProps} = props
  return (
    <div style={{width: '100%', height: '100%', display: 'inline-block'}}>
      <Pie
        thickness={30}
        title={`Data volume`}
        {...otherProps}
      />
    </div>
  )
}

PieChart.propTypes = {
  hover: PropTypes.arrayOf(PropTypes.string)
}

export default PieChart
