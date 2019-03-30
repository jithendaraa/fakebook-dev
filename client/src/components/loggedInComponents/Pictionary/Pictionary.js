import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Pictionary extends Component {

    async componentDidMount(){
        await this.props.fetchUser();
    }
    render(){
        return(
            <div>
                <center><h2>Hello</h2></center>
                Pictionary
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