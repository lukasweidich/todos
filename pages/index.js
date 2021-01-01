import React, { useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TitleAndDesc from "../components/TitleAndDesc";
import Todos from "../components/Todos";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { withAuthentication } from "../auth/requirePageAuth";

export const getServerSideProps = withAuthentication(async ({ token }) => {
  return {
    props: {
      tokenFromAuth: token,
    },
  };
});

const index = ({ tokenFromAuth }) => {
  const { token, user } = useSelector((state) => state.auth);

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
    <div>
      {user && (
        <>
          <TitleAndDesc title="Todos by lukasweidich" desc="" />
          <CreateTodo />
          <hr className="my-4" />
          <Todos todos={todos} />
        </>
      )}
    </div>
  );
};

export default index;
