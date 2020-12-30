import React, { useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TitleAndDesc from "../components/TitleAndDesc";
import Todo from "../components/Todo";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const index = () => {
  const { token } = useSelector((state) => state.auth);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("/api/todos", {
        headers: { authorization: `Bearer ${token}` },
      });
      const { todos } = data;
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  return (
    <>
      <TitleAndDesc title="Todos by lukasweidich" desc="" />
      <CreateTodo />
      {todos.map((todo, i) => (
        <Todo {...todo} key={i} />
      ))}
    </>
  );
};

export default index;
