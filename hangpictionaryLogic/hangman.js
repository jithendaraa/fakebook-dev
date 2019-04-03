import React, { Component } from 'react';

class Hangman extends Component {

    state = {
        ctx: null
    }

    

    drawRope = () => {
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(150, 0);
        this.state.ctx.lineTo(150, 70);
        this.state.ctx.stroke();
    }

    drawHead = () => {
        this.state.ctx.beginPath();
        this.state.ctx.arc(150, 110, 40, Math.PI * 2, false);
        this.state.ctx.stroke();
    }

    drawBody = () => {
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(150, 150);
        this.state.ctx.lineTo(150, 300);
        this.state.ctx.stroke();
    }

    drawHands = () => {
        //Left hand
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(150, 220);
        this.state.ctx.lineTo(75, 180);
        this.state.ctx.stroke();

        //Right hand
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(150, 220);
        this.state.ctx.lineTo(225, 180);
        this.state.ctx.stroke();
    }

    drawLegs = () => {
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(150, 300);
        this.state.ctx.lineTo(95, 400);
        this.state.ctx.stroke();

        //Right leg
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(150, 300);
        this.state.ctx.lineTo(205, 400);
        this.state.ctx.stroke();
    }

    async componentDidMount() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        await this.setState({ ctx: ctx });

        this.drawRope();
    }

    drawing = () => {
        switch(this.props.wrongs){
            case 1: 
                this.drawHead();
                return;
            case 2:
                this.drawBody();
                return;
            case 3:
                this.drawHands();
                return;
            case 4:
                this.drawLegs();
                return;
            case 5:
                alert("You lost");
                return;
            default:
                return
        }
    }


    render() {
        return (
            <div style={{ padding: "10px 10px" }}>
                <canvas id="canvas" width="300" height="450" style={{ border: "1px solid black", backgroundColor: "black" }}></canvas>
                {this.props.wrongs !== undefined ? this.drawing() : null}
            </div>
        )
    }
}

export default Hangman;