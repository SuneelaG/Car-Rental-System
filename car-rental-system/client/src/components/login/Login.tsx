import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Navbar} from "../layout/Navbar";
import {useHistory} from 'react-router-dom';
import {loginUser} from "../../actions/authActions"
import { connect } from "react-redux";

function Login(props:any) {
   const history = useHistory();

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const type = "user";
  console.log(props)
  
  if (props.user!=undefined && props.user.isAuthenticated) {
    history.push("/booking");
  }

  const handleSubmit = (e:any) => {
	e.preventDefault();
    const userData = {
      type:"user",
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
            <Link to="/" className="btn-flat waves-effect">
              Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b>
              </h4>
              
            </div>
            <form noValidate onSubmit={handleSubmit} className="">
              <div className=" form-group input-field col s12">
		<label htmlFor="email">Email</label>
                <input
                  onChange={(e)=>setUsername(e.target.value)}
                  value={email}
                 // error={errors.email}
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
                 // error={errors.password}
                  id="password"
                  type="password"
                 className="form-control"
                />
                <span className="red-text"></span>
                
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
		<p className="grey-text text-darken-1">
                Don't have an account? <Link to="/registration">Register</Link>
              </p>
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
error:state.error
});
//this map actions to our props in this functional component
const mapActionsToProps = {
 loginUser
};
export default connect(mapStateToProps, mapActionsToProps)(Login)