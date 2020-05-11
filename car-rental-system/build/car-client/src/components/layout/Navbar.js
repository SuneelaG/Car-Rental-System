"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
exports.Navbar = function (props) {
    var history = react_router_dom_2.useHistory();
    function handleLogin() {
        history.push('/login');
    }
    function handleRegister() {
        history.push('/registration');
    }
    function handleAdmin() {
        history.push('/adminlogin');
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            react_1.default.createElement(react_router_dom_1.Link, { className: "navbar-brand", to: "/" }, "Car Rental"),
            react_1.default.createElement("ul", { className: "navbar-nav" },
                react_1.default.createElement("li", { className: "nav-item" },
                    react_1.default.createElement("a", { className: "nav-link", onClick: handleLogin }, "Login")),
                react_1.default.createElement("li", { className: "nav-item" },
                    react_1.default.createElement("a", { className: "nav-link", onClick: handleRegister }, "Register")),
                react_1.default.createElement("li", { className: "nav-item" },
                    react_1.default.createElement("a", { className: "nav-link", onClick: handleAdmin }, "Admin Login"))))));
};
