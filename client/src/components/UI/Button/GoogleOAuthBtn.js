import React from 'react';

// import classes from './Button.css';

import Aux from '../../../hoc/Auxx/Auxx';
import Glogo from '../../../assets/logos/googleLogo.jpg';
import Button from '@material-ui/core/Button';


const googleOAuthBtn = (props) => {


    let btnStyle = {
        width: "310px",
        height: "90px",
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
        paddingTop: "15px"
    };

    let bstyle = {
        fontSize: "20px",
        paddingLeft: "0px"
    };

    let astyle = {
        color: 'black',
        textDecoration: "none"
    };


    return (
        <Aux>
            <Button variant="contained" color="white" style={btnStyle}>
                <a href='/auth/google' style={astyle}>
                    <img src={Glogo} style={imgStyle} />
                    <p><b style={bstyle}>  Signup with Google</b></p>
                </a>
            </Button>
            
        </Aux>
    );
}

export default googleOAuthBtn;
