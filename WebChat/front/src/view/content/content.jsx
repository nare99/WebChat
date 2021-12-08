import React, {useState, useEffect} from 'react';
import axios from '../../interceptors';
import './style.css';
import ShowContent from './showContent/showContent';
import Write from './write/write';

import { useParams } from "react-router-dom";


function Content (props) {


    const [ messages, setUsers ] = useState([]);
    const [ currMessage, setCurrMessage ] = useState([]);
    const [ newMessage, setNewMessage ] = useState('');
    const [loader, setLoad ] = useState(true);

    function handleChange(message){
        let allMess = messages;
        allMess.push(message);
        setUsers(allMess);
        setCurrMessage(message)
    }


    const { id } = useParams();

    useEffect(() => {
        console.log('content: ', id)
    }, [id]);



    useEffect(() => {
        function showMessages() {
            axios.get(`/messages/${props.user1.id}/${props.user2_id}`)
            .then((response) => {
                setLoad(false);
                setUsers(response.data)
                if(props.client !== '') {
                    props.client.onopen = () => {
                        console.log('WebSocket Client Connected');
                        // props.client.send("event.target.message.value");
                      };
                      props.client.onmessage = (message) => {
                        let md = JSON.parse(message.data);
                        console.log("id: ", id, "  md.user: " , md.user)
                        if(id == md.user) {
                            let allMess = response.data;
                            allMess.push(md.response);
                            setUsers(allMess);
                        } else {
                            props.setReceiver(md.user2)
                            props.setGotMessage(md.user);

                        }
                        setNewMessage(message.data);
                      };
                }
                return response.data;
            })
            .catch(e => console.log('Err ', e))
            setLoad(true);
    }
    showMessages()
    // if(props.client !== '') {
    //     props.client.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //         // props.client.send("event.target.message.value");
    //       };
    //       props.client.onmessage = (message) => {
    //         let md = JSON.parse(message.data);
    //         showMessages();
    //         let allMess = messages;
    //         // allMess.push(JSON.parse(message.data));
    //         // setUsers(allMess);
    //         setNewMessage(message.data);
    //       };
    // }
    }, [props.user2_id, props.user1.id, props.client]);

    return(
        <div>
        {props.user2_id !== 0 ?
        <div id="content" >
            <ShowContent loading = {loader} newMessage={newMessage} currMessage={currMessage} messages = {messages} payload={props.user1.id}/>
            
            <div className = "fixed" >
                <Write token={props.token} client={props.client} mess={handleChange} user1_id = {props.user1.id} user2_id = {props.user2_id}/>
            </div> 
        </div>:<div className="start"><ShowContent loading = {loader} newMessage={newMessage} currMessage={currMessage} messages = {messages} payload={props.user1.id}/></div>
    }</div>
    )
}

export default Content;