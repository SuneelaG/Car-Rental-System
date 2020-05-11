"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var setAuthToken_1 = __importDefault(require("../utils/setAuthToken"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var universal_cookie_1 = __importDefault(require("universal-cookie"));
var types_1 = require("./types");
// Register User
exports.registerUser = function (userData, history) { return function (dispatch) {
    console.log(userData);
    console.log(history);
    axios_1.default
        .post("/api/users/register", userData)
        .then(function (res) { return history.push("/login"); })
        .catch(function (err) {
        return dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
// Login - get user token
exports.loginUser = function (userData, history) { return function (dispatch) {
    axios_1.default
        .post("/api/users/login", userData)
        .then(function (res) {
        var token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthToken_1.default(token);
        var decoded = jwt_decode_1.default(token);
        var options = {
            httpOnly: true,
            signed: true,
        };
        var cookies = new universal_cookie_1.default();
        cookies.set('e-rental', res.data.token, { path: '/' });
        dispatch(exports.setCurrentUser(decoded));
    })
        .catch(function (err) {
        console.log(err);
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
exports.createCarBooking = function (bookingData, history) { return function (dispatch) {
    console.log(bookingData);
    axios_1.default
        .post("/api/users/booking", bookingData)
        .then(function (res) { return history.push("/booking"); })
        .catch(function (err) {
        return dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
exports.createReservation = function (reservationData, history) { return function (dispatch) {
    axios_1.default
        .post("/api/users/reservation", reservationData)
        .then(function (res) { return history.push("/reservation"); })
        .catch(function (err) {
        return dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
exports.deleteBooking = function (bookingData, history) { return function (dispatch) {
    console.log(bookingData);
    axios_1.default
        .delete("/api/users/booking", { data: bookingData })
        .then(function (res) {
        console.log(res);
        history.push("/booking");
    })
        .catch(function (err) {
        return dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
exports.listBookings = function () { return function (dispatch) {
    axios_1.default
        .get("/api/users/bookings")
        .then(function (res) {
        console.log(res.data);
        return res.data;
    })
        .catch(function (err) {
        return dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
// Set logged in user
exports.setCurrentUser = function (decoded) {
    console.log(decoded);
    return {
        type: types_1.SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
exports.setUserLoading = function () {
    return {
        type: types_1.USER_LOADING
    };
};
// Log user out
exports.logoutUser = function (userData) { return function (dispatch) {
    console.log(userData);
    localStorage.removeItem("jwtToken");
    setAuthToken_1.default(false);
    dispatch(exports.setCurrentUser({}));
    var cookies = new universal_cookie_1.default();
    cookies.set('e-rental', "", { path: '/' });
    axios_1.default
        .post("/api/users/logout", userData)
        .then(function (res) {
        //history.push("/")
    })
        .catch(function (err) {
        console.log(err);
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    });
}; };
