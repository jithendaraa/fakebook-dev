import React, { Component } from 'react';
import classes from './Guess.css';

class Guess extends Component {
    render() {
        return (
            <div>
                <h3 style={{textAlign: "center", color: "rgb(173,255,27)"}}>Guess</h3>

            <center>
                <div id="input">
                    <div style={{ display: "flex", flexWrap: "wrap"}}>
                        <div style={{width: "50px", height: "4px",backgroundColor: "rgb(173, 255, 27)", border: "2px solid black"}}></div>
                        <div style={{width: "50px", height: "4px",backgroundColor: "rgb(173, 255, 27)", border: "2px solid black"}}></div>
                    </div>
                </div>
            </center>
                
            </div>
        )
    }
}

export default Guess;