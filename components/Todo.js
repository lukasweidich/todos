import React from "react";
import { Badge } from "react-bootstrap";

const Todo = (todo) => {
  const getDateDifferenceInDays = (dt1, dt2) => {
    return Math.abs(
      Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      )
    );
  };

  const { title, body, done, createdAt, updatedAt } = todo;
  const todaysDate = new Date();
  const createdAtDate = new Date(createdAt);
  const isTodoNewlyCreated =
    getDateDifferenceInDays(todaysDate, createdAtDate) < 1;
  return (
    <div>
      <h5>
        {title} {isTodoNewlyCreated && <Badge variant="info">NEW</Badge>}{" "}
        {done && <Badge variant="success">DONE</Badge>}
      </h5>
      <p>{body}</p>
    </div>
  );
};

export default Todo;
