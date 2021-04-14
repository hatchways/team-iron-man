import React, { Component }  from 'react';
import '../styles/chat.css';

import MessageWindow from '../components/MessageWindow';
import TextBar from '../components/TextBar';
import { registerOnMessageCallback, send } from '../websocket';

export default class Chat extends Component {
  state = {
    messages: [],
    username: null
  }

  constructor (props) {
    super(props);
    registerOnMessageCallback(this.onMessageReceived.bind(this));
  }

  onMessageReceived (msg) {
    msg = JSON.parse(msg);
    this.setState({
      messages: this.state.messages.concat(msg)
    });
  }

  setUserName (name) {
    this.setState({
      username: name
    });
  }

  sendMessage (text) {
    const message = {
      username: this.state.username,
      text: text
    }
    send(JSON.stringify(message));
  }

  render () {
    const setUserName = this.setUserName.bind(this);
    const sendMessage = this.sendMessage.bind(this);

    if (this.state.username === null) {
      return (
        <div className='container'>
          <div className='container-title'>Please enter your name:</div>
          <TextBar onSend={setUserName} />
        </div>
      )
    }
    return (
      <div className='container'>
        <div className='container-title'>{this.state.username}</div>
        <MessageWindow messages={this.state.messages} username={this.state.username} />
        <TextBar onSend={sendMessage} />
      </div>
    )
  }
}