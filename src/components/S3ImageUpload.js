import React, { Component } from "react";
import { Button, Avatar } from "@material-ui/core";
import { v4 as uuid } from "uuid";

export default class S3ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false };
  }

  uploadFile = async file => {
    const fileName = uuid();
    console.log(fileName);
  };

  onChange = async e => {
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
          W
        </Avatar>
      </div>
    );
  }
}
