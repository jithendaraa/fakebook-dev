import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.Navbar}>
        <NavigationItem link="/landing" linkTo="Home"></NavigationItem>
        <NavigationItem link="/landing/signup" linkTo="Sign Up"></NavigationItem>
        <NavigationItem link="/landing/signin" linkTo="Sign In"></NavigationItem>
    </ul>
);

export default navigationItems;