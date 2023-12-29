import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home';
import VideoCall from './pages/videocall';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/videocall' element={<VideoCall/>}></Route>
      </Routes>
    </Router>
  );
}

export default App
