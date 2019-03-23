import React, { Component } from 'react';
import Layout from './Layout.js';
// import './Chat.css';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Chat extends Component {
 
    userId = () => {return this.props.auth}

    render() {
        return (
                <Layout title="Chat App" currentUser={this.props.currentUser}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, actions)(Chat);