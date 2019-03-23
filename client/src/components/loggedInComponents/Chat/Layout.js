import React, { Component } from 'react';
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../../../socketFiles/Events';
import io from 'socket.io-client';


const socketUrl = io('http://localhost:5000');

export default class Layout extends Component {

    constructor(props){
        super(props);

        this.state = {
            socket: null,
            user: null,
            name: ""
        };
    }

    setUser = async ({user}) => {
        console.log("user: " + user )
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        console.log("Inside setUser")
        await this.setState({user});

    }

    initSocket = async () => {
        const socket = io(socketUrl);

        socket.on('connect', () => {
            console.log("Connected");
        });
        console.log(socket)
        await this.setState({socket});
        console.log(this.state.socket);
    }

    async componentWillMount(){
        await this.initSocket();
        const { socket } = this.state;
        const displayName = this.props.currentUser.displayName;
        socket.emit(VERIFY_USER,{displayName});
    }
    

    logout = () => {
        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({ user: null})
    }

    render() {
        const { title, currentUser } = this.props;
        
        return(
            <div className="container">
                {title}
                <p>{currentUser._id}</p>
                <p>{currentUser.displayName}</p>
            </div>
        )
    }
}