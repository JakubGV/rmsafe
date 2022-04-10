import React from "react";

function FileUpload() {
//   const [fileName, setFileName] = useState("Upload Boundary File");
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroupFileAddon01">
          Upload
        </span>
      </div>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="inputGroupFile01"
          aria-describedby="inputGroupFileAddon01"
        />
        <label className="custom-file-label" htmlFor="inputGroupFile01">
          Choose file
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
