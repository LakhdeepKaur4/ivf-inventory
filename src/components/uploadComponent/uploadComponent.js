import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import HostResolver from '../../components/resolveHost/resolveHost';

class UploadComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            host:''
        };
    }

    setHost = async host => {
        this.setState({ host })
    }
    getFiles = (files) => {
            let obj = {};
            obj.foldername = this.props.data;
            obj.filename = files[0].name;
            obj.picture = files[0].base64;
            let URL = this.state.host;
            axios.post(`${URL}/api/upload`, obj).then((res) => {
                return res.data.path;
            }
            ).then((path) => this.props.onFileUpload(path));

    }
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <HostResolver hostToGet="inventory" hostResolved={host => {
                    this.setHost(host);
                }}>
                    <div style={{ marginLeft: '20px' }} >
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