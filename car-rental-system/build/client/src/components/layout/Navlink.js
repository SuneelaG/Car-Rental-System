"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
exports.Navlink = function (props) {
    return (react_1.default.createElement("li", { className: "nav-item " + (props.isActive ? "active" : "") },
        react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: props.path }, props.text)));
};
