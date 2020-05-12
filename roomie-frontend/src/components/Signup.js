import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup(props) {
  const { setIsAuth } = useContext(AuthContext);

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/users/signup",
        data,
      });

      if (response.status === 201) {
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userID", response.data.data.user._id);
        setIsAuth(true);
        props.history.push("/");
      }
    } catch (error) {
      return alert("Sorry, We could not sign you up! ❌");
    }
  };

  return (
    <div>
      <h2>Sign Up:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="First and Last Name"
          name="name"
          ref={register({ required: true })}
        />
        {errors.name && <span>Please provide a Title.</span>}

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Please provide a valid email.</span>}

        <label>Password:</label>
        <input
          type="password"
          placeholder=""
          name="password"
          ref={register({ required: true, minLength: 8 })}
        />
        {errors.password && (
          <span>Please provide a password with at least 8 characters.</span>
        )}

        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder=""
          name="passwordConfirm"
          ref={register({
            required: true,
            validate: (value) => value === watch("password"),
          })}
        />
        {errors.passwordConfirm && (
          <span>Please provide the same password above</span>
        )}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup;
