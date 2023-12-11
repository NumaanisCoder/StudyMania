import './App.css';
import { FileUpload } from './FileUpload';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/NavBar/Nav'
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Security from './components/Security/Security';

function App() {
  return <Router>
    <Nav/>
    <Routes>
      <Route path='/admin' element={<Security/>} />
    </Routes>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
  <Footer/>
  </Router>;
}

export default App;
