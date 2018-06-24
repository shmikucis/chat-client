import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import LandingPage from './components/LandingPage'
import Chat from './components/Chat'


class App extends Component {
  constructor() {
    super()

    this.state = {
      isRegistered: false, // if this is true then show chat
      error: null, // encountered some kind of error, show it to user
    }
  }

  connectToServer = (userName) => {
    // if disconnected from server or connection lost then connect again and set up listeners
    if(!this.socket){
      this.socket = socketIOClient("http://localhost:4001")

      this.socket.on('disconnect', () => {
        this.setState({ isRegistered: false })
        this.socket = null
      })

      this.socket.on('inactiveDisconnectMe', () => {
        this.setState({ isRegistered: false, error: 'Disconnected by the server due to inactivity.' })
        this.socket = null
      })

      this.socket.on('connect_error', (err) => {
        this.setState({ error: 'Server unavailable.' })
      })

      this.socket.on('registerUser', data => {
        if(data.error) this.setState({ error: data.error })
        else this.setState({ isRegistered: true })
      })
    }

    this.socket.emit('registerUser', userName)
  }

  render() {
    if(this.state.isRegistered) return <Chat socket={this.socket} />
    else return (
      <LandingPage 
        connectToServer={this.connectToServer} 
        error={this.state.error}
      />
    )
  }
}

export default App
