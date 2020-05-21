import React from "react";
import { useForm } from "react-hook-form";
import firstImage from "./../assets/images/main-image.png";

function Home(props) {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => props.history.push("/listings");

  return (
    <div>
      <div className="bg-themeGreen">
        <img className="p-8 w-full" src={firstImage} alt="Rooms" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-8 mt-4 text-2xl">
          <h2 className="font-light text-gray-700">Looking For a Room?</h2>
          <h1 className="text-gray-700">
            Find Your New Place with <span className="font-bold">roomie!</span>
          </h1>
        </div>
        <div className="flex items-center flex-col mt-4">
          <input
            className="shadow appearance-none border rounded-lg p-4 w-2/3 py-3 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
            type="text"
            placeholder="Enter City or State"
            name="query"
            ref={register}
          />
          <input
            className="block bg-yellow my-2 p-4 py-2 h-auto mx-4 rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  );
}

export default Home;
