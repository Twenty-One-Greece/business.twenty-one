import React from 'react';
import axios from 'axios'
import { URL_FOR_HOME } from '../config.js'
import { Link } from 'react-router';

export default class Home extends React.Component {

    constructor (props) {
        super(props)
        this.state = {}
        
        this.userID = localStorage.getItem('_id')
    }
    

    render(){
        return (
        <div className="row">
            <h5>Home Page</h5>

        </div>
        );
    }
}
