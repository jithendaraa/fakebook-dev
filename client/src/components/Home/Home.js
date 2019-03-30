import React, { Component } from 'react';

import classes from './Home.css';
import { connect } from 'react-redux';

import NavigationItems from '../Navigation/NavigationItems';
import Header from '../loggedInComponents/Header';
import Dashboard from '../loggedInComponents/Dashboard/Dashboard';
import Spinner from '../UI/Spinner/Spinner';
import GOAuthBtn from '../UI/Button/GoogleOAuthBtn';



const guestHome = (
    <div className={classes.guestHome} style={{backgroundImage: "linear-gradient(to right, rgb(0,0,0) , rgb(100,100,100))"}}>
        <div className={classes.navbar} style={{backgroundImage: "linear-gradient(to right, rgb(0,0,0) , rgb(100,100,100))"}}>
            <h2 className={classes.header}>Fakebook</h2>
            {/* <NavigationItems /> */}
        </div>
        <center className={classes.pad}>
            <div className={classes.separator}></div>
            <br />
            <div className={classes.pageContent} >
                <h3>Welcome to Fakebook</h3>
                <h5>This is the Homepage of the Guest!</h5>
                <p>
                    This is a project which took its inspiration from Facebook.<br />
                    This is a fake facebook ripoff using React/Redux/express/Node with MongoDB.<br />
                    {/* Date of start: 7th March 2019 */}
                </p>
                <p>You are currently a guest and not logged in!</p>
                <p>Please Signin</p>
            </div>
        </center>
        <div style={{paddingTop: "120px"}}><GOAuthBtn /></div>
    </div>
);



class Home extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return (<div style={{paddingTop: "350px"}}><center><Spinner /></center></div>);
            case false:
                return (<div>{guestHome}</div>);
            default:
                
                let loggedInHome = (
                    <div>
                        <Header />
                        <Dashboard />    {/*Contains dp, userName, userEmail*/}{/* {search}{posts} */}
                    </div>);
                return (
                    <div>
                        {loggedInHome}
                    </div>
                );
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);