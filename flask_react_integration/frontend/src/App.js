import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import CustomNavbar from "./components/CustomNavbar";

function App() {
  return (
    <div className="App">
      <script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossorigin
      ></script>
      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossorigin
      ></script>
      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin
      ></script>
      <script src="canvasjs/dist/canvasjs.js"></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
      <CustomNavbar />
      <div className="page-container">
        <p>
          RMSafe is a remote monitoring system designed for senior citizens to
          help keep them safe within their own homes. Our system utilizes image
          and video recognition using machine learning with cameras alongside
          vibration sensors for more private parts of the home. Our product's
          primary goal is to monitor the user's health, mainly whether the user
          falls or not. The system will interact with the user through a webpage
          on which sensor and video data are monitored and ways to contact
          medical personnel are provided.
        </p>
      </div>
    </div>
  );
}

export default App;
