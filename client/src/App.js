
import { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home.jsx';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/user/userInfo';
import Root from './pages/Root';
import AdminControlPanel from './pages/admin/AdminControlPanel';
// import Root from './pages/Root';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  },[dispatch])

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root><Login /></Root>} ></Route>
          <Route path='/login' element={<Root><Login /></Root>}></Route>
          <Route path='/signup' element={<Root><Register /></Root>}></Route>
          <Route path='/home' element={<Root><Home /></Root>}></Route>
          <Route path='/admin-control' element={<Root><AdminControlPanel /></Root>}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
