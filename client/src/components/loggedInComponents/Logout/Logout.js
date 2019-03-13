import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

import { connect } from 'react-redux';

const aStyle = {
    textDecoration: "none",
    color: "black"
};

class Logout extends Component {

    logout = () => (
        <div>
            {/* <b>Logged in as: {this.userName()}</b> */}
             <Button href='/api/logout' btnText="Logout"/>
        </div>
    );

    render() {
        return (
            <div>
                {this.logout()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
};

export default connect(mapStateToProps)(Logout);