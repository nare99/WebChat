import React from 'react';
import axios from '../../../interceptors';
import './style.css';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';

class Write extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newMessage: ''
        }
    }


    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
        //   e.preventDefault();
          this.myFormRef.click();
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if(event.target.message.value !== '') {
            // this.props.client.send(event.target.message.value);
            axios.post('/messages', {
                message: event.target.message.value,
                sender_id: this.props.user1_id,
                receiver_id: this.props.user2_id
            })
            .then((response) => {
                event.target.message.value = '';
                // console.log("response: ",response.data);
                this.props.mess(response.data);
                let rdt = {
                            response: response.data,
                            token: this.props.token,
                            user: this.props.user1_id,
                            user2: this.props.user2_id
                        };
                this.props.client.send(JSON.stringify(rdt));
                return console.log(response);
            })
            .catch(e => {
                console.log('Err ', e);
            })
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} >
                <div className="container">
                    <textarea id="message" type = "text" name='message' onKeyDown={this.onEnterPress}></textarea>
                    <button ref={el => this.myFormRef = el} id="send" type='submit'>Send</button>
                </div>
            </form>
        )
    }
};

export default Write