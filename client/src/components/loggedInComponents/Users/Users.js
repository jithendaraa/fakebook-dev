import React, { Component } from 'react';
import classes from './Users.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import MyFriends from '../../UI/MyFriends/MyFriends';
import Spinner from '../../UI/Spinner/Spinner';
import socketIoClient from 'socket.io-client';

class Users extends Component {

    state = {
        socket: socketIoClient('http://localhost:5000'),
        chats: null,
        onlineUsers: []
    }

    componentDidMount(){
        
        console.log("genuis");
        
        this.state.socket.on('connect', () => {
            console.log("connected to sockets " + this.state.socket.id );

            let connectedUserObj = {
                displayName: this.props.auth.displayName,
                userId: this.props.auth._id,
                socketId: this.state.socket.id
            }
            this.state.socket.emit('online users', connectedUserObj)
        })

        this.state.socket.on('online users', async onlineUsers => {
            await this.setState({ onlineUsers: onlineUsers });
            console.log(onlineUsers)
        })

        

        
    }

    displayMyFriends = () => {

        let i, onlineId;
        let onlineIds = [];
        for(i=0; i<this.state.onlineUsers.length; i++){
            onlineId = this.state.onlineUsers[i].userId;
            onlineIds.push(onlineId);
        }
        console.log(onlineIds)
    
        
        return (
            <div>
                {this.props.myFriends.map(friend => {
                    let onlineBool = 0;
                    if(onlineIds.includes(friend._id)){
                        onlineBool = 1;
                    }
                    
                    return (
                        <div key={friend._id} style={{display: "flex", flexWrap: "wrap"}}>
                            {onlineBool == 1 ? (<div className={classes.Onlinedot}> </div>) : (<div className={classes.Offlinedot}> </div>) } 
                            {friend.displayName}
                        </div>
                    )
                })}
            </div>
        )
        
    }

    render(){
        return(
        <div className={classes.UsersWrapDiv}>
            Online({this.state.onlineUsers.length - 1})
            {this.props.myFriends != null ? <div>{this.displayMyFriends()}</div> : (<Spinner />)} 
            
        </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth,
        myFriends: state.myFriends
    }
}

export default connect(mapStateToProps, actions)(Users);