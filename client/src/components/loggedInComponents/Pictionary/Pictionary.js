import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import socketIoClient from 'socket.io-client';
import classes from './Pictionary.css';

// const socket= socketIoClient('http://localhost:5000');

class Pictionary extends Component {



    heading = () => {
        console.log(this.props.auth)
    }


    render() {
        return (
            <div style={{ color: "white" }}>

                {this.props.auth === null ? null : (<h2 style={{ textAlign: "center" }}>Welcome to live Pictionary, {this.props.auth.displayName.split(" ")[0]}</h2>)}

                <h2 style={{ textAlign: "center" }}>Welcome to live Pictionary</h2>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <div>
                        <center style={{ height: "50px", width: "300px" }}><h2>Me</h2></center>
                        <canvas height="450" width="300" style={{ border: "1px solid white", borderRadius: "5px" }}></canvas>
                    </div>



                    <div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <canvas width="700" height="500" style={{ border: "1px solid white", borderRadius: "5px" }}></canvas>
                            <div style={{
                                height: "150px",
                                paddingLeft: "5px",
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                
                            }}>
                                <div className={classes.Black}></div>
                                <div className={classes.White}></div>
                                <div className={classes.Red}></div>
                                <div className={classes.Green}></div>
                                <div className={classes.Blue}></div>
                                <div className={classes.Yellow}></div>
                            </div>
                        </div>
                    </div>



                    <div>
                        <center style={{ height: "50px", width: "300px" }}><h2>Them</h2></center>
                        <canvas height="450" width="300" style={{ border: "1px solid white", borderRadius: "5px" }}></canvas>
                    </div>
                </div>



            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Pictionary);