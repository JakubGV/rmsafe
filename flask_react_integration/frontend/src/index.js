import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import About from "./routes/About";
import Test from "./routes/Test";
import FAQs from "./routes/FAQs";
import LiveFeed from "./routes/LiveFeed";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="testing" element={<Test />} />
      <Route path="livefeed" element={<LiveFeed />} />
      <Route path="faqs" element={<FAQs />} />
      <Route path="about" element={<About />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
