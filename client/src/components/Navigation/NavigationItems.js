import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.Navbar}>
        <NavigationItem link="/" linkTo="Home"></NavigationItem>
        <NavigationItem link="/signup" linkTo="Sign Up"></NavigationItem>
        <NavigationItem link="/signin" linkTo="Sign In"></NavigationItem>
    </ul>
);

export default navigationItems;
