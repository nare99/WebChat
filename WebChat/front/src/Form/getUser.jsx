import React from 'react';
import axios from '../interceptors';

class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();
            axios.get('/users/', {

            })
            .then(function (response) {
              console.log(response);
            })
            .catch(e => {
                console.log('Err ', e)
            })
    }
    render() {
        return(
            <button onClick={this.handleSubmit}>Get Users</button>
        )
    }
};

export default GetUser