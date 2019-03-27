import React, { Component } from 'react';
// import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../../../socketFiles/Events';




export default class Layout extends Component {

    constructor(props){
        super(props);

        this.state = {
            socket: null,
            user: null,
            name: ""
        };
    }

   
        render(){
            return(
                <div>
                    Layout.js
                </div>
            )
        }
        
    }
