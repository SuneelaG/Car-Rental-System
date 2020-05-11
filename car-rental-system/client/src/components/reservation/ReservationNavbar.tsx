import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function ReservationNavbar(props:any) {
    const onLogoutClick = (e:any) => {
      e.preventDefault();
      console.log("loged out")
      props.logoutUser(props.user.user);
    };

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="#">Car Rental</Link>
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link active" to="/reservation">Confirm Reservation</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <a>
              {props.user.user.name}
              </a>
            </li>
            <li className="nav-item ">
              <a href="#" onClick={onLogoutClick} className="nav-link">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

const mapStateToProps = (state: any) => ({
  user:state.user,
  auth:state.auth
 });
 //this map actions to our props in this functional component
 const mapActionsToProps = {
  logoutUser
 };
export default connect(mapStateToProps, mapActionsToProps)(ReservationNavbar)