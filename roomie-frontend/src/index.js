import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import "./tailwind.generated.css";

ReactDOM.render(
  <div className="h-auto">
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </div>,
  document.getElementById("root")
);
