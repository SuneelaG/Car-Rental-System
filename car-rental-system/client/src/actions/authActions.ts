import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData: any,history: any) => (dispatch: any) => {
  console.log(userData);
  console.log(history);
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = (userData: any,history: any) => (dispatch:any) => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      const options = {
        httpOnly: true,
        signed: true,
      };
      const cookies = new Cookies();
      cookies.set('e-rental', res.data.token, { path: '/' });
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>{
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

export const createCarBooking = (bookingData: any,history: any) => (dispatch: any) => {
console.log(bookingData);
  axios
    .post("/api/users/booking", bookingData)
    .then(res => history.push("/booking"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createReservation = (reservationData: any,history: any) => (dispatch: any) => {
  axios
    .post("/api/users/reservation", reservationData)
    .then(res => history.push("/reservation"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteBooking = (bookingData: any,history: any) => (dispatch: any) => {
  console.log(bookingData);
  axios
    .delete("/api/users/booking",{data:bookingData})
    .then(res => {
      console.log(res);
      history.push("/booking")})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const listBookings = () => (dispatch: any) => {
  axios
    .get("/api/users/bookings")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded: any) => {
  console.log(decoded)
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = (userData: any) => (dispatch: any) => {
  console.log(userData);
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  const cookies = new Cookies();
  cookies.set('e-rental', "", { path: '/' });
  axios
    .post("/api/users/logout", userData)
    .then(res => {
      //history.push("/")
    })
    .catch(err =>{
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }

    );
};
