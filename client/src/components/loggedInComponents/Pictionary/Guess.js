import React, { Component } from 'react';
import classes from './Guess.css';

class Guess extends Component {

    state = {
        totalLetters: (this.props.currentWord.length * 2),
        letters: [],
        wrongs: 0
    }

    constructor(props){
        super(props);

        this.randLetter = null;
    }

    randLetterGen(sequence, wordLetters, length) {
        let i;
        for(i=0; i<length; i++){
            this.randLetter = sequence[Math.floor(Math.random() * (sequence.length))];
            wordLetters.push(this.randLetter);
        }
        return wordLetters.sort();
    }
    
    renderDashes = () => {
        let i = 0;
        return this.props.currentWord.split('').map(word => {
            i += 1;

            return (<div style={{paddingLeft: "3px", color: "rgb(173, 255, 27)", fontSize: "20px"}} key={i} id={i}>
                        <div style={{ width: "30px", height: "30px", borderBottom: "4px solid rgb(173, 255, 27)", color: "rgb(173, 255, 27)" }}></div>
                    </div>)
        })
    }

    async componentDidMount() {
        let word = this.props.currentWord;
        let wordLetters = word.split('');
        
        console.log("wordLetters: " + wordLetters);
        let i;
        let sequence = [];
        let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        wordLetters.map(letter => {  
                for(i=0; i<alphabets.length; i++){
                    if(alphabets[i] !== letter){
                        sequence.push(alphabets[i])
                    }
                }
        });

        let guessLetters = this.randLetterGen(sequence, wordLetters, word.length);
        console.log("display these: " + guessLetters);
        await this.setState({ letters: guessLetters });
    }

    clicked = (id) => {
        let val = document.getElementById(id).innerHTML;
        let div = document.getElementById('guessLetters');
        let children = div.childNodes;
        let i=0;
        let wrongBool = 1;
        // console.log(children)
        for(i=0; i<children.length; i++){
            if(children[i].innerHTML === val){
                div.removeChild(children[i]);
            }
        }

        div = document.getElementById("dashes");
        children = div.childNodes;

        let wordLetters = this.props.currentWord.split('');
        
        for(i=0; i<this.props.word.length; i++){
            if(val === wordLetters[i]){
                children[i].innerHTML = val;
                wrongBool = 0;
            }
        }

        if(wrongBool === 1){
            let wrongs = this.state.wrongs;
            this.setState({ wrongs: wrongs+1 });
        }

        let correctBool = false;
        let count = 0;
        for(i=0; i<children.length; i++){
            if(children[i].innerHTML.length !== 1){
                count = 1;
            }
        }

        if(count === 0){
            correctBool = true;
            console.log("YOU WON");
        }


    }

    getLetters = () => {
        let i = 0;
        return this.state.letters.map(letter => {
            return (<div id={i + "" + letter} onClick={() => this.clicked(i+""+letter)} key={i} style={{paddingLeft: "3px", border: "1px solid white", color: "white", cursor: "pointer"}}>{letter}</div>)
        })
    }
    

    render() {
        return (
            <div>
                <h3 style={{textAlign: "center", color: "rgb(173,255,27)"}}>Guess</h3>
                <center>
                    <div id="input" style={{display: "inline-block"}}>
                        <center>

                            <div id="dashes" style={{ display: "flex", flexWrap: "wrap" }}>
                                {this.renderDashes()}    
                            </div>

                            <div id="guessLetters" style={{display: "flex", flexWrap: "flex", justifyContent: "space-between", paddingTop: "15px"}}>
                                {this.state.letters.length !== 0 ? this.getLetters() : null}
                            </div>

                            <p style={{color: "green"}}> {this.state.wrongs}</p>
                            {/* <Hangman wrongs={this.state.wrongs}/> */}
                        </center>
                    </div>
                </center>
            </div>
        )
    }
}

export default Guess;