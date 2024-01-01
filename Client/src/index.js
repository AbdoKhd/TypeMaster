import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import SignUp from './pages/Sign-up';
import Home from './pages/Home';
import Practice from './pages/Practice';
import About from './pages/About';
import User from './pages/User';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Multiplayer from './pages/Multiplayer';
import JoinGame from './pages/JoinGame';


const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/SignUp",
    element: <SignUp/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Practice",
    element: <Practice/>,
  },
  {
    path: "/About",
    element: <About/>,
  },
  {
    path: "/User",
    element: <User/>,
  },
  {
    path: "/Multiplayer",
    element: <Multiplayer/>,
  },
  {
    path: "/JoinGame",
    element: <JoinGame/>,
  },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
