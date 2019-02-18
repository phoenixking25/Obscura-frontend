import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import 'simplemde/dist/simplemde.min.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', allMessages: [] };
  }

  componentWillMount() {
    const { user } = this.props;

    this.socket = socketIOClient(config.api.url);
    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', user);
      this.socket.on('roomJoin', (msg) => {
        if (msg.success) {
          this.setState({ allMessages: msg.messages });
        } else {
          console.log('can\'t fetch messages');
        }
      });
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }

  letsTalk = () => {
    const { user } = this.props;
    const { message, allMessages } = this.state;

    this.socket.emit('sendMessage', {
      message,
      team_id: user.user.team_id,
      sender: user.user.username,
    });

    this.socket.on('messageRecieved', (msg) => {
      console.log(msg);
      let isBreak = 0;
      let allMsg = allMessages;
      allMsg.reverse();
      if (allMsg.length > 50) {
        allMsg = allMsg.slice(0, 50);
      }
      console.log(allMsg);

      for (let i = 0; i < allMsg.length; i += 1) {
        const mssg = allMsg[i];
        console.log(i);
        if (mssg.message === msg.message && mssg.sender === msg.sender) {
          console.log('wow');
          isBreak = 1;
          break;
        }
      }

      if (!isBreak) {
        const arr = this.state.allMessages;
        console.log(arr.length, ' +++++++++++++++++++++++++');
        console.log(allMessages, '||||||||||||||||||||||||||||||||');
        arr.push(msg);

        this.setState({ allMessages: arr });
      }

      // this.setState({ allMessages });
      console.log(this.state.allMessages);
    });
  }

  changeMessage = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <div>
        <div id="slide-out2" className="sidenav">
          <h4 className="center-align">
ChatRoom
          </h4>
          <p className="center-align">
Place Where You can chat with your team
          </p>
          <div style={{ width: '100%', height: '65%', backgroundColor: 'red' }}>
            <ul>
              <li>
                wow
              </li>
            </ul>
          </div>

          <input type="text" onChange={e => this.changeMessage(e)} />

          <button type="button" onClick={() => { this.letsTalk(); }}>
Send
          </button>

        </div>
        <div className="fixed-action-btn">
          <a href="#!" data-target="slide-out2" className="btn-floating btn-large green sidenav-trigger">
            <i className="large material-icons">
              contacts
            </i>
          </a>
        </div>
      </div>
    );
  }
}

export default Chat;
