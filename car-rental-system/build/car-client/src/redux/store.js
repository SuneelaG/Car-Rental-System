"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var userReducer_1 = __importDefault(require("../reducers/userReducer"));
var initialState = {};
var middleware = [redux_thunk_1.default];
var reducer = redux_1.combineReducers({
    user: userReducer_1.default
});
var store = redux_1.createStore(reducer, initialState, redux_1.compose(redux_1.applyMiddleware.apply(void 0, middleware)));
exports.default = store;
