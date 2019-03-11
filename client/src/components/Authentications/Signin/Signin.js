import React,{ Component } from 'react';

import classes from './Signin.css';

import Input from '../../UI/Input/Input';
import ActButton from '../../UI/Button/ActButton';
import Home from '../../Home/Home';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';




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

    signinForm = () => (    
        <div>
            <Home />      
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
                    {/* <ActButton
                        type="submit"
                        className={classes.loginBtn}
                        width="80px"
                        height="30px"
                        btnText="Login"
                        id="loginBtn"
                    ></ActButton> */}
                    <Button variant="contained" color="primary">Log in</Button>
                </form>
            </div>
        </div>
    );


    renderContent() {
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <div>{this.signinForm()}</div>; 
            default:
                return;
        }
    }


    render(){
        return(<div>{this.renderContent()}</div>);
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
};


export default connect(mapStateToProps)(Signin);
