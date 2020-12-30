import { LOG_IN, LOG_OUT } from "./types";
import axios from "axios";
import { saveCookie, deleteCookie } from "../utils/cookieFunctions";

export const logIn = ({ email, password }) => async (dispatch) => {
  const {
    data: { token, user },
  } = await axios.post("/api/auth/login", {
    email,
    password,
  });

  dispatch({
    type: LOG_IN,
    payload: { token, user },
  });
  saveCookie({ key: "token", value: token });
  saveCookie({ key: "user", value: user });
};

export const logOut = () => (dispatch) => {
  deleteCookie({ key: "token" });
  deleteCookie({ key: "user" });
  dispatch({
    type: LOG_OUT,
  });
};
