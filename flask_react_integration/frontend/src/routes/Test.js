import React from "react";

import CustomNavbar from "../components/CustomNavbar";
import FileUpload from "../components/FileUpload";
import DataChart from '../components/DataChart';

import './Test.css';

function Test() {
  return (
    <div>
      <CustomNavbar />
      <div className="test">
        <FileUpload />
        <DataChart />
      </div>
    </div>
  );
}

export default Test;
