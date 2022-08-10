
import { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
// import Root from './pages/Root';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} >
          </Route>
          <Route path='/login' element={<Login />}>
          </Route>
          <Route path='/signup' element={<Register />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
