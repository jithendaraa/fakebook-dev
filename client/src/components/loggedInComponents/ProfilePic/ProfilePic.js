import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ProfilePic.css';
import SlideInPopup from '../../UI/EditDpPopup/EditDpPopup';

import * as actions from '../../../actions';

class ProfilePic extends Component {

    state = {
        hideDiv: false,
        dpSrc: "/images/empty.png"
    };

    getDpSrc = async() => {
        this.props.getDp();
    }

    componentDidMount(){
        this.props.fetchUser();
        // console.log(this.props.auth._id);
        this.getDpSrc();
    }

    displayName = () => (<div>{this.props.auth.displayName}</div>);
    email = () => (<div>{this.props.auth.email}</div>);
    
    profilePic = () => {
        return (
            <div>
                <img className={classes.Dp} id="dp" src={this.props.dpSrc} alt="dp"/>
                <center className={classes.DpDiv} >
                    <div>
                        <SlideInPopup />                    
                    </div>
                </center>
            </div>
        )
    }
    
    render() {
        return (
            <div style={{display: "flex", flexWrap: "wrap", paddingTop: "10px"}}>
                {this.profilePic()}
                <div id="space" style={{width: "30px"}}>
                </div>
                <div style={{paddingTop: '20px'}}>
                    <h2>{this.displayName()}<b>{this.email()}</b></h2>          
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        auth: state.auth,
        dpSrc: state.dpSrc
    }
}

export default connect(mapStateToProps, actions)(ProfilePic);