import React, { Component } from 'react';
// import classes from './DpUpload.css';
import Button from '../../UI/Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import './DpUpload.css';
import 'react-image-crop/lib/ReactCrop.scss';



const acceptedFileTypes = 'image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
    { return item.trim() }
});

class DpUpload extends Component {

    state = {
        selectedFile: null,
        selectedImg: null,
        imgSrc: null
    }

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         imgSrc: null,
    //         crop: {
    //             aspect: 1/1
    //         }
    //     }
    // }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    imgSelectedHandler = event => {
        this.setState({
            selectedImg: event.target.files[0]
        });
    }

    fileUploadHandler = () => {

        let fd = new FormData();

        if (this.state.selectedFile != null) {
            const id = this.props.auth._id;
            console.log(id)
            console.log(this.state.selectedFile)
            console.log(this.state.selectedFile.name)
            fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
            console.log(fd);
            axios.post('/api/uploadPic/', fd, {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
                }
            }).then(() => {
                console.log("uploaded");
            });
        }

        if (this.state.selectedFile == null) {
            alert("Please select an image to upload first");
        }
    }

    imgUploadHandler = () => {

        let fd = new FormData();

        if (this.state.selectedImg != null) {
            const id = this.props.auth._id;
            console.log(id)
            console.log(this.state.selectedImg)
            console.log(this.state.selectedImg.name)
            fd.append('image', this.state.selectedImg, this.state.selectedImg.name);
            console.log(fd);
            console.log(typeof(fd));
            axios.post('/api/uploadPic/', fd, {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
                }
            }).then(() => {
                console.log("uploaded Img");
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
        console.log(files);              //
        console.log("rejected files: " + rejectedFiles);
        console.log(event.target.files[0])
        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files);
            if (isVerified) {

                // imageBase64
                const currentFile = files[0];
                const myFileItemReader = new FileReader();
                myFileItemReader.addEventListener("load", () => {
                    // console.log(myFileItemReader.result);
                    this.setState({
                        imgSrc: myFileItemReader.result,
                        selectedImg: event.target.files[0]
                    })
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

    handleOnCropChange = (crop) => {
        console.log(crop);
        this.setState({ crop });
        console.log(this.state);
    }

    handleImageLoaded = (image) => {
        console.log(image);
        // console.log(this.state.imgSrc)
    }

    handleOnCropComplete = (crop, pixelCrop) => {
        console.log(crop, pixelCrop);
    }



    render() {
        const { imgSrc } = this.state;
        return (
            <div>

                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={this.fileSelectedHandler}
                    ref={fileInput => this.fileInput = fileInput} />
                <Button onClick={() => this.fileInput.click()} btnText="Pick File" />
                <Button btnText="Upload Image" onClick={this.fileUploadHandler} />

                <center>

                    <center>
                        <h1>+ Drop file here</h1>
                        {imgSrc !== null ?
                            <div>
                                {/* {imgSrc} */}
                                <img src={imgSrc} onClick={this.dropImg} alt='Preview' />
                                <Button btnText="Upload Image" onClick={this.imgUploadHandler} />
                                {/* <ReactCrop  
                                    // className={classes.ReactCrop}
                                    src={imgSrc} 
                                    crop={this.state.crop} 
                                    onImageLoaded={this.handleImageLoaded}
                                    onComplete={this.handleOnCropComplete}
                                    onChange={this.handleOnCropChange}/> */}

                            </div> :
                            <div>
                                <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false}>
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

export default connect(mapStateToProps, null)(DpUpload);