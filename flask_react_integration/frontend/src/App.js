import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomNavbar from './sections/CustomNavbar';
import About from './sections/About';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

<script>var Alert = ReactBootstrap.Alert;</script>
      <CustomNavbar/>
      <br></br>
      {/* <FileUpload/> */}
      <About/>
    </div>
  );
}

export default App;
