import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import socketIoClient from 'socket.io-client';
import classes from './Pictionary.css';
import Button from '../../UI/Button/Button';

// const socket= socketIoClient('http://localhost:5000');

class Pictionary extends Component {


    constructor(props) {
        super(props);

        this.gbWidth = 700;
        this.gbHeight = 500;
        this.radius = 5;
        this.state = {
            gameboardCtx: null,
            dragging: false
        };
    }

    clear = () => {
        let activeCol = this.state.gameboardCtx.fillStyle;
        this.state.gameboardCtx.fillStyle = "white";
        this.state.gameboardCtx.fillRect(0, 0, this.gbWidth, this.gbHeight);
        this.state.gameboardCtx.fillStyle = activeCol;
    }

    colorSelectDefault = () => {
        let colorIds = ['black', 'white', 'red', 'green', 'blue', 'yellow'];
        colorIds.map(colorId => {
            let colorElem = document.getElementById(colorId);
            colorElem.style.width = "20px";
            colorElem.style.height = "20px";
            colorElem.style.borderRadius = "10px";
        });
    }

    colorSelect = (activeColor) => {
        console.log(activeColor);
        this.colorSelectDefault();
        let activeColorElem = document.getElementById(activeColor);
        activeColorElem.style.width = "22px";
        activeColorElem.style.width = "22px";
        activeColorElem.style.borderRadius = "11px";
        this.state.gameboardCtx.fillStyle = activeColor;
        this.state.gameboardCtx.strokeStyle = activeColor;
    }

    activate = async (e) => {
        await this.setState({ dragging: true });
        this.putPoint(e);
    }

    deactivate = async () => {
        await this.setState({ dragging: false });
        this.state.gameboardCtx.beginPath();
    }

    putPoint = (e) => {
        if (this.state.dragging === true) {
            this.state.gameboardCtx.lineTo(e.offsetX, e.offsetY);
            this.state.gameboardCtx.stroke();
            this.state.gameboardCtx.beginPath();
            this.state.gameboardCtx.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI * 2);
            this.state.gameboardCtx.fill();
            this.state.gameboardCtx.beginPath();
            this.state.gameboardCtx.moveTo(e.offsetX, e.offsetY);
        }
    }

    async componentDidMount() {
        let gameboardCanvas = document.getElementById("gameboardCanvas");
        await this.setState({ gameboardCtx: gameboardCanvas.getContext('2d') });

        gameboardCanvas.addEventListener('mousedown', this.activate);
        gameboardCanvas.addEventListener('mousemove', this.putPoint);
        gameboardCanvas.addEventListener('mouseup', this.deactivate);
        this.state.gameboardCtx.lineWidth = this.radius * 2;
    }


    render() {
        return (
            <div style={{ color: "white" }}>

                {/* {this.props.auth === null ? null : (<h2 style={{ textAlign: "center" }}>Welcome to live Pictionary, {this.props.auth.displayName.split(" ")[0]}</h2>)} */}

                <h2 style={{ textAlign: "center" }}>Welcome to live Pictionary</h2>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <div>
                        <center style={{ height: "50px", width: "300px" }}><h2>Me</h2></center>
                        <canvas height="450" width="300" style={{ border: "1px solid white", borderRadius: "5px" }}></canvas>
                    </div>

                    <div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <canvas id="gameboardCanvas" width="700" height="500" style={{ border: "1px solid white", borderRadius: "5px", backgroundColor: "white" }}></canvas>
                            <div id="colorSelector" style={{
                                height: "150px",
                                paddingLeft: "5px",
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}>
                                <div id="black" className={classes.Black} onClick={() => { this.colorSelect('black') }}></div>
                                <div id="white" className={classes.White} onClick={() => { this.colorSelect('white') }}></div>
                                <div id="red" className={classes.Red} onClick={() => { this.colorSelect('red') }}></div>
                                <div id="green" className={classes.Green} onClick={() => { this.colorSelect('green') }}></div>
                                <div id="blue" className={classes.Blue} onClick={() => { this.colorSelect('blue') }}></div>
                                <div id="yellow" className={classes.Yellow} onClick={() => { this.colorSelect('yellow') }}></div>
                            </div>
                        </div>
                        <Button btnText="Clear" onClick={this.clear}/>
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