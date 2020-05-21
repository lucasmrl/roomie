import React from "react";
import { useForm } from "react-hook-form";
import firstImage from "./../assets/images/main-image.png";

function Home(props) {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => props.history.push("/listings");

  return (
    <div>
      <img src={firstImage} alt="Rooms" />
      <h1>Welcome To Roomie!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Looking For a Room?</h2>
        <h1>
          Find Your New Place with <span>roomie!</span>
        </h1>
        <div className="flex items-center flex-col">
          <input
            className="shadow appearance-none border rounded-lg p-4 w-1/2 py-3 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter City or State"
            name="query"
            ref={register}
          />
          <input
            className="block bg-yellow my-2 p-4 py-2 h-auto mx-4 rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  );
}

export default Home;
