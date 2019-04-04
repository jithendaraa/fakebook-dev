import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Input from '../../UI/Input/Input';
import classes from './Pictionary.css';
import Button from '../../UI/Button/Button';
import Guess from './Guess';
import RandomWord from 'react-random-word';

// const socket= socketIoClient('http://localhost:5000');
const randomWords = require('random-words');

class Pictionary extends Component {


    constructor(props) {
        super(props);

        this.gbWidth = 700;
        this.gbHeight = 500;
        this.radius = 5;
        this.randomWord = randomWords();
        this.myTurn = false;
        this.res = this.props.res;
        this.state = {
            gameboardCtx: null,
            dragging: false,
            component: (<RandomWord
                word={(this.randomWord.length > 3) && (this.randomWord !== "undefined") && (this.randomWord !== undefined) ? "<" + this.randomWord + " />" : "<" + this.reword() + " />"}
                speed={100}
                rounds={10}
                letters="1234567890" />),
            score: 0,
            alreadyCorrect: false,
            currentWord: null,
            turns: 1,
            myTurn: false
        };
        this.firstWord = this.randomWord;
        this.wordToGuess = null;
        this.turns = 0;
        this.roundLength = 10;          //In seconds
        this.totalRounds = 5 * 2;       //1 draw and 1 guess is counted as one round
    }

    reword = () => {
        this.randomWord = randomWords();
        if (this.randomWord.length <= 3 || this.randomWord === "undefined" || this.randomWord === undefined) {
            this.reword();
        }
        else if (this.randomWord.length > 3) {
            let toSocketId;
            if (this.props.socket.id === this.res.reqFromSocketId) {
                toSocketId = this.res.reqToSocketId;
            }
            else if (this.props.socket.id === this.res.reqToSocketId) {
                toSocketId = this.res.reqFromSocketId;
            }
            this.props.socket.emit('word to guess', {
                word: this.randomWord,
                to: toSocketId
            });
            if (this.state.currentWord !== null) {
                this.setState({ currentWord: this.randomWord });
            }
            return this.randomWord;
        }
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

        this.props.socket.emit('newPath', { to: toSocketId });
    }

    //Draw or put a point
    putPoint = (e) => {
        if (this.state.dragging === true && this.state.myTurn === true) {
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
        this.setState({ myTurn: false});
        alert("Game over");
    }

    myTurnOnChange = async () => {
        if (this.state.myTurn === false) {
            document.getElementById("guessAns").style.display = "block";
            await this.setState({ component: (<p>Guess the word</p>) });
        }
        else if (this.state.myTurn === true) {
            document.getElementById("guessAns").style.display = "none";
            await this.setState({
                component: (<RandomWord
                    word={"<" + this.reword() + " />"}
                    speed={100}
                    rounds={10}
                    letters="1234567890" />)
            });
        }
    }

    setTurns = async() => {
        this.res = this.props.res;

        let status = document.getElementById('playStatus');

        let playerA = this.res.reqFromSocketId;
        let playerB = this.res.reqToSocketId;
        let toggleTimer;

        if (this.props.socket.id === playerA) {
            await this.setState({ myTurn: true });
            document.getElementById("guessAns").style.display = "none";
            this.myTurnOnChange();
            status.innerHTML = "Draw";
            status.style.backgroundColor = "green";
            status.style.borderRadius = "4px";

            let toSocketId;
            if (this.props.socket.id === this.res.reqFromSocketId) {
                toSocketId = this.res.reqToSocketId;
            }
            else if (this.props.socket.id === this.res.reqToSocketId) {
                toSocketId = this.res.reqFromSocketId;
            }

            this.props.socket.emit('firstWord', {
                firstWord: this.firstWord,
                to: toSocketId
            });
            
        }
        else if (this.props.socket.id === playerB) {
            await this.setState({ myTurn: false });
            document.getElementById("guessAns").style.display = "block";
            this.myTurnOnChange();
            status.innerHTML = "Watching";
            status.style.backgroundColor = "darkred";
            status.style.borderRadius = "4px";
        }
        if (this.state.currentWord === null) {
            
            await this.setState({ currentWord: this.firstWord});

        }
        else if (this.state.currentWord !== null) {
            // this.currentWord = this.randomWord;
            await this.setState({ currentWord: this.randomWord});
        }


        if (this.state.myTurn === true) {
            let toSocketId;
            if (this.props.socket.id === this.res.reqFromSocketId) {
                toSocketId = this.res.reqToSocketId;
            }
            else if (this.props.socket.id === this.res.reqToSocketId) {
                toSocketId = this.res.reqFromSocketId;
            }

            this.props.socket.emit('currentWord', {
                currentWord: this.state.currentWord,
                to: toSocketId
            });
        }



        toggleTimer = setInterval(async() => {
            this.state.gameboardCtx.fillStyle = "white";
            this.state.gameboardCtx.strokeStyle = "white";
            let myTurn = this.state.myTurn;
            await this.setState({ myTurn: !myTurn });
            this.myTurnOnChange();
            
            if (this.state.myTurn === true) {
                let toSocketId;
                if (this.props.socket.id === this.res.reqFromSocketId) {
                    toSocketId = this.res.reqToSocketId;
                }
                else if (this.props.socket.id === this.res.reqToSocketId) {
                    toSocketId = this.res.reqFromSocketId;
                }

                this.props.socket.emit('currentWord', {
                    currentWord: this.state.currentWord,
                    to: toSocketId
                });
            }


            let toSocketId;
            if (this.props.socket.id === this.res.reqFromSocketId) {
                toSocketId = this.res.reqToSocketId;
            }
            else if (this.props.socket.id === this.res.reqToSocketId) {
                toSocketId = this.res.reqFromSocketId;
            }

            this.props.socket.emit('firstWord', {
                firstWord: this.firstWord,
                to: toSocketId
            });
            console.log("exec turn " + this.state.turns);
            if (this.state.myTurn === false) {
                status.innerHTML = "Watching";
                status.style.backgroundColor = "darkred";
                status.style.borderRadius = "4px";

            }
            else if (this.state.myTurn === true) {
                status.innerHTML = "Draw";
                status.style.backgroundColor = "green";
                status.style.borderRadius = "4px";
            }
            let turns = this.state.turns;
            await this.setState({ turns: turns+1 });
            this.turns += 1;
            this.clear();
            if (this.state.turns === this.totalRounds) {
                clearInterval(toggleTimer);
                this.gameOver();
            }
            await this.setState({alreadyCorrect: false});
        }, this.roundLength * 1000);
    }

    socketEvents = () => {
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
        });

