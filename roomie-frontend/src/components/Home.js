import React from "react";
import { useForm } from "react-hook-form";

function Home(props) {
  const { handleSubmit } = useForm();
  const onSubmit = (data) => props.history.push("/listings");

  return (
    <div>
      <h1>Welcome To Roomie!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Find the best place to live in just a click.</h1>
        <input type="submit" value="See Available Listings" />
      </form>
    </div>
  );
}

export default Home;
