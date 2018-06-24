import React from 'react'
import { Container, Form, List, Input, Icon } from 'semantic-ui-react'
import ChatMessage from './ChatMessage'

export default class Chat extends React.Component {
  constructor() {
    super()

    this.state = {
      messages: [], // contains all chat messages
      inputText: '', // user input field text
    }
  }

  componentDidMount = () => {
    this.inputRef.focus()

    // uncomment if user wants to see messages before his session
    // this.props.socket.emit('getAllMessages')

    this.props.socket.on('receiveChatMessage', (message) => {
      this.addMessage(message)
    })

    this.props.socket.on('getAllMessages', messages => {
      this.setState({ messages })
    })

    this.props.socket.on('inactiveDisconnect', (message) => {
      this.addMessage(message)
    })
  }

  // for autofocus
  handleInputRef = component => { this.inputRef = component }

  addMessage = (message) => {
    const messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.inputText === '') return false
    this.props.socket.emit('sendChatMessage', { text: this.state.inputText })
    this.setState({ inputText: '' })
    this.inputRef.focus()
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value })
  }

  handleDisconnect = () => {
    this.props.socket.disconnect()
  }

  render() {
    return (
      <Container>
        <List divided verticalAlign='middle'>
          {this.state.messages.map(message => 
            <ChatMessage key={message.timestamp+message.userId} message={message} />
          )}
        </List>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Field width={10}>
              <Input 
                autoComplete="off" 
                ref={this.handleInputRef}
                value={this.state.inputText} 
                onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Button fluid width={3} primary><Icon name='send' />Send</Form.Button>
            <Form.Button fluid width={3} secondary onClick={this.handleDisconnect}><Icon name='close' />Disconnect</Form.Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}