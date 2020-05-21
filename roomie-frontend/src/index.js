import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import "./tailwind.generated.css";

ReactDOM.render(
  <div>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </div>,
  document.getElementById("root")
);
