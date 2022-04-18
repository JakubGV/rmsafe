import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CustomNavbar from "../components/CustomNavbar";
// import about from "../data/about.json"

function About() {
  var img_src =
    "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png";
  var sample_bio = "This is a sample bio for each group member";
  var info = {
    "Azim Khan": [sample_bio, img_src],
    "Jakub Vogel": [sample_bio, img_src],
    "Kevin Estabillo": [sample_bio, img_src],
    "Nirav Patel": [sample_bio, img_src],
    "Shahir Ghani": [sample_bio, img_src],
    "Jorge Ortiz - Advisor": [sample_bio, img_src],
  };

  return (
    <>
      <CustomNavbar />
      <div className="page-container">
        <Row xs={1} md={3} className="g-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Col>
              <Card style={{ width: "" }}>
                <Card.Img variant="top" src={info[Object.keys(info)[idx]][1]} />
                <Card.Body>
                  <Card.Title>{Object.keys(info)[idx]}</Card.Title>
                  <Card.Text>{info[Object.keys(info)[idx]][0]}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default About;
