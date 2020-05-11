"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("../layout/Navbar");
var react_router_dom_2 = require("react-router-dom");
var authActions_1 = require("../../actions/authActions");
var react_redux_1 = require("react-redux");
function Register(props) {
    var history = react_router_dom_2.useHistory();
    var type = "user";
    var _a = react_2.useState(''), firstname = _a[0], setFirstName = _a[1];
    var _b = react_2.useState(''), lastname = _b[0], setLastName = _b[1];
    var _c = react_2.useState(''), email = _c[0], setEmail = _c[1];
    var _d = react_2.useState(''), password = _d[0], setPassword = _d[1];
    var _e = react_2.useState(''), password2 = _e[0], setPassword2 = _e[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var newUser = {
            userid: new Date().getTime(),
            type: "user",
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            password2: password2
        };
        console.log(newUser);
        console.log(history);
        props.registerUser(newUser, props.history);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Navbar_1.Navbar, null),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-sm-8 m-auto" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "btn-flat waves-effect" }, "Back to home"),
                    react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                        react_1.default.createElement("h4", null,
                            react_1.default.createElement("b", null, "Register"),
                            " below"),
                        react_1.default.createElement("p", { className: "grey-text text-darken-1" },
                            "Already have an account? ",
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, "Log in"))),
                    react_1.default.createElement("form", { noValidate: true, onSubmit: handleSubmit },
                        react_1.default.createElement("div", { className: "form-group  input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "firstname" }, "First Name"),
                            react_1.default.createElement("input", { onChange: function (e) { return setFirstName(e.target.value); }, value: firstname, id: "firstname", type: "text", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group  input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "lastname" }, "Last Name"),
                            react_1.default.createElement("input", { onChange: function (e) { return setLastName(e.target.value); }, value: lastname, id: "lastname", type: "text", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
                            react_1.default.createElement("input", { onChange: function (e) { return setEmail(e.target.value); }, value: email, id: "email", type: "email", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
                            react_1.default.createElement("input", { onChange: function (e) { return setPassword(e.target.value); }, value: password, id: "password", type: "password", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "password2" }, "Confirm Password"),
                            react_1.default.createElement("input", { onChange: function (e) { return setPassword2(e.target.value); }, value: password2, id: "password2", type: "password", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                            react_1.default.createElement("button", { style: {
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }, type: "submit", className: "btn btn-large btn-primary" }, "Sign up"))))))));
}
var mapStateToProps = function (state) { return ({
    user: state.user,
}); };
//this map actions to our props in this functional component
var mapActionsToProps = {
    registerUser: authActions_1.registerUser
};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(Register);
