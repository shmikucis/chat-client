import React from 'react'
import { Grid, Header, Form, Input, Button, Message } from 'semantic-ui-react'

export default class LandingPage extends React.Component {
  constructor() {
    super()

    this.state = {
      inputText: '',
    }
  }

  componentDidMount () {
    this.inputRef.focus()
  }

  // for autofocus
  handleInputRef = component => { this.inputRef = component }

  handleSubmit = (e) => {
    e.preventDefault()
    this.inputRef.focus()
    if(this.state.inputText === '') return false
    this.props.connectToServer(this.state.inputText)
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value })
  }

  displayError = () => {
    if(this.props.error) {
      return (
        <Message negative>
          <p>{this.props.error}</p>
        </Message>
    )}
    else return null
  }

  render() {
    return (
      <Grid textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1'>Chat Landing Page</Header>
          {this.displayError()}
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
            <Input 
              ref={this.handleInputRef}
              placeholder="enter nickname"
              value={this.state.inputText} 
              onChange={this.handleInputChange} />
            </Form.Field>
            <Button primary>Connect</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}