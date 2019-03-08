import React, { Component } from 'react';

import classes from '../../UI/Button/Button.css';
import Aux from '../../../hoc/Auxx/Auxx';

const actButton = (props) => {
    let style = {
        width: props.width,
        height: props.height,
        cursor: "pointer",
        backgroundColor: "goldenrod"
    }

    return (
        <Aux>
            <button
                className={classes.Btn}
                style={style}
                type={props.type}
                id={props.id}>{props.btnText}</button>
        </Aux>
    );
}

export default actButton;