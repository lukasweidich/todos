import React from "react";

const Todo = ({ title, body, done }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default Todo;
