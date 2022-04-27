import React, { useState } from "react";
import CustomNavbar from "../components/CustomNavbar";
import Button from "react-bootstrap/esm/Button";
import "../routes/LiveFeed.css";

function LiveFeed() {
  const [playing, setPlaying] = useState(false);

  var WIDTH = window.innerWidth * 0.8;
  var HEIGHT = (WIDTH * 9) / 16;

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("livefeed__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    setPlaying(false);
    let video = document.getElementsByClassName("livefeed__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  return (
    <>
      <CustomNavbar />
      <div className="livefeed__container">
        <video
          height={HEIGHT}
          width={WIDTH}
          muted
          autoPlay
          className="livefeed__videoFeed"
        ></video>
      </div>
      <div className="livefeed__input">
        {playing ? (
          <Button onClick={stopVideo}>Stop</Button>
        ) : (
          <Button onClick={startVideo}>Start</Button>
        )}
      </div>
    </>
  );
}

export default LiveFeed;
