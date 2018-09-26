import * as d3Chroma from 'd3-scale-chromatic'
import _ from 'lodash'

const DEFAULT_SATURATION = 0.65

export const COLOR_PALLET = ['blue', 'grey', 'orange', 'purple', 'red']

export const getColorWithDefaultSaturation = colorName => {
  return d3Chroma[`interpolate${_.capitalize(colorName)}s`](DEFAULT_SATURATION)
}
