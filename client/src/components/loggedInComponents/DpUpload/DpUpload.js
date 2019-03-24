import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
 
class DpUpload extends Component{

    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({ 
            selectedFile: event.target.files[0] 
        });
    } 

    fileUploadHandler = () => {
        
        let fd = new FormData();
        
        if(this.state.selectedFile != null){
            const id = this.props.auth._id;
            console.log(id)
            console.log(this.state.selectedFile)
            console.log(this.state.selectedFile.name)
            fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
            console.log(fd);
            axios.post('/api/uploadPic/', fd, {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress: ' + Math.round(progressEvent.loaded/progressEvent.total * 100) + "%")
                }
            }).then((res) => {
                console.log(res);
            });
        }
        
        if(this.state.selectedFile == null){
            alert("Please select an image to upload first");
        }
        // else{
        //     await axios.post('/api/uploadPic', {id: id});
        //     console.log("done")
        // }
        
    }

   

    render(){
        return(
            <div style={{display: 'flex'}}>
                
                {/* <input  
                    style={{display: "none"}} 
                    type="file" 
                    onChange={this.fileSelectedHandler}
                    ref={fileInput => this.fileInput = fileInput}/>
                <Button onClick={() => this.fileInput.click()} btnText="Pick File" />
                <Button btnText="Upload Image" onClick={this.fileUploadHandler}/> */}
                <h1>Drop and Crop</h1>
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