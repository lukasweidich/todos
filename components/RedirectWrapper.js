import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const RedirectWrapper = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!(token && user)) {
      router.push(`login?redirect=${router.asPath}`);
    }
  }, []);
  return <>{children}</>;
};

export default RedirectWrapper;
