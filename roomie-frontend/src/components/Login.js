import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../context/AuthContext";
import axios from "axios";

function Login(props) {
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setIsAuth } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/api/users/login",
        data,
      });

      if (response.status === 200) {
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
        props.history.push("/");
      }
    } catch (error) {
      return setMessage("Incorrect Username and Password! ❌");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email:"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password:"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <input type="submit" value="Submit" />
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
