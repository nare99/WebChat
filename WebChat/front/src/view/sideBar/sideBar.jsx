import axios from '../../interceptors';
import React, {useState, useEffect} from 'react';
import User from '../users/User';

import './style.css';

function SideBar(props) {

    const [ users, setUsers ] = useState([]);
    const [ active_id, setActive ] = useState(props.receiver);

    function active(id) {
        setActive(id)
    }

    // useEffect(() => {
    //     console.log('new message- user1_id: ', props.user1_id, "receiver: ",props.receiver)
    // }, [props.signUp])

    useEffect(() => {

        // console.log('new message- user1_id: ', props.user1_id, "receiver: ",props.receiver)
    }, [props.newMessageFrom])

    useEffect(() => {
        function showUsers() {
            axios.get('/users')
                .then((response) => setUsers(response.data))
                .catch(e => console.log('Err ', e))
        }

        showUsers()
    }, []);

    useEffect(() => {
        function showUsers() {
            axios.get('/users')
                .then((response) => setUsers(response.data))
                .catch(e => console.log('Err ', e))
        }

        showUsers()
    }, [props.signUp]);

    return(
        <div id="sideBar" >
            {users.map(user => <User gotMessage={(props.newMessageFrom==user.id)&&(props.user1_id==props.receiver)?" gotMessage":''} setGotMessage={props.setGotMessage} activeClass={active_id==user.id?"active":""} setActive={active} key={user.id} user2_id={user.id} name={user.name} surname={user.surname} action = {props.action}/>)}
        </div>
    )
}

export default SideBar;