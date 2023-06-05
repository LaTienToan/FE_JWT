// import Nav from "./component/Navigation/Nav.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.scss'
import NavHeader from './component/Navigation/Nav';
import { useEffect, useState, useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { Audio } from 'react-loader-spinner'
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="#0d6efd"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
            <div className='mt-3'>Loading data...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader></NavHeader>
            </div>
            <div className="App">
              <AppRoutes></AppRoutes>
            </div >
          </>}

      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>

  );
}

export default App;
