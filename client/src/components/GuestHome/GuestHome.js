import React from 'react';

import classes from './GuestHome.css';

import NavigationItems from '../Navigation/NavigationItems';


const guestHome = () => (
    <div className={classes.guestHome}>

        <div className={classes.navbar}>
            <h4 className={classes.header}>Fakebook</h4>
            <NavigationItems />
            
        </div>

        

        <center className={classes.pad}>
            <div className={classes.separator}></div>
            <br />
            <div className={classes.pageContent}>
                <h3>Welcome to Fakebook</h3>
                <h4> I felt too jobless and this is my first project in React done from scratch!</h4>
                <h5>This is the Homepage of the Guest!</h5>
            
                <p>This is a project which took its inspiration from Facebook.
                    <br />
                    This is a fake facebook ripoff using React and Firebase(backend).
                    <br />
                    Date of start: 7th March 2019
                </p>
                <p>You are currently a guest and not logged in!</p>
                <p>Please signup or Signin to continue.</p>
            </div>
        </center>
    </div>
);

export default guestHome;