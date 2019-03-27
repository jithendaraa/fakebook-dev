import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../../../actions';

const acceptedFileTypes = 'image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
     return item.trim() 
});

class DpUpload extends Component {

    state = {
        selectedImg: null,
        imgSrc: null,
        imgName: null
    }

    imgSelectedHandler = event => {
        this.setState({
            selectedImg: event.target.files[0]
        });
    }


    imgUploadHandler = () => {

        let fd = new FormData();
        if (this.state.selectedImg != null) {
            fd.append('image', this.state.selectedImg, this.state.selectedImg.name);
        
            console.log(this.state.selectedImg)
            axios.post('/api/uploadPic/', fd, {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
                }
            }).then(() => {
                alert("Profile Picture Uploaded");
                window.location.href="/";
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

    handleOnDrop = ( files, rejectedFiles, event) => {
        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files);
            if (isVerified) {

                // imageBase64
                const currentFile = files[0];
                const myFileItemReader = new FileReader();
                myFileItemReader.addEventListener("load", () => {
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

    dropImg = () => {
        this.setState({ imgSrc: null });
    }

    click = async() => {
        const img = await axios.get('/api/uploadPic');
        this.setState({ imgName: '/images/'+img.data });
    }

    render() {
        const { imgSrc } = this.state;
        return (
            <div>
                    <center>
                        <h1>+ Drop file here</h1>
                        {imgSrc !== null ?
                            <div>
                                <img src={imgSrc} onClick={this.dropImg} alt='Preview' />
                                <Button btnText="Upload Image" onClick={this.imgUploadHandler} />
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
                                <Button btnText="Get Image" onClick={this.click} />
                                {   (this.state.imgName == null) ? (<div>No</div>) : (<p><img alt="dp" width="50" height="50" src={this.state.imgName} /></p>) }
                                
                            </div>
                        }
                    </center>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(DpUpload);