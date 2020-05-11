import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Navbar} from "./Navbar";

class Landing extends Component {
  render() {
    return (
      <>
        <Navbar />
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Welcome to Car Rental App
            </h4>
            <br />
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Landing;
