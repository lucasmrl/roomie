import React from "react";
import { useForm } from "react-hook-form";
import firstImage from "./../assets/images/main-image.png";

function Home(props) {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => props.history.push("/listings");

  return (
    <div className="flex lg:w-screen lg:h-auto">
      {/* Left */}
      <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
        <div className="bg-themeGreen lg:hidden">
          <img className="p-8 w-full" src={firstImage} alt="Rooms" />
        </div>
        <div className="px-8 mt-4 text-2xl lg:text-4xl xl:text-5xl">
          <h2 className="font-light text-gray-700">Looking For a Room?</h2>
          <h1 className="text-gray-700">
            Find Your New Place with <span className="font-bold">roomie!</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-col mt-4 sm:flex-row sm:justify-center lg:py-6 lg:justify-start lg:px-8">
            <input
              className="shadow appearance-none border rounded-lg p-2 w-2/3 py-3 px-1 mx-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center lg:w-64 lg:text-left lg:px-4 xl:w-1/2"
              type="text"
              placeholder="Enter City or State"
              name="query"
              ref={register}
            />
            <input
              className="block bg-yellow my-2 px-3 py-2 h-auto mx-4 rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
              type="submit"
              value="Search"
            />
          </div>
        </form>
      </div>
      {/* Right */}
      <div className="hidden lg:inline lg:w-1/2 lg:bg-themeGreen lg:h-full">
        <img className="p-8" src={firstImage} alt="Rooms" />
      </div>
    </div>
  );
}

export default Home;
