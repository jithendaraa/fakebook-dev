import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfilePic extends Component {

    displayName = () => (<div>{this.props.auth.displayName}</div>);
    email = () => (<div>{this.props.auth.email}</div>);
    
    render() {
        return (
            <div>
                <div><a href="/uploadPic">Display users profile picture here maybe? [last priority]</a></div>
                {this.displayName()}
                {this.email()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(ProfilePic);