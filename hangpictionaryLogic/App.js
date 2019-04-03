import React, { Component } from 'react';
import RandomWord from 'react-random-word';
import './App.css';
import Hangman from './hangman';
// import classes from '*.module.css';
import Guess from './Guess.js';


const randomWords = require('random-words');


class App extends Component {

  


  state = {
    word: randomWords(),
    oof: 0
  }

  async componentDidMount() {
    //  this.reword();
    if (this.state.word.length <= 3) {
      this.reword();
    }
  }

  reword = async() => {
    let randomword = randomWords();
    if ((randomword.length > 3) && (randomword !== undefined) && (randomword !== "undefined")) {
      await this.setState({ word: randomword });
    }
    else {
      this.reword();
    }

  }


  oof = async () => {
    let oof = this.state.oof;
    await this.setState({ oof: oof+1 });
  }


  render() {
    return (
      <div style={{ padding: "10px 10px" }}>

        <h3 style={{ textAlign: "center", backgroundColor: "rgb(15, 15 ,15)", color: "rgb(173,255,47)" }}>
        
          <RandomWord
            word={"<" + this.state.word + " />"}
            speed={100}
            rounds={10}
            letters="1234567890" />
            <div>
                  Oof: {this.state.oof}
            </div>
        </h3>

        <center>
              <Guess word={this.state.word}/>
              
        </center>
        
        <center>
             {/* <Hangman /> */}
            <button style={{backgroundColor: "red", border: "1px solid black", margin: "none"}} onClick={this.oof}>Wrong</button>
        </center>
        
      </div>
    );
  }
}

export default App;
