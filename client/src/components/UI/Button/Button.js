import React from 'react';

// import classes from './Button.css';

import Aux from '../../../hoc/Auxx/Auxx';
import Button from '@material-ui/core/Button';



const button = (props) => {


    let aStyle = {
        textDecoration: "none"
    };


    return (
        <Aux>
            <a href={props.href} style={aStyle}>
                <Button
                    id={props.id}
                    type={props.type}
                    variant="contained"
                    color="primary"
                    style={{ width: props.width, height: props.height, fontSize: props.fontSize }}
                    onClick={props.onClick}>{props.btnText}</Button>
            </a>
        </Aux>
    );
}

export default button;
