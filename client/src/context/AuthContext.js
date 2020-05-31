import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || "");

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {/* This refers to the children that this provider/components wraps. */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
