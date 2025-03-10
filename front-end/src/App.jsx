import './App.css';
import Login from './components/login/login';
import Logo from './components/logo/logo';
import EsqueceuSenha from './components/esqueceuSenha/esqueceuSenha';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
        <Logo/>
        <Router>
          <Routes>
            <Route path='/' element= {<Login/>}></Route>
            <Route path='/esqueceuSenha' element= {<EsqueceuSenha/>}></Route>
          </Routes>
        </Router>      
    </div>
  )
}

export default App
