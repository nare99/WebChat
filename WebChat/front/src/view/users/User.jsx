import React from 'react';
import './style.css';
import history from '../../history';


function User(user) {

    function onClick() {
        user.action(user.user2_id);
        user.setActive(user.user2_id);
        if(user.gotMessage===" gotMessage") {
            user.setGotMessage(0);
        }
        history.push(`/messages/${user.user2_id}`);
    }


    return (
        <div onClick={onClick} className={"user "+user.activeClass+user.gotMessage}>
            <span className="picture">{user.name.charAt(0)}{user.surname.charAt(0)}</span>
            <span className="name"> {user.name} </span>
            <span className="name"> {user.surname} </span>
        </div>
    )
}

export default User;