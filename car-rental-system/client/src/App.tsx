
import React from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import CreateBooking from "./components/booking/CreateBooking";
import Landing from "./components/layout/Landing";
import { Provider } from "react-redux";
import store from "./redux/store";
import Register from './components/registration/Register';
import AdminLogin from './components/adminlogin/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Reservation from './components/reservation/Reservation';
import setAuthToken from "./utils/setAuthToken";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

const session = require('express-session');

const cookies = new Cookies();
cookies.get('e-rental');
if(cookies.get('e-rental')){
  if("null" != cookies.get('e-rental')){
    console.log(cookies.get('e-rental'))
    const token = cookies.get('e-rental').replace('Bearer ', '');
    setAuthToken(token);
    let decoded:any = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      const userData ={}
      store.dispatch(logoutUser(userData));
      window.location.href = "./login";
    }
  }else{
    cookies.remove('e-rental')
    window.location.href = "./login";
  }
}

const App: React.FC = () => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Route path = '/' exact component={Landing}/>
            <Route path = '/login' eaxct component={Login}/>
            <Route path = '/registration' eaxct component={Register}/>
            <Route path = '/adminlogin' eaxct component={AdminLogin}/>
	        <Switch>
                <PrivateRoute exact path="/booking" component={CreateBooking} />
                <PrivateRoute exact path="/reservation" component={Reservation} />
            </Switch>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
