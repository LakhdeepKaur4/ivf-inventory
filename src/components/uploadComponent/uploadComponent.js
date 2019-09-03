import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import $ from 'jquery';

class UploadComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            filename:'',
            picture:''
        }
    }
    componentDidMount() {
        $("input[type=file]").attr("id", "file-upload");
        $("#file-upload").change(function() {
          var file = $("#file-upload")[0].files[0].name;
          $(this)
            .prev("label")
            .text(file);
        });
      }

    getFiles = (files) => {
        this.props.onFileUpload(files);
        this.setState({ fileName: files[0].name, picture: files[0].base64 });
    }
    render() {
        return (

            <div style={{marginLeft: '20px'}}>
                <label
                    htmlFor="file-upload"
                    className="file custom_file_upload"
                >
                    CHOOSE
                                            </label>
                <FileBase64
                    multiple={true}
                    onDone={this.getFiles}
                />
            </div>
        )
    }
}

export default UploadComponent;