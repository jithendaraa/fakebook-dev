import React,{ Component } from 'react';


import classes from './Signup.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import GoogleOAuthBtn from '../../UI/Button/GoogleOAuthBtn';

// import axios from 'axios';


class Signup extends Component {

    state = {
        passwordsMatch: false
    }

    inputChangedHandler = () => {
        let password = document.getElementById("password").value;
        let cPassword = document.getElementById("cPassword").value;
        if(password == cPassword && this.state.passwordsMatch == false && password.length >= 7 && cPassword.length >= 7){
            this.setState({ passwordsMatch: !this.state.passwordsMatch}, function(){
                console.log("Passwords Match");
                let btn = document.getElementById("signupBtn");
                btn.disabled = false;
                btn.style.cursor = "pointer";
                btn.style.backgroundColor= "goldenrod";
                btn.style.transition = "1.5s";
            });
        }
        else if(password !== cPassword && this.state.passwordsMatch == true){
            this.setState({ passwordsMatch: !this.state.passwordsMatch}, function() {
                console.log("Passwords don't Match");
                let btn = document.getElementById("signupBtn");
                btn.disabled = true;
                btn.style.cursor = "no-drop";
                btn.backgroundColor = "gray";
            });
        }
    }

    render(){


        return(
            <div className={classes.signup}>
            
                {/* <h3 className={classes.header}>Signup Wrapper!</h3> */}
                <div >
                    {/* <form className={classes.myForm} id="signupForm" method="POST" action="/signin"  >
                        <Input
                            placeholder="Name"
                            type="text"
                            width="250px"
                            height="30px"
                            name="name"
                            id="name" /> <br />
                        <Input
                            placeholder="Email"
                            type="text"
                            width="250px"
                            height="30px"
                            name="email"
                            id="email" /> <br />
                        <Input
                            placeholder="Password"
                            type="password"
                            width="250px"
                            height="30px"
                            changed={this.inputChangedHandler}
                            id="password"
                            name="password"
                            pmatch={this.state.passwordsMatch}/> <br />
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            width="250px"
                            height="30px"
                            changed={this.inputChangedHandler}
                            id="cPassword"
                            name="cPassword"
                            pmatch={this.state.passwordsMatch}/> <br />
                        <Button
                            type="submit"
                            width="80px"
                            height="30px"
                            btnText="Signup"
                            id="signupBtn"
                            disabled="true"
                            ></Button>
                        <h4>Or Signup with Google</h4>
                        
                    </form> */}
                </div>
                <GoogleOAuthBtn width="300" height="50"></GoogleOAuthBtn>
            </div>
        )
    }
}

export default Signup;
