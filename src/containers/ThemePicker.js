import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import themes from '../utils/themes'
import {selectTheme} from '../redux/actions'

const List = styled('ul')`
  position: absolute;
  bottom: 25px;
  right: 5px;
`

const Item = styled('li')`
  display: inline;
  margin: 0 .5rem 0 .5rem;
  cursor: pointer;
  font-size: 1rem;
  border: 2px solid;
  border-radius:5px;
  padding: .5rem;
  transition: 0.1s ease-in all;

  &:hover {
    background:#666666;
  }
`

class ThemePicker extends Component {
  handleSelectTheme = theme => e => {
    this.props.selectTheme(theme)
  }

  render() {
    return (
      <List>
        {Object.keys(themes).map(theme => (
          <Item key={theme} onClick={this.handleSelectTheme(theme)}>
            {theme}
          </Item>
        ))}
      </List>
    )
  }
}

ThemePicker.propTypes = {
  selectTheme: PropTypes.func
}

const mapDispatchToProps = {
  selectTheme
}

export default connect(null, mapDispatchToProps)(ThemePicker)
