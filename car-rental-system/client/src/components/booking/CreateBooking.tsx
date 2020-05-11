import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCarBooking } from "../../actions/authActions";
import classnames from "classnames";
import BookingNavbar from "./BookingNavbar";
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = 'ws://localhost:3030'
const ws = new WebSocket(URL);
ws.onopen = () => {
      console.log('connected');
    }
function CreateBooking(props:any) {
    const history = useHistory();
    
    let messages:any[];
  
  console.log(props);
  const userid = props.user.user.userid;
  const [carname, setCarname] = useState('');
  const [duration, setDuration] = useState('');
  const type = "user";

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
  const addMessage = (message:any) =>{ 
    console.log(message)
    messages.push(message)
    console.log(messages) 
  }

  const submitMessage = (messageString:any) => {
    console.log(messageString);
    const message = { name: userid, message: messageString }
    ws.send(JSON.stringify(message))
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newBooking = {
      userid: userid,
      carname: carname,
      duration: duration
    };

    props.createCarBooking(newBooking, history);
    submitMessage("User Id: "+userid+" Booked Car: "+carname+" For Duration:"+duration+"hrs")
  };

  const renderMessages=()=>{
    return messages.map((message, index) =>
      <div className="col s12 green-text" style={{ paddingLeft: "11.250px" }}>
          <h4>{message.message}</h4>
        </div>
    )
   }

      return (
      <div>
          <BookingNavbar/>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
          {props.messages}
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>Book New Car</h4>
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group input-field col s12">
		<label htmlFor="userid">User Id</label>
                <input
                  value={userid}
                  id="userid"
                  type="text"
		  readOnly
		className="form-control"
                />
                
                <span className="red-text"></span>
              </div>
              <div className="form-group input-field col s12">
		<label htmlFor="carname">Car Name</label>
                <input
                  onChange={(e)=>setCarname(e.target.value)}
                  value={carname}
                  id="carname"
                  type="text"
		className="form-control"
                    />
                
                <span className="red-text"></span>
              </div>
              <div className="form-group input-field col s12">
		<label htmlFor="duration">Duration</label>
                <input
                  onChange={(e)=>setDuration(e.target.value)}
                  value={duration}
                  id="duration"
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
  createCarBooking
 };
 export default connect(mapStateToProps, mapActionsToProps)(CreateBooking)