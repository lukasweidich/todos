import React from "react";
import { useSelector } from "react-redux";
import { withAuthentication } from "../auth/requirePageAuth";

export const getServerSideProps = withAuthentication(async ({ token }) => {
  return {
    props: {},
  };
});

const me = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      {user && <h1>Hello {user?.firstName}, let's get things done!</h1>}
    </div>
  );
};

export default me;
