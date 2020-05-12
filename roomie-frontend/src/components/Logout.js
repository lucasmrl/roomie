import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./../context/AuthContext";
import axios from "axios";

function Logout(props) {
  const { setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    setInterval(async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api//users/logout",
        });
        //User will receive an invalid token as the response

        if (response.status === 200) {
          setIsAuth(false); // 1) When the user is redirected, the navbar will be updated
          localStorage.removeItem("isAuth"); // 2) Removing the information from localStorage
          props.history.push("/"); // 3) Redirecting to the main page with the correct navbar
        }
      } catch (error) {
        return alert("Something went wrong! ❌");
      }
    }, 2000);
  }, []);

  return <p>You will be disconnected in 3 seconds... 😢</p>;
}

export default Logout;
