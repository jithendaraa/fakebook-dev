import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { connect } from 'react-redux';
import * as actions from '../../../actions';
import axios from 'axios';
import Dropzone from 'react-dropzone';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const acceptedFileTypes = 'image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
    return item.trim()
});

class AlertDialogSlide extends React.Component {
    state = {
        open: false,
        imgSrc: null,
        selectedImg: null,
        imgName: null,
        uploadPercent: 0
    };

    dropImg = () => {
        this.setState({uploadPercent: 0});
        this.setState({ imgSrc: null });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    getUsername = () => {
        if (this.props.auth == null) {
            this.props.fetchUser();
        }

        const firstName = this.props.auth.displayName.split(" ")[0];
        return (firstName)
    }

    handleClose = () => {
        this.dropImg();
        this.setState({ open: false });
    }

    imgSelectedHandler = event => {
        this.setState({
            selectedImg: event.target.files[0]
        });
    }

    getDpSrc = async () => {
        this.props.getDp();
    }

    imgUploadHandler = () => {
        let fd = new FormData();
        if (this.state.selectedImg != null) {
            fd.append('image', this.state.selectedImg, this.state.selectedImg.name);
            // console.log(this.state.selectedImg)
            axios.post('/api/uploadPic/', fd, {
                onUploadProgress: progressEvent => {
                    this.setState({ uploadPercent: Math.round(progressEvent.loaded / progressEvent.total * 100) });
                    console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
                }
            }).then(() => {
                this.handleClose();
                this.getDpSrc().then(() => {
                    alert("Profile Picture Uploaded");
                });
            });
        }

        if (this.state.selectedImg == null) {
            alert("Please select an image to upload first");
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed");
                return false;
            }
            return true;
        }
    }

    handleOnDrop = (files, rejectedFiles, event) => {

        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files);
            if (isVerified) {

                // imageBase64
                const currentFile = files[0];
                const myFileItemReader = new FileReader();
                myFileItemReader.addEventListener("load", () => {
                    // console.log(myFileItemReader)
                    // console.log(myFileItemReader.result);
                    this.setState({
                        imgSrc: myFileItemReader.result,
                        selectedImg: event.target.files[0]
                    });

                }, false);
                myFileItemReader.readAsDataURL(currentFile);
            }
        }
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles);
        }
    }



    render() {
        const { imgSrc } = this.state;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Edit Dp
        </Button>

                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >

                    <DialogTitle id="alert-dialog-slide-title">
                        Update you profile picture, {this.getUsername()}
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText id="alert-dialog-slide-description">
                            <center>
                                {this.state.uploadPercent}% Uploaded
                                <div style={{border: "1px solid gray", width: "300px", height: "10px", display: "flex", flexWrap: "wrap"}}>
                                    <div style={{backgroundColor: "lightblue", width: (this.state.uploadPercent/100) * 300 + "px", height: "10px"}}></div>
                                </div>

                                <h1>+ Drop file here</h1>
                                {imgSrc !== null ?
                                    <div>
                                        <img src={imgSrc} onClick={this.dropImg} alt='Preview' width="225" height="225" />
                                    </div> :

                                    <div>
                                        <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false} >
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div
                                                            style={{
                                                                width: "300px",
                                                                height: "250px",
                                                                border: "1px solid black",
                                                                borderStyle: "dashed",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                        </div>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </div>
                                }
                            </center>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.imgUploadHandler} color="primary">
                            Upload
                    </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(AlertDialogSlide);