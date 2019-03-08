import React from 'react';

import classes from './Button.css';

import Aux from '../../../hoc/Auxx/Auxx';


const button = (props) => {

    let style = {
        width: props.width,
        height: props.height,
        cursor: "no-drop",
        backgroundColor: "goldenrod"
    }

    if(props.disabled == false)
    {
        style = {
            width: props.width,
            height: props.height,
            cursor: "pointer",
            backgroundColor: "goldenrod"
        }
    }

    else if(props.disabled == true){
        style = {
            width: props.width,
            height: props.height,
            cursor: "no-drop",
            backgroundColor: "goldenrod"
        }
    }

    // if(props.id == "loginBtn"){
    //     document.getElementById("loginBtn").disabled = false;
    // }


    return (
        <Aux>
            <button
                className={classes.Btn}
                style={style}
                type={props.type}
                id={props.id}
                disabled="false">{props.btnText}</button>
        </Aux>
    );
}

export default button;
