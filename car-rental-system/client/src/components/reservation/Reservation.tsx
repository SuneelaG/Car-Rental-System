import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createReservation } from "../../actions/authActions";
import ReservationNavbar from "./ReservationNavbar";
import {useHistory} from 'react-router-dom';
import { useState, useEffect } from "react";

const URL = 'ws://localhost:3030'
const ws = new WebSocket(URL);
 ws.onopen = () => {
      console.log('connected');
    }
function Reservation(props:any) {

  const history = useHistory();

  let messages:any[];
  
  console.log(props);
  const [userid, setUserId] = useState('');
  const [price, setPrice] = useState('');
  const type = "admin";

    if (!props.user.isAuthenticated) {
      history.push("/");
    }

    ws.onmessage = evt => {
	    console.log(evt)
      messages =[];
      const message = JSON.parse(evt.data)
      addMessage(message)
    }

    ws.onclose = () => {
      console.log('disconnected')
      ws: new WebSocket(URL)
    }
  const addMessage = (message:any) =>{ messages.push(message) }

  const submitMessage = (messageString:any) => {
    console.log(messageString);
    const message = { userid: userid, message: messageString }
    ws.send(JSON.stringify(message))
  }

  const handleonSubmit = (e:any) => {
    e.preventDefault();
    const newReservation = {
      userid: userid,
      price: price
    };

    props.createReservation(newReservation, history);
    submitMessage("Booking Done for Price="+price)
  };
 const renderMessages=()=>{
  return messages.map((message, index) =>
    <div className="col s12 green-text" style={{ paddingLeft: "11.250px" }}>
        <h4>{message.message}</h4>
      </div>
  )
 }
    return (<div>
        <ReservationNavbar/>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
           
          
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>Reserve Car</h4>
            </div>
            <form noValidate onSubmit={handleonSubmit}>
              <div className="form-group input-field col s12">
		<label htmlFor="userid">User Id</label>
                <input
                  onChange={(e)=>setUserId(e.target.value)}
                  value={userid}
                  id="userid"
                  type="text"
		className="form-control"
                    />
                
                <span className="red-text"></span>
              </div>
              <div className="form-group input-field col s12">
		<label htmlFor="price">Price</label>
                <input
                  onChange={(e)=>setPrice(e.target.value)}
                  value={price}
                  id="price"
                  type="text"
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }

const mapStateToProps = (state: any) => ({
  user: state.user,
  errors: state.errors

 });
 //this map actions to our props in this functional component
 const mapActionsToProps = {
  createReservation
 };
 export default connect(mapStateToProps, mapActionsToProps)(Reservation)