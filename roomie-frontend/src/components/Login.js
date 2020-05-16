import React, { useState, useContext } from "react";
import { AuthContext } from "./../context/AuthContext";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }; //Default origin is from the route that sent to the login page OR from "/" root

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
        localStorage.setItem("userID", response.data.data.user._id);
        console.log(response.data.data.user._id);
        setIsAuth(true);
        history.replace(from);
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
