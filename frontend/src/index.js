import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';

//Page Imports
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />}/>

      <Route path='/Login' element={<Login />}/>
      <Route path='/SignUp' element={<SignUp />}/>
      <Route path='/Home' element={<Home />}/>
    </>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router = {router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
