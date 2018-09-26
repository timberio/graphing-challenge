import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import lorem from 'lorem-ipsum'
import Chat from '../components/Chat'
import {getColorWithDefaultSaturation, COLOR_PALLET} from '../utils/colors'
import {newText, setColor, incrementRenderCount} from '../redux/actions'
import {getUsers, getTexts, getSaturatedColorsArray} from '../redux/selectors'
import toJS from '../hocs/toJS'

const loremOption = {
  count: 2,
  units: 'sentences'
}

const getPallet = createSelector(
  () => COLOR_PALLET,
  pallet => {
    return pallet.map(color => {
      return {
        name: color,
        value: getColorWithDefaultSaturation(color)
      }
    })
  }
)

const mapStateToProps = (state, ownProps) => ({
  users: getUsers(state),
  texts: getTexts(state),
  colors: getSaturatedColorsArray(state),
  pallet: getPallet(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  generateText () {
    dispatch(
      newText({
        data1: lorem(loremOption),
        data2: lorem(loremOption)
      })
    )
  },
  updateText (text) {
    dispatch(newText(text))
  },
  setUserColor (user, color) {
    dispatch(setColor(user, color))
  },
  incrementRenderCount (mode) {
    dispatch(incrementRenderCount('chat', mode))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Chat))
