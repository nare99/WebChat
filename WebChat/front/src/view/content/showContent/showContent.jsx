import React, { useEffect, useRef } from 'react';
import './style.css';

import { useParams } from "react-router-dom";

import LinearProgress from '@material-ui/core/LinearProgress';

const ShowContent = ({messages, newMessage, currMessage, loading, payload}) => {

    const { id } = useParams();

    useEffect(() => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ', id)
    }, [id]);

    useEffect(()=> {
        scrollToBottom();
    }, [currMessage, newMessage])


    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {
        scrollToBottom();
    },[messages])

    return(
        <div>
            {loading?<LinearProgress />:messages.map(message => {
                if(message.sender_id === payload) {
                    return <p ref={messagesEndRef} id="user1" key={message.id}>{message.message} </p>
                } else {
                    return <p ref={messagesEndRef} id="user2" key={message.id}>{message.message} </p> };
                }
            )}
            {/* <div ref={messagesEndRef}/> */}
        </div>
    )
}

export default ShowContent;