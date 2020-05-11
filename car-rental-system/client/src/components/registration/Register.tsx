import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import {Navbar} from "../layout/Navbar";
import classnames from "classnames";
import {useHistory} from 'react-router-dom';
import {registerUser} from "../../actions/authActions"
import { connect } from "react-redux";

function Register(props:any) {
  const history = useHistory();
 

  const type = "user";
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


   const handleSubmit = (e:any) => {
	e.preventDefault();
    const newUser = {
      userid: new Date().getTime(),
      type:"user",
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      password2: password2
    };
    console.log(newUser);
    console.log(history)
    props.registerUser(newUser,props.history);
  };

     return (
      <>
        <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <Link to="/" className="btn-flat waves-effect">
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group  input-field col s12">
		 <label htmlFor="firstname">First Name</label>
                <input
                  onChange={(e)=>setFirstName(e.target.value)}
                  value={firstname}
                  id="firstname"
                  type="text"
		 className="form-control"
                />
                <span className="red-text"></span>
              </div>
              <div className="form-group  input-field col s12">
		 <label htmlFor="lastname">Last Name</label>
                <input
                  onChange={(e)=>setLastName(e.target.value)}
                  value={lastname}
                  id="lastname"
                  type="text"
		 className="form-control"
                />
               
                <span className="red-text"></span>
              </div>
              <div className="form-group input-field col s12">
		<label htmlFor="email">Email</label>
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
		 className="form-control"
                />
                
                <span className="red-text"></span>
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
                
                <span className="red-text"></span>
              </div>
              <div className="form-group input-field col s12">
		<label htmlFor="password2">Confirm Password</label>
                <input
                  onChange={(e)=>setPassword2(e.target.value)}
                  value={password2}
                  id="password2"
                  type="password"
		 className="form-control"
                />
                
                <span className="red-text"></span>
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
                  Sign up
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
//this map actions to our props in this functional component
const mapActionsToProps = {
 registerUser
};
export default connect(mapStateToProps, mapActionsToProps)(Register)