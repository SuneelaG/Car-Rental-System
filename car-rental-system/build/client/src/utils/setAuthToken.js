"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var setAuthToken = function (token) {
    if (token) {
        axios_1.default.defaults.headers.common["Authorization"] = token;
    }
    else {
        delete axios_1.default.defaults.headers.common["Authorization"];
    }
};
exports.default = setAuthToken;
