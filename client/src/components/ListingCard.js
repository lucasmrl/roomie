import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingCard(props) {
  let mainPictureListing = '';
  // eslint-disable-next-line
  let utilities = '';
  if (props.pictures.length > 0) {
    mainPictureListing = (
      <Link to={`/listing/${props._id}`} className="font-bold text-xl">
        <img
          src={`https://roomie-profile-pictures.s3.amazonaws.com/${props.pictures[0]}`}
          alt="Listing"
          className=" h-40 w-full object-cover object-center"
        />
      </Link>
    );
  } else {
    mainPictureListing = (
      <Link to={`/listing/${props._id}`} className="font-bold text-xl">
        <img
          src={`https://roomie-profile-pictures.s3.amazonaws.com/listingpIC-5ec361096052f8153502ae57-1590301532179.jpeg`}
          alt="Listing"
          className=" h-40 w-full object-cover object-center"
        />
      </Link>
    );
  }

  if (props.utilitiesIncl) {
    utilities = 'Utilities Included!';
  } else {
    utilities = 'No Utilities';
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
              !props.utilitiesIncl ? 'hidden' : 'block'
            } bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700`}
          >
            Utilities Included!
          </p>
        </div>
      </div>
    </div>
  );
}
