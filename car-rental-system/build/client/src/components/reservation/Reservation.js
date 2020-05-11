"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var authActions_1 = require("../../actions/authActions");
var ReservationNavbar_1 = __importDefault(require("./ReservationNavbar"));
var react_router_dom_1 = require("react-router-dom");
var react_2 = require("react");
var URL = 'ws://localhost:3030';
var ws = new WebSocket(URL);
ws.onopen = function () {
    console.log('connected');
};
function Reservation(props) {
    var history = react_router_dom_1.useHistory();
    var messages;
    console.log(props);
    var _a = react_2.useState(''), userid = _a[0], setUserId = _a[1];
    var _b = react_2.useState(''), price = _b[0], setPrice = _b[1];
    var type = "admin";
    if (!props.user.isAuthenticated) {
        history.push("/");
    }
    ws.onmessage = function (evt) {
        console.log(evt);
        messages = [];
        var message = JSON.parse(evt.data);
        addMessage(message);
    };
    ws.onclose = function () {
        console.log('disconnected');
        ws: new WebSocket(URL);
    };
    var addMessage = function (message) { messages.push(message); };
    var submitMessage = function (messageString) {
        console.log(messageString);
        var message = { userid: userid, message: messageString };
        ws.send(JSON.stringify(message));
    };
    var handleonSubmit = function (e) {
        e.preventDefault();
        var newReservation = {
            userid: userid,
            price: price
        };
        props.createReservation(newReservation, history);
        submitMessage("Booking Done for Price=" + price);
    };
    var renderMessages = function () {
        return messages.map(function (message, index) {
            return react_1.default.createElement("div", { className: "col s12 green-text", style: { paddingLeft: "11.250px" } },
                react_1.default.createElement("h4", null, message.message));
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ReservationNavbar_1.default, null),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-sm-8 m-auto" },
                    react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                        react_1.default.createElement("h4", null, "Reserve Car")),
                    react_1.default.createElement("form", { noValidate: true, onSubmit: handleonSubmit },
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "userid" }, "User Id"),
                            react_1.default.createElement("input", { onChange: function (e) { return setUserId(e.target.value); }, value: userid, id: "userid", type: "text", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "price" }, "Price"),
                            react_1.default.createElement("input", { onChange: function (e) { return setPrice(e.target.value); }, value: price, id: "price", type: "text", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                            react_1.default.createElement("button", { style: {
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }, type: "submit", className: "btn btn-large btn-primary" }, "Submit"))))))));
}
var mapStateToProps = function (state) { return ({
    user: state.user,
    errors: state.errors
}); };
//this map actions to our props in this functional component
var mapActionsToProps = {
    createReservation: authActions_1.createReservation
};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(Reservation);
