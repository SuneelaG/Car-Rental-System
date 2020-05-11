import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Navlink} from "./Navlink";
import {useHistory} from 'react-router-dom';

type Props = {
  
}

export const Navbar: React.FC<Props> = props => {
  const history = useHistory();
  function handleLogin(){
    history.push('/login')
  }

  function handleRegister(){
      history.push('/registration')
  }

  function handleAdmin(){
      history.push('/adminlogin')
  }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Car Rental</Link>
          <ul className="navbar-nav">
            <li className={"nav-item"}>
                  <a className="nav-link" onClick={handleLogin}>Login</a>
            </li> 
            <li className={"nav-item"}>
                  <a className="nav-link" onClick={handleRegister}>Register</a>
            </li> 
            <li className={"nav-item"}>
                  <a className="nav-link" onClick={handleAdmin}>Admin Login</a>
            </li> 
          </ul>
        </nav>
      </div>
      
     
    );
  
}

