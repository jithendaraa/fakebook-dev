import React from 'react';

import classes from './Button.css';

import Aux from '../../../hoc/Auxx/Auxx';
import Button from '@material-ui/core/Button';



const button = (props) => {

    // let style = {
    //     width: props.width,
    //     height: props.height,
    //     cursor: "no-drop",
    //     backgroundColor: "goldenrod"
    // }

    // if(props.disabled == false)
    // {
    //     style = {
    //         width: props.width,
    //         height: props.height,
    //         cursor: "pointer",
    //         backgroundColor: "goldenrod"
    //     }
    // }

    // else if(props.disabled == true){
    //     style = {
    //         width: props.width,
    //         height: props.height,
    //         cursor: "no-drop",
    //         backgroundColor: "goldenrod"
    //     }
    // }

    // if(props.id == "loginBtn"){
    //     document.getElementById("loginBtn").disabled = false;
    // }

    let aStyle = {
        textDecoration: "none"
    };


    return (
        <Aux>
            {/* <button
                className={classes.Btn}
                style={style}
                type={props.type}
                id={props.id}
                disabled="false">{props.btnText}</button> */}
                <a href={props.href} style={aStyle}>
                    <Button type={props.type} variant="contained" color="primary" style={{width: props.width, height: props.height, fontSize: props.fontSize}}>{props.btnText}</Button>
                </a>
        </Aux>
    );
}

export default button;
