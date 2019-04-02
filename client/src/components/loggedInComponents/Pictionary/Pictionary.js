import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import socketIoClient from 'socket.io-client';
import classes from './Pictionary.css';
import Button from '../../UI/Button/Button';
import { stat } from 'fs';

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
        this.myTurn = false;
        this.turns = 0;
        this.res = null;
        this.roundLength = 30;          //In seconds
        this.totalRounds = 5;
    }

    //Clear Canvas
    clear = () => {
        let activeCol = this.state.gameboardCtx.fillStyle;
        this.state.gameboardCtx.fillStyle = "white";
        this.state.gameboardCtx.fillRect(0, 0, this.gbWidth, this.gbHeight);
        this.state.gameboardCtx.fillStyle = activeCol;
        let to;
        if (this.props.socket.id === this.res.reqFromSocketId) {
            to = this.res.reqToSocketId;
        }
        else if (this.props.socket.id === this.res.reqToSocketId) {
            to = this.res.reqFromSocketId;
        }
        this.props.socket.emit('clearCanvas', { to: to });
    }

    //What colors can I draw with?
    colorSelectDefault = () => {
        let colorIds = ['black', 'white', 'red', 'green', 'blue', 'yellow'];
        colorIds.map(colorId => {
            let colorElem = document.getElementById(colorId);
            colorElem.style.width = "20px";
            colorElem.style.height = "20px";
            colorElem.style.borderRadius = "10px";
        });
    }

    //Choose color to draw with
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

    //mousedown
    activate = async (e) => {
        await this.setState({ dragging: true });
        this.putPoint(e);
    }

    //mouseup
    deactivate = async () => {
        await this.setState({ dragging: false });
        this.state.gameboardCtx.beginPath();
        let toSocketId;
        if (this.props.socket.id === this.res.reqFromSocketId) {
            toSocketId = this.res.reqToSocketId;
        }
        else if (this.props.socket.id === this.res.reqToSocketId) {
            toSocketId = this.res.reqFromSocketId;
        }
        
        this.props.socket.emit('newPath', {to: toSocketId});
    }

    //Draw or put a point
    putPoint = (e) => {
        if (this.state.dragging === true && this.myTurn === true) {
            this.state.gameboardCtx.lineTo(e.offsetX, e.offsetY);
            this.state.gameboardCtx.stroke();
            this.state.gameboardCtx.beginPath();
            this.state.gameboardCtx.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI * 2);
            this.state.gameboardCtx.fill();
            this.state.gameboardCtx.beginPath();
            this.state.gameboardCtx.moveTo(e.offsetX, e.offsetY);
            let toSocketId;
            if (this.props.socket.id === this.res.reqFromSocketId) {
                toSocketId = this.res.reqToSocketId;
            }
            else if (this.props.socket.id === this.res.reqToSocketId) {
                toSocketId = this.res.reqFromSocketId;
            }

            let drawAt = {
                x: e.offsetX,
                y: e.offsetY,
                radius: this.radius,
                color: this.state.gameboardCtx.fillStyle,
                from: this.props.socket.id,
                to: toSocketId
            };

            this.props.socket.emit('draw', drawAt);
        }
    }

    //After total no of rounds are finished
    gameOver = () => {
        this.myTurn = false;
        alert("Game over");
    }

    async componentDidMount() {
        let gameboardCanvas = document.getElementById("gameboardCanvas");
        await this.setState({ gameboardCtx: gameboardCanvas.getContext('2d') });

        gameboardCanvas.addEventListener('mousedown', this.activate);
        gameboardCanvas.addEventListener('mousemove', this.putPoint);
        gameboardCanvas.addEventListener('mouseup', this.deactivate);
        this.state.gameboardCtx.lineWidth = this.radius * 2;
        this.res = this.props.res;

        let status = document.getElementById('playStatus');

        let playerA = this.res.reqFromSocketId;
        let playerB = this.res.reqToSocketId;
        let toggleTimer;

        if (this.props.socket.id === playerA) {
            this.myTurn = true;
            status.innerHTML = "Draw";
            status.style.backgroundColor = "green";
            status.style.borderRadius = "4px";
        }
        else if (this.props.socket.id === playerB) {
            this.myTurn = false;
            status.innerHTML = "Watching";
            status.style.backgroundColor = "darkred";
            status.style.borderRadius = "4px";
        }
        toggleTimer = setInterval(() => {
            this.state.gameboardCtx.fillStyle = "white";
            this.state.gameboardCtx.strokeStyle = "white";
            this.myTurn = !this.myTurn;
            console.log(this.myTurn)
            console.log("exec turn " + this.turns);
            if (this.myTurn === false) {
                status.innerHTML = "Watching";
                status.style.backgroundColor = "darkred";
                status.style.borderRadius = "4px";
            }
            else if (this.myTurn === true) {
                status.innerHTML = "Draw";
                status.style.backgroundColor = "green";
                status.style.borderRadius = "4px";
            }
            this.turns += 1;
            this.clear();
            if (this.turns === this.totalRounds) {
                clearInterval(toggleTimer);
                this.gameOver();
            }
        }, this.roundLength * 1000);

        this.props.socket.on('draw', res => {

            let activeColor = this.state.gameboardCtx.fillStyle;
            this.state.gameboardCtx.fillStyle = res.color;
            this.state.gameboardCtx.strokeStyle = res.color;
            let x = res.x;
            let y = res.y;
            let radius = res.radius;
            this.state.gameboardCtx.lineTo(x, y);
            this.state.gameboardCtx.stroke();
            this.state.gameboardCtx.beginPath();
            this.state.gameboardCtx.arc(x, y, radius, 0, Math.PI * 2);
            this.state.gameboardCtx.fill();
            this.state.gameboardCtx.beginPath();
            this.state.gameboardCtx.moveTo(x, y);
            this.state.gameboardCtx.fillStyle = activeColor; 
            this.state.gameboardCtx.strokeStyle = activeColor; 

        });

        this.props.socket.on('clearCanvas', res => {
            let activeCol = this.state.gameboardCtx.fillStyle;
            this.state.gameboardCtx.fillStyle = "white";
            this.state.gameboardCtx.fillRect(0, 0, this.gbWidth, this.gbHeight);
            this.state.gameboardCtx.fillStyle = activeCol;
        });

        this.props.socket.on('newPath', res => {
            this.state.gameboardCtx.beginPath();
        })
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
                        <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "5px" }}>
                            <Button btnText="Clear" onClick={this.clear} />
                            <div id="playStatus" style={{ color: "white", paddingLeft: "5px", paddingRight: "5px", paddingTop: "7px", backgroundColor: "darkred", borderRadius: "4px" }}>Watching</div>
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
        auth: state.auth,
        socket: state.socket
    }
}

export default connect(mapStateToProps, actions)(Pictionary);