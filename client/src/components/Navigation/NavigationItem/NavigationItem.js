import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.Navbar}>
        <NavLink
            to={props.link}
            className={classes.navlink}>{props.linkTo}
        </NavLink>
    </li>
);

export default navigationItem;