import {darken, lighten} from 'polished'

const themes = {
  light: {
    background: 'white',
    color: 'black',
    border: '#d3d3d3',
    get secondaryBackground () {
      return darken(0.03, this.background)
    },
    get secondaryColor () {
      return lighten(0.55, this.color)
    }
  },
  dark: {
    background: '#222',
    color: '#d3d3d3',
    border: '#666',
    get secondaryBackground () {
      return lighten(0.2, this.background)
    },
    get secondaryColor () {
      return darken(0.2, this.color)
    }
  }
}

export default themes
