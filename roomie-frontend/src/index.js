import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import "./tailwind.generated.css";

ReactDOM.render(
  <div className="antialiased mx-auto max-w-md sm:max-w-xl lg:mx-0 lg:flex">
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </div>,
  document.getElementById("root")
);
