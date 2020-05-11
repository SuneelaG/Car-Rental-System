"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
function BookingNavbar(props) {
    var onLogoutClick1 = function (e) {
        e.preventDefault();
        console.log("loged out");
        props.logoutUser(props.user.user);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            react_1.default.createElement(react_router_dom_1.Link, { className: "navbar-brand", to: "#" }, "Car Rental"),
            react_1.default.createElement("ul", { className: "navbar-nav" },
                react_1.default.createElement("li", { className: "nav-item " },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link active", to: "/booking" }, "Rent Car"))),
            react_1.default.createElement("ul", { className: "navbar-nav ml-auto" },
                react_1.default.createElement("li", { className: "nav-item " },
                    react_1.default.createElement("a", { href: "#" },
                        props.user.user.firstname,
                        " ",
                        props.user.user.lastname,
                        "(",
                        props.user.user.userid,
                        ")")),
                react_1.default.createElement("li", { className: "nav-item " },
                    react_1.default.createElement("a", { href: "#", onClick: onLogoutClick1, className: "nav-link" }, "Logout"))))));
}
var mapStateToProps = function (state) { return ({
    user: state.user,
    auth: state.auth
}); };
//this map actions to our props in this functional component
var mapActionsToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(BookingNavbar);
