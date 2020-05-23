import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyMap from "./Map.js";

function ListingCard(props) {
  let mainPic = "";
  let utilities = "";
  if (props.pictures.length > 0) {
    mainPic = props.pictures[0];
  }

  if (props.utilitiesIncl) {
    utilities = "Utilities Included!";
  } else {
    utilities = "No Utilities";
  }

  return (
    <div className="antialiased shadow-xl bg-white text-gray-900 rounded-lg overflow-hidden my-6 sm:w-64 lg:m-1">
      {/* Image */}
      <img
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${mainPic}`}
        alt="Listing"
        className=" h-40 w-full object-cover object-center"
      />
      {/* Info */}
      <div className="p-4 truncate">
        <div className="uppercase text-sm font-medium text-gray-700">
          <p>{`${props.type}`}</p>
        </div>
        <Link to={`/listing/${props._id}`} className="font-bold text-xl">
          {props.title}
        </Link>
        {/* Details */}
        <div className="uppercase text-sm tracking-wide">
          <p>{`${props.city} • ${props.state} • ${props.zip}`}</p>
        </div>
        <div className="leading-snug">
          <p className="text-xl">
            {`$${props.rent}`}
            <span className="text-gray-600 text-sm"> / month</span>
          </p>
        </div>
        <div class="py-3 flex">
          <p
            className={`${
              !props.utilitiesIncl ? "hidden" : "block"
            } bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700`}
          >
            Utilities Included!
          </p>
        </div>
      </div>
    </div>
  );
}

function Listings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/api/listings",
        });

        setData(response.data.data.listings);
      } catch (error) {
        return alert(
          "Something went wrong while trying to fetch the Listings...🧐"
        );
      }
    };
    fetchListings();
  }, []);

  const allLists = data.map((el, index) => (
    <ListingCard key={el._id} {...el} />
  ));

  return (
    <div className="bg-red-300 flex flex-col lg:max-h-screen">
      {/* Nav - Filters */}
      <div className="px-6 py-3 bg-themeGreen">
        <p className="font-light text-gray-900">Looking rooms in:</p>
        <h1 className="font-bold text-2xl text-gray-900">Salt Lake City, UT</h1>
      </div>
      {/* Listings */}
      <div className="bg-gray-100 lg:flex lg:overflow-hidden">
        <div className="p-6 lg:p-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-around lg:justify-start lg:w-2/3 lg:overflow-y-scroll">
          {allLists}
        </div>
        {/* Map */}
        <div className="hidden lg:inline-block lg:w-1/3 lg:bg-red-300 lg:sticky">
          <MyMap listingsInfo={data} />
        </div>
      </div>
    </div>
  );
}

export default Listings;
