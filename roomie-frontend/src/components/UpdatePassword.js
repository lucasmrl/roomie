import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function UpdatePassword(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "/api/users/updatePassword",
        data,
      });

      if (response.status === 200) {
        alert("It Worked!");
      }
    } catch (error) {
      if (error.response.status === 400) {
        return alert("Sorry, your current password don't match! ❌");
      } else {
        return alert("Sorry, We could update your password! ❌");
      }
    }
  };

  return (
    <div>
      <h2>Change Password:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Current Password:</label>
        <input
          type="password"
          placeholder=""
          name="currentPassword"
          ref={register({ required: true, minLength: 8 })}
        />
        {errors.currentPassword && (
          <span>Please provide a password with at least 8 characters.</span>
        )}

        <label>New Password:</label>
        <input
          type="password"
          placeholder=""
          name="password"
          ref={register({ required: true, minLength: 8 })}
        />
        {errors.password && (
          <span>Please provide a password with at least 8 characters.</span>
        )}

        <label>Confirm New Password:</label>
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

export default UpdatePassword;
