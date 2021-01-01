import React from "react";
import Todo from "./Todo";

const Todos = ({ todos }) => {
  return (
    <>
      <h2>Your todos</h2>
      {todos.map((todo, i) => (
        <Todo {...todo} key={i} />
      ))}
    </>
  );
};

export default Todos;
