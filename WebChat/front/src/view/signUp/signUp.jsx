import React from 'react';
import axios from '../../interceptors';
import './style.css';
import history from '../../history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { onLogIn } from '../../services/logIn(Out)';


import { w3cwebsocket as W3CWebSocket } from 'websocket';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameError: false,
            surnameError: false,
            emailError: false,
            passError: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setBorderFalse = this.setBorderFalse.bind(this);
    }


    setBorderFalse() {
        this.setState({emailError: false, passError: false, nameError: false, surnameError: false});
    }

    setNameBorderTrue() {
        this.setState({nameError: true});
    }

    setSurnameBorderTrue() {
        this.setState({surnameError: true});
    }

    setEmailBorderTrue() {
        this.setState({emailError: true});
    }

    setPassBorderTrue() {
        this.setState({passError: true});
    }



    handleSubmit(event) {
        event.preventDefault();

        if(event.target.email.value !== '' && event.target.pass.value !== '' && event.target.firstName.value !== '' && event.target.lastName.value !== '') {
            axios.post('/users/signup', {
                name: event.target.firstName.value,
                surname: event.target.lastName.value,
                email: event.target.email.value,
                password: event.target.pass.value
            })
            .then((response) => {
            //   console.log('response-token: ',response.data.access_token);
              console.log('response: ',response.data);
              this.props.action(response.data.user);
              onLogIn(response.data.access_token);
              const client = new W3CWebSocket('ws://localhost:4000/messages/');
              this.props.tokenHandler(response.data.access_token);
              this.props.clientHandler(client);
              history.push(`/messages/${this.props.user2_id}`);

              // history.push(`/messages/`);
            // history.push(`/messages/${this.props.user1.id}`);
            })
            .catch(e => {
                console.log('Err ', e);
            })
        } else {
            if(event.target.firstName.value === '') this.setNameBorderTrue('nameError');
            if(event.target.lastName.value === '') this.setSurnameBorderTrue('surnameError');
            if(event.target.email.value === '') this.setEmailBorderTrue('emailError');
            if(event.target.pass.value === '') this.setPassBorderTrue('passError');
        }
    }

    render() {
        const {nameError, surnameError, emailError, passError} = this.state;

        return(
            <div className="signUp">
                <p id="signUpText">Sign Up</p>
                <form onSubmit={this.handleSubmit}>
                    <TextField onClick={this.setBorderFalse} className = "input" error={nameError} type="text" name='firstName' label="First Name*" defaultValue="" helperText={nameError ? "First Name can't be empty" : ''} variant="outlined" /><br/>
                    <TextField onClick={this.setBorderFalse} className = "input" error={surnameError} type="text" name='lastName' label="Last Name*" defaultValue="" helperText={surnameError ? "Last Name can't be empty" : ''} variant="outlined" /><br/>
                    <TextField onClick={this.setBorderFalse} className = "input" error={emailError} type="email" name='email' label="Email address*" defaultValue="" helperText={emailError ? "Email can't be empty" : ''} variant="outlined" /><br/>
                    <TextField onClick={this.setBorderFalse} className = "input" error={passError} type="password" name='pass' label="Password*" defaultValue="" helperText={passError ? "Password can't be empty" : ''} variant="outlined" /><br/>
                    <Button className="btn" type='submit' variant="contained" color="primary">Sign Up</Button>
                </form>
                <p id="signIn"><a href = "http://localhost:3000/" id="signInLink">Have an account? Sign In</a></p>
            </div>
        )
    }
};

export default SignUp