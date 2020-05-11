"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var authActions_1 = require("../../actions/authActions");
var BookingNavbar_1 = __importDefault(require("./BookingNavbar"));
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.min.css");
var URL = 'ws://localhost:3030';
var ws = new WebSocket(URL);
ws.onopen = function () {
    console.log('connected');
};
function CreateBooking(props) {
    var history = react_router_dom_1.useHistory();
    var messages;
    console.log(props);
    var userid = props.user.user.userid;
    var _a = react_2.useState(''), carname = _a[0], setCarname = _a[1];
    var _b = react_2.useState(''), duration = _b[0], setDuration = _b[1];
    var type = "user";
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
    var addMessage = function (message) {
        console.log(message);
        messages.push(message);
        console.log(messages);
    };
    var submitMessage = function (messageString) {
        console.log(messageString);
        var message = { name: userid, message: messageString };
        ws.send(JSON.stringify(message));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var newBooking = {
            userid: userid,
            carname: carname,
            duration: duration
        };
        props.createCarBooking(newBooking, history);
        submitMessage("User Id: " + userid + " Booked Car: " + carname + " For Duration:" + duration + "hrs");
    };
    var renderMessages = function () {
        return messages.map(function (message, index) {
            return react_1.default.createElement("div", { className: "col s12 green-text", style: { paddingLeft: "11.250px" } },
                react_1.default.createElement("h4", null, message.message));
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(BookingNavbar_1.default, null),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-sm-8 m-auto" },
                    props.messages,
                    react_1.default.createElement("div", { className: "col s12", style: { paddingLeft: "11.250px" } },
                        react_1.default.createElement("h4", null, "Book New Car")),
                    react_1.default.createElement("form", { noValidate: true, onSubmit: handleSubmit },
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "userid" }, "User Id"),
                            react_1.default.createElement("input", { value: userid, id: "userid", type: "text", readOnly: true, className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "carname" }, "Car Name"),
                            react_1.default.createElement("input", { onChange: function (e) { return setCarname(e.target.value); }, value: carname, id: "carname", type: "text", className: "form-control" }),
                            react_1.default.createElement("span", { className: "red-text" })),
                        react_1.default.createElement("div", { className: "form-group input-field col s12" },
                            react_1.default.createElement("label", { htmlFor: "duration" }, "Duration"),
                            react_1.default.createElement("input", { onChange: function (e) { return setDuration(e.target.value); }, value: duration, id: "duration", type: "text", className: "form-control" }),
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
    createCarBooking: authActions_1.createCarBooking
};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(CreateBooking);
