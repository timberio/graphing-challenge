import {combineReducers} from 'redux-immutable'
import {fromJS} from 'immutable'
import text from './text'
import colors from './colors'
import hover from './hover'
import tick from './tick'
import theme from './theme'

export const initialState = fromJS({
  text: {},
  colors: {
    data1: 'blue',
    data2: 'purple'
  },
  hover: null,
  tick: 0,
  theme: 'dark'
})

const rootReducer = combineReducers(
  {text, colors, hover, tick, theme},
  initialState
)

export default rootReducer
