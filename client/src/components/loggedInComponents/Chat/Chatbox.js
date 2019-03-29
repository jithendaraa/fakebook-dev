import React, { Component } from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';
import MyBtn from '../../UI/Button/Button';
import classes from '../Users/Users.css'

class Chatbox extends Component {

    constructor(props) {
        super(props);

        this.chats = []
    }

    

    playSound = () => {
        let snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
    }

    parentDivChild = textObj => {
        let displayTexts = document.getElementById("displayTexts");
        let parentDiv = document.createElement("div");

        let dpThisUser = document.createElement("img");
        let dpThatUser = document.createElement("img");

        dpThatUser.src = "images/" + this.props.openChat.image;
        dpThisUser.src = "images/" + this.props.auth.image;

        dpThisUser.style.width = "20px";
        dpThisUser.style.height = "20px";
        dpThisUser.style.borderRadius = "10px";

        dpThisUser.style.width = "20px";
        dpThisUser.style.height = "20px";
        dpThisUser.style.borderRadius = "10px";
        
        let p = document.createElement("p");
        p.innerHTML = textObj.fromName.split(" ")[0] + ": " + textObj.message;
        p.style.display = "inline-block";
        p.style.padding = "2px 5px";
        p.style.borderRadius = "10px";
        p.style.backgroundColor = "black";
        p.style.color = "goldenrod";
        p.style.wordBreak = "break-all";
        p.style.maxWidth = "200px";
        if (textObj.fromId === this.props.auth._id) {
            p.style.backgroundColor = "goldenrod";
            p.style.color = "black";
            parentDiv.align = "right";
            p.style.textAlign = "left";
        }
        parentDiv.appendChild(p);
        displayTexts.appendChild(parentDiv);
        displayTexts.scrollTop = displayTexts.scrollHeight;
    }


    componentDidMount() {
        this.props.fetchUser();

        this.props.socket.on("connect", () => {
            console.log("socket connected to chatbox " + this.props.socket.id);

            this.props.socket.on("output", chats => {
                console.log("private chats received");

                // let displayTexts = document.getElementById("displayTexts");
                document.getElementById("displayTexts").innerHTML = "";
                if (chats.length > 0) {
                    chats.map(text => {
                        this.parentDivChild(text);
                    });
                }
            });

        });

        this.props.socket.on('message', textObj => {
            this.parentDivChild(textObj);
            if(textObj.fromId != this.props.auth._id){
                this.playSound();
            }
            
        })


    }

    userNameClick = () => {
        console.log("closed")
        document.getElementById("chatDiv").style.display = "none";
    }

    keyPressCheck = (event) => {
        if(event.key === "Enter"){
            this.sendTextClicked();
        }
    }

    getChatWindow = () => {
        if (this.props.openChat != null) {

            let chatBetween = [];
            chatBetween.push(this.props.auth._id);
            chatBetween.push(this.props.openChat._id);

            this.props.socket.emit('output', chatBetween);
            console.log("output emitted")

            return (
                <div id="chatDiv" className={classes.ChatDiv}>
                    <div className={classes.Username} onClick={this.userNameClick}>{this.props.openChat.displayName}</div>
                    <div id="displayTexts" className={classes.DisplayTexts}></div>

                    <div id="sendText" className={classes.SendText}>
                        <input 
                            id="textInp" 
                            type="text" 
                            placeholder="Type your text here" 
                            style={{ width: "228px" }}
                            onKeyPress={this.keyPressCheck} />
                        <MyBtn btnText="send" id="sendTxtBtn" onClick={this.sendTextClicked} />
                    </div>
                </div>
            )
        }
    }

    

    sendTextClicked = () => {
        let textInp = document.getElementById("textInp");
        let message = textInp.value;
        console.log(textInp.value);
        document.getElementById("textInp").value = "";

        let textObj = {
            fromId: this.props.auth._id,
            toId: this.props.openChat._id,
            fromName: this.props.auth.displayName,
            toName: this.props.openChat.displayName,
            message: message
        };

        this.props.socket.emit('message', textObj);
        console.log("message sent");

        this.parentDivChild(textObj);

    }

    render() {
        return (
            <div style={{ display: "flex", flexWrap: "flex" }}>

                {this.getChatWindow()}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(Chatbox);


       