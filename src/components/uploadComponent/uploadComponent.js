import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios'; 
import HostResolver from '../../components/resolveHost/resolveHost';

class UploadComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            picture: '',
            folderName:'',
            host:''
        }
    }
    setHost = async host => {
        console.log(host)
        this.setState({ host })
    }
    getFiles = (files) => {
        let obj={};
        obj.foldername= this.props.data;
        obj.filename=  files[0].name;
        obj.picture=    files[0].base64;
        console.log(obj);
        let URL = this.state.host
        console.log(this.props.data,`folderName=${this.props.data}`,URL);
        console.log(URL,obj,files[0].base64 );
        axios.post(`${URL}/api/upload`,obj).then((res)=>{
                console.log(res);
            this.props.onFileUpload(res.data.path)
        }
        
        )
    }
    render() {
        return (
            <div style={{display:'inline-block'}}>
            <HostResolver hostToGet="inventory"  hostResolved={host => {
                this.setHost(host);
            }}>
            <div style={{ marginLeft: '20px'}} >
                <label
                    htmlFor="file-upload"
                    className="file custom_file_upload"
                >
                    {this.state.fileName ? this.state.fileName : 'CHOOSE'}
                </label>
                <FileBase64
                    multiple={true}
                    onDone={this.getFiles}
                />
            </div>
            </HostResolver>
            </div>
        )
    }
}

export default UploadComponent;