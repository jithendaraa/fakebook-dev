import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

import { connect } from 'react-redux';

class Logout extends Component {

    logout = () => (
        <div>
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