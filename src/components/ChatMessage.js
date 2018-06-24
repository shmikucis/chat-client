import React from 'react'
import { List } from 'semantic-ui-react'

export default class ChatMessage extends React.Component {
  render() {
    const message = this.props.message
    const datetime = new Date(message.timestamp).toUTCString()
    const isBot = message.userId == 'server'
    const grayStyle = isBot ? { color: 'gray'} : {}
    const icon = isBot ? 'terminal' : 'chat'
    return (
      <List.Item disabled={isBot}>
        <List.Icon name={icon} verticalAlign='middle' /> 
        <List.Content>
        <List.Header style={grayStyle}>{message.userId}</List.Header>
        <List.Description style={grayStyle}>{message.text}</List.Description> 
        </List.Content>
        <List.Content floated='right'>{datetime}</List.Content>
      </List.Item>
    )
  }
}