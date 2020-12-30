import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "./types";
import axios from "axios";

export const createTodo = ({ title, body, done, token }) => async (
  dispatch
) => {
  await axios.post(
    "/api/todos",
    {
      todo: { title, body, done },
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  dispatch({
    type: CREATE_TODO,
  });
};
