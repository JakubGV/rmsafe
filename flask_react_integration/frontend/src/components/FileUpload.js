import React, { useState } from "react";

function FileUpload() {
  const [label, setLabel] = useState("null");
  return (
    // <div className="input-group">
    //   <div className="input-group-prepend">
    //     <span className="input-group-text" id="inputGroupFileAddon01">
    //       Upload
    //     </span>
    //   </div>
    //   <div className="custom-file">
    //     <input
    //       type="file"
    //       className="custom-file-input"
    //       id="inputGroupFile01"
    //       aria-describedby="inputGroupFileAddon01"
    //     />
    //     <label className="custom-file-label" htmlFor="inputGroupFile01">
    //       Choose file
    //     </label>
    //   </div>
    // </div>
    <div>
    <form method="post" action="http://localhost:5000/upload" enctype="multipart/form-data">
      <dl>
        <p>
          <input type="file" name="file" autocomplete="off" required />
        </p>
      </dl>
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
  );
}

export default FileUpload;
