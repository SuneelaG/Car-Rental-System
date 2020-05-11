"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Login_1 = __importDefault(require("./components/login/Login"));
var CreateBooking_1 = __importDefault(require("./components/booking/CreateBooking"));
var Landing_1 = __importDefault(require("./components/layout/Landing"));
var react_redux_1 = require("react-redux");
var store_1 = __importDefault(require("./redux/store"));
var Register_1 = __importDefault(require("./components/registration/Register"));
var AdminLogin_1 = __importDefault(require("./components/adminlogin/AdminLogin"));
require("bootstrap/dist/css/bootstrap.min.css");
var PrivateRoute_1 = __importDefault(require("./components/private-route/PrivateRoute"));
var Reservation_1 = __importDefault(require("./components/reservation/Reservation"));
var setAuthToken_1 = __importDefault(require("./utils/setAuthToken"));
var universal_cookie_1 = __importDefault(require("universal-cookie"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var authActions_1 = require("./actions/authActions");
var session = require('express-session');
var cookies = new universal_cookie_1.default();
cookies.get('e-rental');
if (cookies.get('e-rental')) {
    if ("null" != cookies.get('e-rental')) {
        console.log(cookies.get('e-rental'));
        var token = cookies.get('e-rental').replace('Bearer ', '');
        setAuthToken_1.default(token);
        var decoded = jwt_decode_1.default(token);
        store_1.default.dispatch(authActions_1.setCurrentUser(decoded));
        var currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
            var userData = {};
            store_1.default.dispatch(authActions_1.logoutUser(userData));
            window.location.href = "./login";
        }
    }
    else {
        cookies.remove('e-rental');
        window.location.href = "./login";
    }
}
var App = function () {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/', exact: true, component: Landing_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/login', eaxct: true, component: Login_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/registration', eaxct: true, component: Register_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/adminlogin', eaxct: true, component: AdminLogin_1.default }),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(PrivateRoute_1.default, { exact: true, path: "/booking", component: CreateBooking_1.default }),
                react_1.default.createElement(PrivateRoute_1.default, { exact: true, path: "/reservation", component: Reservation_1.default })))));
};
exports.default = App;
