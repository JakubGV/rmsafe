import Button from "react-bootstrap/Button";
import React, { useState } from "react";
//import { getVideoLabel } from "./APIService";

import './FileUpload.css';

function FileUpload() {
  const [label, setLabel] = useState("null");
  const [confidence, setConfidence] = useState("null");
  const [results, setResults] = useState(false);
  // const handleSubmit = (event)
  // const [filename, setFilename] = useState("")
  const [video, setVideo] = useState("");
  const [extension, setExtension] = useState("");
  
  const handleChange = (event) => {
    var name = event.target.files[0].name;
    // setFilename(name);

    setVideo(name.split(".")[0]);
    setExtension(name.split(".")[1]);
  };
  
  const handleclick = () => {
    const URL = `http://localhost:5000/getlabel/${video}/${extension}`;

    fetch(URL, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result && data.confidence) {
          setLabel(data.result === "1" ? "Falling" : "Idle");
          setConfidence(data.confidence);
          setResults(true);
        }
      })
      .catch((error) => {
        alert(`Error fetching: ${error}`);
      });

    /*
    let data = getVideoLabel(video,extension);
    console.log(data); */
  };
  return (
    <div className="file-upload">
      <form
        method="post"
        action="http://localhost:5000/upload"
        enctype="multipart/form-data"
      >
        <dl>
          <p>
            <input
              type="file"
              name="file"
              autocomplete="off"
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <input type="submit" value="Upload" />
          </p>
        </dl>
      </form>
      <Button onClick={handleclick}>Get Label</Button>
      {/* <div>{filename} <br></br>{video} <br/>{extension}</div> */}
      {/* <Button onClick>Classify Video</Button> */}
      {results && (
        <h1>
          The model is {confidence}% confident the person is {label}
        </h1>
      )}
    </div>
  );
}

export default FileUpload;
