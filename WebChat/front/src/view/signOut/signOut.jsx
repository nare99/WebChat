import React from 'react';
import { onLogOut } from '../../services/logIn(Out)';
import './style.css';
import history from '../../history';


class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        event.preventDefault();
        onLogOut();
        this.props.action(0);
        this.props.client.close(1000);

        history.push("/");
    }

    render() {
        console.log("props.user:", this.props)
        return(
            <div>
                <span className="userInfo">{this.props.user.name} {this.props.user.surname}</span>
                <button id = "signOut" onClick={this.handleClick}>Sign Out</button>
            </div>
        )
    }
};

export default SignOut