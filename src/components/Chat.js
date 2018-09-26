import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Pallet from './Pallet'

const InlineDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  textAlign: center;
`

const TextBoxes = styled.div`
  display: inline-block;

`

const Button = styled.div`
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
const ChatInput = styled.textarea`
  border: solid 1px ${({theme}) => theme.border};
  border-left: 5px solid ${({color}) => color};
  padding-left: 15px;
  margin: 10px;
  padding: 5px;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
`

class Chat extends Component {

  state = {
    autoRefresh: false,
    refreshPeriod: 2
  }

  componentDidMount() {
    this.props.incrementRenderCount('component')
    this.props.generateText()
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.incrementRenderCount('component')
  }

  handleChange = user => e => {
    this.props.updateText({[user]: e.target.value})
  }

  toggleAutoRefresh = () => {
    this.setState(state => {
      const autoRefresh = !state.autoRefresh
      if (autoRefresh) {
        this.autoRefreshInterval = setInterval(() => {
          this.props.generateText()
        }, state.refreshPeriod * 1000)
      } else {
        clearInterval(this.autoRefreshInterval)
      }
      return {autoRefresh}
    })
  }

  render() {
    const {
      users,
      texts,
      colors,
      width,
      height,
      pallet,
      setUserColor,
      generateText
    } = this.props

    return (
      <InlineDiv>
        <div>
          {users.map((user, index) => {
            return (
              <TextBoxes key={user}>
                <ChatInput
                  value={texts[index]}
                  color={colors[index]}
                  width={width / 2 - 40}
                  height={height - 120}
                  onChange={this.handleChange(user)}
                />
                <Pallet colors={pallet} scope={user} pickColor={setUserColor} />
              </TextBoxes>
            )
          })}
        </div>
        <Button onClick={generateText}>Generate new text</Button>
          <Button onClick={this.toggleAutoRefresh}>Enable Data Stream</Button>
      </InlineDiv>
    )
  }
}

Chat.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  texts: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  generateText: PropTypes.func,
  updateText: PropTypes.func,
  pallet: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ),
  setUserColor: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  incrementRenderCount: PropTypes.func
}
export default Chat
