import React from 'react';

// import classes from './Button.css';

import Aux from '../../../hoc/Auxx/Auxx';
import Glogo from '../../../assets/logos/googleLogo.jpg';


const googleOAuthBtn = (props) => {


    let btnStyle = {
        width: "310px",
        height: "60px",
        backgroundColor: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: "10px",
        border: "none",
        borderShadow: "none"
    };

    let imgStyle = {
        width: "50px",
        height: "50px",
        borderRadius: "5px",
        float: "left",
        paddingTop: "4px"
    };

    let bstyle = {
        fontSize: "25px",
        paddingLeft: "5px"
    };

    let astyle = {
        color: 'black',
        textDecoration: "none"
    };


    return (
        <Aux>
            <button style={btnStyle}>
                <a href='/auth/google' style={astyle}>
                    <img src={Glogo} style={imgStyle} />
                    <p><b style={bstyle}>  Signup with Google</b></p>
                </a>
            </button>
        </Aux>
    );
}

export default googleOAuthBtn;
