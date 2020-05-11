"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var authActions_1 = require("../../actions/authActions");
var Navbar_1 = require("../layout/Navbar");
var react_2 = require("react");
var react_redux_1 = require("react-redux");
function AdminLogin(props) {
    var history = react_router_dom_1.useHistory();
    var _a = react_2.useState(''), email = _a[0], setUsername = _a[1];
    var _b = react_2.useState(''), password = _b[0], setPassword = _b[1];
    var type = "admin";
    if (props.user != undefined && props.user.isAuthenticated) {
        history.push("/reservation");
    }
    var handleSubmit = function (e) {
        e.preventDefault();
        var userData = {
            type: "admin",
            email: email,
            password: password
        };
        props.loginUser(userData);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Navbar_1.Navbar, null),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { style: { marginTop: "4rem" }, className: "row" },
                react_1.default.createElement("div", { className: "col-sm-8 m-auto" },
                    react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                        react_1.default.createElement("h4", null,
                            react_1.default.createElement("b", null, "Admin Login"))),
                    react_1.default.createElement("form", { noValidate: true, onSubmit: handleSubmit },
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
                            react_1.default.createElement("input", { onChange: function (e) { return setUsername(e.target.value); }, value: email, id: "email", type: "email", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
                            react_1.default.createElement("input", { onChange: function (e) { return setPassword(e.target.value); }, value: password, id: "password", type: "password", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                            react_1.default.createElement("button", { style: {
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }, type: "submit", className: "btn btn-large btn-primary" }, "Login"))))))));
}
var mapStateToProps = function (state) { return ({
    user: state.user,
}); };
var mapActionsToProps = {
    loginUser: authActions_1.loginUser
};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(AdminLogin);
