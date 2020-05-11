"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../actions/types");
var isEmpty = require("is-empty");
var initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: {},
    loading: false
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.SET_CURRENT_USER:
            return __assign(__assign({}, state), { isAuthenticated: !isEmpty(action.payload), isAdmin: action.payload.type === "admin" ? true : false, user: action.payload });
        case types_1.USER_LOADING:
            return __assign(__assign({}, state), { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
