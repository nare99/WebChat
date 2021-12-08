import React, {useEffect, useState} from 'react';
import SideBar from '../sideBar/sideBar';
import Content from '../content/content';
import SignOut from '../signOut/signOut';
import './style.css';
import { useParams } from "react-router-dom";



function Chat (props) {
const { id } = useParams();
    const [ newMessageFrom_id, setGotMessage ] = useState(props.user1.id);
    const [ receiver_id, setReceiver ] = useState(id);
    function gotMessage(id) {
        setGotMessage(id)
    }
    function receiver(id) {
        setReceiver(id);
    }

    return(
        <div className="chat">
            <div className="signOut" ><SignOut client = {props.client} action = {props.action} user={props.user1}></SignOut></div>
            <SideBar signUp={props.signUp} receiver={receiver_id} user1_id={props.user1.id} newMessageFrom={newMessageFrom_id} setGotMessage={gotMessage} action = {props.action}></SideBar>
            <Content token={props.token} client = {props.client} user1 = {props.user1} user2_id = {props.user2_id} setReceiver={receiver} setGotMessage={gotMessage}></Content>
        </div>
    )
}

export default Chat;