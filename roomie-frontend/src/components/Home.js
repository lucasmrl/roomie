import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { useForm } from "react-hook-form";

function Home(props) {
  const { register, handleSubmit } = useForm();
  const [redirect, setRedirect] = useState(false);
  const onSubmit = (data) => props.history.push("/listings");

  return (
    <div>
      <h1>Welcome To Roomie!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Find the best place to live in just a click.</h1>
        {/* <input
          type="text"
          placeholder="Type a State with 2 characters"
          name="state"
          ref={register}
        /> */}

        <input type="submit" value="See Available Listings" />
      </form>
    </div>
  );
}

export default Home;
