import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyMap from "./Map.js";

function ListingCard(props) {
  let mainPictureListing = "";
  let utilities = "";
  if (props.pictures.length > 0) {
    mainPictureListing = (
      <img
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${props.pictures[0]}`}
        alt="Listing"
        className=" h-40 w-full object-cover object-center"
      />
    );
  } else {
    mainPictureListing = (
      <img
        src={`https://roomie-profile-pictures.s3.amazonaws.com/listingpIC-5ec361096052f8153502ae57-1590301532179.jpeg`}
        alt="Listing"
        className=" h-40 w-full object-cover object-center"
      />
    );
  }

  if (props.utilitiesIncl) {
    utilities = "Utilities Included!";
  } else {
    utilities = "No Utilities";
  }

  return (
    <div className="antialiased shadow-xl bg-white text-gray-900 rounded-lg overflow-hidden my-6 sm:w-64 lg:m-1 lg:self-start">
      {/* Image */}
      {mainPictureListing}
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
        <div className="py-3 flex">
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

function Listings(props) {
  const [data, setData] = useState([]);
  console.log(props);

  let queryCityURL = "";
  let selectedCity = "Everywhere! 🌎";
  if (props.location.search === "" && props.location.state.response === "") {
    queryCityURL = "/api/listings";
  } else {
    queryCityURL = `/api/listings/?city=${
      props.location.state.response.split(",")[0]
    }`;
    selectedCity = props.location.state.response;
  }

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: queryCityURL,
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

  let results;
  if (data.length > 0) {
    results = data.map((el, index) => <ListingCard key={el._id} {...el} />);
  } else {
    results = <p>No Listings Available for this location!</p>;
  }

  return (
    <div className="bg-red-300 flex flex-col lg:max-h-screen">
      {/* Nav - Filters */}
      <div className="px-6 py-3 bg-themeGreen">
        <p className="font-light text-gray-900">Searching rooms in:</p>
        <h1 className="font-bold text-2xl text-gray-900">{selectedCity}</h1>
      </div>
      {/* Listings */}
      <div className="bg-gray-100 lg:flex lg:overflow-hidden">
        <div className="p-6 lg:p-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-around lg:justify-start lg:w-2/3 lg:overflow-y-scroll">
          {results}
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
