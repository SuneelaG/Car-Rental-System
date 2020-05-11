import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import userReducer from "../reducers/userReducer"
const initialState = {};
const middleware = [thunk];

declare global {
interface Window {
 __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
}
}

const reducer = combineReducers({
 user: userReducer
});

const store = createStore(reducer, 
 initialState,
 compose(
	applyMiddleware(...middleware)));

export default store;