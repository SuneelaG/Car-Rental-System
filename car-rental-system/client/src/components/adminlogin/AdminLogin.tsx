import React, { Component } from "react";
import {useHistory} from 'react-router-dom';
import {loginUser} from "../../actions/authActions"
import {Navbar} from "../layout/Navbar";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

type Props= {
  email:string,
  password:string,
  errors:{},
  userData:{}
}

function AdminLogin(props:any) {
  const history = useHistory();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const type="admin";

if (props.user!=undefined && props.user.isAuthenticated) {
  history.push("/reservation");
}

const handleSubmit = (e:any) => {
    e.preventDefault();
    const userData = {
      type:"admin",
      email: email,
      password: password
    };
    props.loginUser(userData);
  };

    return (
      <>
        <Navbar />
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col-sm-8 m-auto">
           
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Admin Login</b>
              </h4>
              
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group input-field col s12">
		 <label htmlFor="email">Email</label>
                <input
                 onChange={(e)=>setUsername(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
		className="form-control"
                />
               
                <span className="red-text">
                </span>
              </div>
              <div className="form-group input-field col s12">
		<label htmlFor="password">Password</label>
                <input
                   onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  id="password"
                  type="password"
		className="form-control"
                />
                
                <span className="red-text">
                  
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large btn-primary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }

  const mapStateToProps = (state: any) => ({
    user: state.user,
   });
   const mapActionsToProps = {
    loginUser
   };
   export default connect(mapStateToProps, mapActionsToProps)(AdminLogin)