        this.props.socket.on('word to guess', async (res) => {
            this.wordToGuess = res.word;

        });

        this.props.socket.on('firstWord', res => {
            this.firstWord = res.firstWord;
        });

        this.props.socket.on('currentWord', async res => {
            // this.currentWord = res.currentWord;
            await this.setState({ currentWord: res.currentWord })
            console.log("THE CURRENT WORD IS: " + this.state.currentWord);
        })
    }

    guessClickHandler = async() => {
        let val = document.getElementById("guessVal").value;
        document.getElementById("guessVal").value = "";
        if((val === this.state.currentWord) && (this.state.alreadyCorrect === false)){
            let score = this.state.score;
            await this.setState({ score: score+1, alreadyCorrect: true });
        }

    }

    async componentDidMount() {

        this.socketEvents();
        let gameboardCanvas = document.getElementById("gameboardCanvas");
        await this.setState({ gameboardCtx: gameboardCanvas.getContext('2d') });

        gameboardCanvas.addEventListener('mousedown', this.activate);
        gameboardCanvas.addEventListener('mousemove', this.putPoint);
        gameboardCanvas.addEventListener('mouseup', this.deactivate);
        this.state.gameboardCtx.lineWidth = this.radius * 2;

        this.setTurns();

    }

    render() {
        return (
            <div style={{ color: "white" }}>

                <h2 style={{ textAlign: "center" }}>Welcome to live Pictionary, your score is: {this.state.score}, Round number {Math.ceil(this.state.turns/2)}</h2>
                <h3 id="word" style={{ textAlign: "center" }}>
                    {this.state.component}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <div>
                        <center style={{ height: "50px", width: "300px" }}><h2>Me</h2></center>
                        <canvas id="canvas1" height="450" width="300" style={{ border: "1px solid white", borderRadius: "5px" }}></canvas>
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
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", paddingTop: "5px", width: "700px" }}>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <Button btnText="Clear" onClick={this.state.myTurn === true ? this.clear : null} />
                                <div id="playStatus" className={classes.PlayStatus}>Watching</div>
                            </div>

                            <div id="guessAns">
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {this.state.alreadyCorrect === true ? (<p>Correct!</p>) : (<div><Input height="30px" id="guessVal" /> <Button id="guessAndBtn" btnText="Guess!" onClick={this.guessClickHandler} /></div>)}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div>
                        <center style={{ height: "50px", width: "300px" }}><h2>Them</h2></center>
                        <canvas id="canvas2" height="450" width="300" style={{ border: "1px solid white", borderRadius: "5px" }}></canvas>
                    </div>

                </div>

                <div id="guess">
                            {(this.state.myTurn === false) && (this.state.currentWord !== null) ? (<Guess currentWord={this.state.currentWord} />) : null}
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