import { LOG_IN, LOG_OUT } from "../actions/types";

const initialState = {
  token: null,
  user: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        ...payload,
      };
    case LOG_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default authReducer;
