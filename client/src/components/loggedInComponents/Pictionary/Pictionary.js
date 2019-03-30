import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Pictionary extends Component {

    

    heading = () => {
        console.log(this.props.auth)
    }

    
    render(){
        return(
            <div style={{color: "white"}}>
                <center>{this.props.auth === null ? null : (<h2>Welcome to live Pictionary, {this.props.auth.displayName.split(" ")[0]}</h2>)}</center>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
     return { 
         auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Pictionary);