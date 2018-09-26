import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled, {ThemeProvider, injectGlobal} from 'styled-components'
import ThemePicker from './ThemePicker'
import {getTheme} from '../redux/selectors'

injectGlobal`
  body {
    margin: 0;
    overflow: hidden;
  }
`

const Root = styled.div`
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  font: 1rem sans-serif;
  padding: 8px;
`

const ThemedApp = ({theme, children}) => (
  <ThemeProvider theme={theme}>
    <Root>
      {children}
      <ThemePicker />
    </Root>
  </ThemeProvider>
)

ThemedApp.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.array
}

const mapStateToProps = (state, ownProps) => ({
  theme: getTheme(state)
})

export default connect(mapStateToProps)(ThemedApp)
