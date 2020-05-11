"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("../layout/Navbar");
var react_router_dom_2 = require("react-router-dom");
var authActions_1 = require("../../actions/authActions");
var react_redux_1 = require("react-redux");
function Login(props) {
    var history = react_router_dom_2.useHistory();
    var _a = react_1.useState(''), email = _a[0], setUsername = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var type = "user";
    console.log(props);
    if (props.user != undefined && props.user.isAuthenticated) {
        history.push("/booking");
    }
    var handleSubmit = function (e) {
        e.preventDefault();
        var userData = {
            type: "user",
            email: email,
            password: password
        };
        props.loginUser(userData);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1.Navbar, null),
        React.createElement("div", { className: "container" },
            React.createElement("div", { style: { marginTop: "4rem" }, className: "row" },
                React.createElement("div", { className: "col-sm-8 m-auto" },
                    React.createElement(react_router_dom_1.Link, { to: "/", className: "btn-flat waves-effect" }, "Back to home"),
                    React.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                        React.createElement("h4", null,
                            React.createElement("b", null, "Login"))),
                    React.createElement("form", { noValidate: true, onSubmit: handleSubmit, className: "" },
                        React.createElement("div", { className: " form-group input-field col s12" },
                            React.createElement("label", { htmlFor: "email" }, "Email"),
                            React.createElement("input", { onChange: function (e) { return setUsername(e.target.value); }, value: email, 
                                // error={errors.email}
                                id: "email", type: "email", className: "form-control" }),
                            React.createElement("span", { className: "red-text" })),
                        React.createElement("div", { className: "form-group input-field col s12" },
                            React.createElement("label", { htmlFor: "password" }, "Password"),
                            React.createElement("input", { onChange: function (e) { return setPassword(e.target.value); }, value: password, 
                                // error={errors.password}
                                id: "password", type: "password", className: "form-control" }),
                            React.createElement("span", { className: "red-text" })),
                        React.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                            React.createElement("p", { className: "grey-text text-darken-1" },
                                "Don't have an account? ",
                                React.createElement(react_router_dom_1.Link, { to: "/registration" }, "Register")),
                            React.createElement("button", { style: {
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }, type: "submit", className: "btn btn-large btn-primary" }, "Login"))))))));
}
var mapStateToProps = function (state) { return ({
    user: state.user,
    error: state.error
}); };
//this map actions to our props in this functional component
var mapActionsToProps = {
    loginUser: authActions_1.loginUser
};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(Login);
