import React,{ Component } from 'react';

import classes from './Signin.css';

import Input from '../../UI/Input/Input';
// import GuestHome from '../../GuestHome/GuestHome';
import ActButton from '../../UI/Button/ActButton';

class Signin extends Component {

    state = {
        disabled: false
    }

    inputTouchedHandler = () => {
        if(this.state.disabled == false){
            let btn = document.getElementById("loginBtn");
            btn.disabled = false;
        }
    }



    render(){
        return(
            <div className={classes.signin}>
                {/* {GuestHome} */}
                <h3 className={classes.header}>Signin !</h3>
                <form className={classes.myForm}>
                    <Input
                        type="text"
                        placeholder="Email"
                        width="250px"
                        height="30px"
                        touched={this.inputTouchedHandler}/> <br />
                    <Input
                        type="password"
                        placeholder="Password"
                        width="250px"
                        height="30px" /> <br />
                    <ActButton
                        type="submit"
                        className={classes.loginBtn}
                        width="80px"
                        height="30px"
                        btnText="Login"
                        id="loginBtn"
                        ></ActButton>
                </form>
            </div>
        );
    }
}


export default Signin;
