import React, { Component } from "react";
import { Button, Avatar } from "@material-ui/core";
import { v4 as uuid } from "uuid";

//amplify
import { Auth, Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import awsconfig from '../aws-exports'
Storage.configure(awsconfig);

export default class S3ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false, path: "" };
  }

  uploadFile = async file => {
    let fileName = uuid();
    const name_s = file.name.split(".");
    const extension = name_s[name_s.length-1];
    fileName = fileName + "." + extension.toLowerCase();
    const data = await Auth.currentUserPoolUser();
    const image_prefix = 'uploads/'+data.username+"/";
    const result = await Storage.put(
      image_prefix+fileName, 
      file, 
      {
        metadata: { owner: data.username }
      }
    );
    console.log('Uploaded file: ', JSON.stringify(result));
    this.setState({ path: image_prefix+fileName });
    console.log(this.state.path);
  };

  onChange = async e => {
    let files = [];
    for (var i=0; i<e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }
    await Promise.all(files.map(f => this.uploadFile(f)));
    this.setState({ uploading: true });
  };

  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Button
          variant="contained"
          onClick={() =>
            document.getElementById("add-image-file-input").click()
          }
          disabled={this.state.uploading}
          icon="file image outline"
          content={this.state.uploading ? "Uploading..." : "Add Images"}
        >
          Select Image
        </Button>
        <input
          id="add-image-file-input"
          type="file"
          accept="image/jpeg"
          //multiple
          onChange={this.onChange}
          style={{ display: "none" }}
        />
        <Avatar alt="Image" style={{ width: 140, height: 140, marginTop: 15 }}>
          <S3Image 
            imgKey={this.state.path}
            onLoad={this.props.onLoadImage(this.state.path)}
            theme={{ photoImg: { height: '140px' } }}
            style={{display: 'inline-block', 'paddingRight': '5px'}}
          />
        </Avatar>
      </div>
    );
  }
}
