# Graphing Challenge

A dashboard that creates graphs based on numbers of letters in an auto-generated block of text. Charts are draggable and theme is changeable between Light and Dark. Uses D3, Emotion with ThemeProvider, Redux, React Grid Layout. Click "Generate new text" to change the data once. Click "Enable Data Stream" to auto-generate new data every two seconds.

## Theme Changing

First, you can change the theme in the broweser by clicking between the 'light' and 'dark' buttons in the lower right hand corner of the screen.

### Changing the Theme Colors

In utils/themes you can change the colors that the theme changes to when you click the light/dark buttons.

```javascript
const themes = {
  light: {
    background: 'white',
    color: 'black',
    border: '#d3d3d3',

...

  dark: {
    background: '#222',
    color: '#d3d3d3',
    border: '#666',
 ```

### Changing the Default Chart Colors

In redux/reducers/index you can change the default chart colors by changing:

```javascript
  colors: {
    data1: 'blue',
    data2: 'purple'
  },
```

### Changing the Chart Colors Pickers

In utils/colors you can change the colors of the chart color changing boxes below the text boxes by changing:

```javascript
const DEFAULT_SATURATION = 0.65

export const COLOR_PALLET = ['blue', 'grey', 'orange', 'purple', 'red']
```

## Usage

```
npm i
npm start
```

## Emotion

Emotion was used for part of this project, with styled components for other parts. Yes, using two nearly identical libraries in the same project is silly, but the fact is they do have some important differences. How you pass props in styled elements differs a lot. The official emotion docs on how to do this are unfortunately slightly limited and I could not achieve what I had hoped in time. I tried to follow the docs as much as I could, but what I wanted to do with the props wasn't even in the docs. So instead, for those few elements that I needed to pass props, I used styled-components just to get it done.

## D3

One of the reasons why there isn't a whole lot of information about D3 and react probably has something to do with how they interact with one another. 

### DOM
When you render a D3 element on the page, D3 modifies the DOM in the browser, while React uses a virtual DOM. React first modifies the virtual DOM when a component gets updated, and it only re-renders the modified nodes on the real DOM. This leads to bugs if D3 is modifying elements because they won't be reflected in the virtual DOM. When React re-renders the real DOM, the elements have already been changed by D3. The isn't always the case because not every D3 API mutates or accesses the DOM. Regardless, this has led to the common use of "react-faux-dom" to get around this issue.

### Libraries
D3 also has a ton of libraries. 30 to be exact. So it can get kind of unwieldy to try to make a single chart and need to import 15 different libraries.

### Wrappers
Because of these reasons, D3 wrappers have become very popular. Libraries such as Recharts, Victory, VX, C3, etc. all allow you to use D3 charts, but in much easier to manage components. 

## Lodash

Lodash was used in a few instances. While it's true that nobody really needs lodash anymore since native ES6 functions can be used, D3.js has minimal documentation for react, and much of what I found was 2, 3, 4 years old. Never having used D3 without a wrapper before, I decided to just go along with things I read online, Lodash included.

