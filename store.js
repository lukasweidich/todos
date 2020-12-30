import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const { composeWithDevTools } = require("redux-devtools-extension");
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducers";
import { getCookie } from "./utils/cookieFunctions";

const reducer = combineReducers({
  auth: authReducer,
});

const tokenFromCookies = getCookie({ key: "token" });

const userFromCookies = getCookie({ key: "user" });

const initialState = {
  auth: { token: tokenFromCookies, user: userFromCookies },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
