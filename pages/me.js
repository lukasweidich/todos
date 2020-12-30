import React from "react";
import { useSelector } from "react-redux";

const me = () => {
  const { token, user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>Hello {user?.firstName}</h1>
    </div>
  );
};

export default me;
