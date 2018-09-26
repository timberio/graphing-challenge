import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import PieChart from '../components/PieChart'
import {countLetters} from '../utils/stringStats'
import {incrementRenderCount} from '../redux/actions'
import toJS from '../hocs/toJS'
import {getText, getHover} from '../redux/selectors'

const getAutoHover = createSelector(
  [getHover],
  (hover) => {
    return hover
  }
)

const getData = createSelector([getText, getAutoHover], (text, hover) => {
  return text.reduce((result, userText, user) => {
    const nbOfLetters = countLetters(userText, hover ? hover.toJS() : null)
    result.push({
      name: user,
      value: nbOfLetters
    })
    return result
  }, [])
})

const mapStateToProps = (state, ownProps) => ({
  data: getData(state, ownProps),
  hover: getAutoHover(state, ownProps)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  incrementRenderCount(mode) {
    dispatch(incrementRenderCount('piechart', mode))
  }
})

const ConnectedPie = connect(mapStateToProps, mapDispatchToProps)(
  toJS(PieChart)
)

class AutoPie extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <ConnectedPie
        {...this.props}
      />
    )
  }
}

export default AutoPie
