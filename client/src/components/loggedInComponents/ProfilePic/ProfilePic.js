import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfilePic extends Component {

    displayName = () => (<div>{this.props.auth.displayName}</div>);
    email = () => (<div>{this.props.auth.email}</div>);
    componentDidMount(){
        console.log(this.props.auth.displayName);
        console.log(this.props.auth.email);
    }
    render() {
        return (
            <div>
                <div>Display users profile picture here maybe? [last priority]</div>
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