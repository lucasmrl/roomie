import React from "react";
import { useForm } from "react-hook-form";
import city from "./../assets/images/cityscapes.png";

function Home(props) {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => props.history.push("/listings");

  return (
    <div className="flex flex-grow flex-col lg:flex-row-reverse">
      {/*Image*/}
      <div className="sm:py-4 lg:self-center">
        <img
          className="p-4 w-full sm:w-3/4 mx-auto lg:w-auto"
          src={city}
          alt="Rooms"
        />
      </div>
      {/*Text-Right*/}
      <div className="flex-grow sm:py-8 lg:self-center">
        <div className="px-8 mt-4">
          <h1 className="text-gray-700 text-3xl lg:text-5xl">
            Find Your New Place with <span className="font-bold">roomie!</span>
          </h1>
          <p className="font-light text-gray-700 text-xl md:text-2xl">
            Easy as making friends, with roomie you can look for many
            <br className="hidden md:inline lg:hidden" /> rooms available across
            the country.
          </p>
          <div className="flex items-center my-auto py-8 md:w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-3/5 md:flex lg:w-4/5"
            >
              <input
                className="shadow p-1 appearance-none text-xl border lg:text-2xl rounded-lg text-gray-700 focus:outline-none focus:shadow-outline text-center md:w-full md:flex-grow"
                type="text"
                placeholder="Enter City or State"
                name="query"
                ref={register}
              />
              <input
                className="md:inline bg-themeYellow mx-1 px-3 py-1 lg:ml-6 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                type="submit"
                value="Search"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
