import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {transparentize} from 'polished'
import _ from 'lodash'
import ReactGridLayout, {WidthProvider} from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import MainBarChart from '../containers/MainBarChart'
import MainPieChart from '../containers/MainPieChart'
import MainScatterPlot from '../containers/MainScatterPlot'
import MainChat from '../containers/MainChat'
import withMeasure from '../hocs/withMeasure'

const {string, object, func, arrayOf} = PropTypes
const GridLayout = WidthProvider(ReactGridLayout)
const dimensions = ['width', 'height']
const MeasuredMainBarChart = withMeasure(dimensions)(MainBarChart)
const MeasuredMainScatterPlot = withMeasure(dimensions)(MainScatterPlot)
const MeasuredMainPieChart = withMeasure(dimensions)(MainPieChart)
const MeasuredMainChat = withMeasure(dimensions)(MainChat)

const generateDataGroupCSS = colors => {
  return _.reduce(colors, (result, color, user) => {
      result += `.data-group-${user} { fill: ${color}; }`
      return result
    },
    ''
  )
}

const generateHoverCss = letter =>
  `
  .data-${letter} {
    opacity: 1;
    -webkit-transition: opacity .2s ease-in;
  }
`

const Grid = styled(GridLayout)`
  .axis text {
    fill: ${({theme}) => theme.color};
  }
  .axis path,
  .axis line {
    fill: none;
    stroke: ${({theme}) => theme.color};
    shape-rendering: crispEdges;
  }
  .stroked {
    stroke: ${({theme}) => theme.color};
  }
  .stroked-negative {
    stroke: ${({theme}) => theme.background};
  }
  ${({colors}) => generateDataGroupCSS(colors)}
  .data {
    opacity: ${({hover}) => (hover ? 0.25 : 1)};
    -webkit-transition: opacity .2s ease-in;
  }
  ${({hover}) => hover && hover.map(letter => generateHoverCss(letter))}
  .tooltip {
    position: absolute;
    z-index: 10;
    display: inline-block;
    border: solid 1px ${({theme}) => theme.secondaryColor};
    border-radius: 2px;
    padding: 5px;
    background-color: ${({theme}) => transparentize(0.2, theme.secondaryBackground)};
    text-align: center;
    color: ${({theme}) => theme.secondaryColor};
  }
`

class Dashboard extends Component {
  static propTypes = {
    colors: object,
    hover: arrayOf(string),
    incrementRenderCount: func
  }

  componentDidMount() {
    this.props.incrementRenderCount('component')
    window.addEventListener('resize', this.onWindowResize)
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.incrementRenderCount('component')
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = e => {
    this.forceUpdate()
  }

  render() {
    const {hover, colors} = this.props
    const layout = [
      {i: 'TL', x: 0, y: 0, w: 6, h: 7},
      {i: 'TR', x: 6, y: 0, w: 6, h: 7},
      {i: 'BL', x: 0, y: 7, w: 4, h: 5},
      {i: 'BR', x: 4, y: 7, w: 8, h: 5}
    ]
    return (
      <Grid
        className="dashboard"
        hover={hover}
        colors={colors}
        layout={layout}
        cols={12}
        rowHeight={(window.innerHeight - 29) / 12}
        margin={[0, 0]}
      >
        <div key="TL">
          <MeasuredMainBarChart />
        </div>
        <div key="TR">
          <MeasuredMainScatterPlot />
        </div>
        <div key="BL">
          <MeasuredMainPieChart />
        </div>
        <div key="BR">
          <MeasuredMainChat />
        </div>
      </Grid>
    )
  }
}

export default Dashboard
