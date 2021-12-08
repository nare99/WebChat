import React from 'react';
import axios from '../../interceptors';
import './style.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import history from '../../history';

import { onLogIn } from '../../services/logIn(Out)'



import { w3cwebsocket as W3CWebSocket } from 'websocket';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            passError: false,
            notValidEmail: false,
            notValidPass: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setBorderFalse = this.setBorderFalse.bind(this);
    }

    setEmailBorderTrue() {
        this.setState({emailError: true});
    }

    setNotValidEmailTrue() {
        this.setState({notValidEmail: true});
    }

    setPassBorderTrue() {
        this.setState({passError: true});
    }

    setNotValidPassTrue() {
        this.setState({notValidPass: true});
    }

    setBorderFalse() {
        this.setState({emailError: false, passError: false, notValidEmail: false, notValidPass:false});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(event.target.email.value !== '' && event.target.pass.value !== '') {
            axios.post('/users/signin', {
                email: event.target.email.value,
                password: event.target.pass.value
            })
            .then((response) => {
                this.props.action(response.data.user);
                onLogIn(response.data.access_token);
                const client = new W3CWebSocket('ws://localhost:4000/messages/');
                this.props.tokenHandler(response.data.access_token);
                this.props.clientHandler(client);
                history.push(`/messages/${this.props.user2_id}`);
            })
            .catch(e => {
                if(e.response.status === 404) {
                    this.setNotValidEmailTrue()
                } else if(e.response.status === 401) {
                    this.setNotValidPassTrue()
                }
                console.log('Err ', e);
            })
        }
        else {
            if(event.target.email.value === '') this.setEmailBorderTrue('emailError');
            if(event.target.pass.value === '') this.setPassBorderTrue('passError');
        }
    }

    render() {
        const {emailError, notValidEmail, passError, notValidPass} = this.state;
        return(
            <div className="signIn">
                <p id="signInText">Sign In</p>
                <form onSubmit={this.handleSubmit}>
                    <TextField onClick={this.setBorderFalse} className = "input" error={emailError || notValidEmail} type="email" name='email' label="Email address*" defaultValue="" helperText={emailError ? "Email can't be empty" : notValidEmail? "Not Valid Email": ''} variant="outlined" /><br/>
                    <TextField onClick={this.setBorderFalse} className = "input" error={passError || notValidPass} type="password" name='pass' label="Password*" defaultValue="" helperText={passError ? "Password can't be empty" : notValidPass?"Incorrect Password, try again":''} variant="outlined" /><br/>
                    <Button className="btn" type='submit' variant="contained" color="primary">Sign In</Button>
                </form>
                <p id="signUp"><a href = "http://localhost:3000/signUp" id="signUpLink">Don't have an account? Sign Up</a></p>
            </div>
        )
    }
};

export default SignIn