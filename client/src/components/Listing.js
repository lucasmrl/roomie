import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function ListingInfo(props) {
  const userLoggedID = localStorage.getItem('userID');

  let ownerData = props.owner || '';
  let updateAndDelete;
  if (ownerData[0].id === userLoggedID) {
    updateAndDelete = (
      <div className="flex">
        <Link
          to={`/listings/${props._id}`}
          className="font-xl text-blue-400 font-bold"
        >
          Update
        </Link>
        <Link
          to={`/delete/${props._id}`}
          className="ml-6 font-xl text-red-400 font-bold"
        >
          Delete
        </Link>
      </div>
    );
  } else {
    updateAndDelete = '';
  }

  let pictures = '';
  if (props.pictures.length > 0) {
    pictures = props.pictures.map((el, index) => (
      <img
        className="w-32 sm:w-48 sm:w-64 lg:w-64 lg:h-64 shadow-sm lg:px-1 lg:object-center lg:object-cover"
        key={index}
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${props.pictures[index]}`}
        alt="Listing"
      />
    ));
  }

  // let createdDate = new Date(props.createdDate);
  // createdDate = createdDate.toDateString();

  const myDate = new Date(props.createdDate);
  const date = myDate.getDate();
  const month = myDate.getMonth();
  const year = myDate.getFullYear();

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  var ddmmyyyy = pad(date) + '-' + pad(month + 1) + '-' + year;

  return (
    <div className="flex flex-col lg:w-full">
      <div className="flex py-2 h-40 sm:justify-around lg:px-6 lg:w-full lg:flex-grow lg:justify-start overflow-hidden">
        {pictures}
      </div>
      <div className="p-6 lg:flex lg:flex-col">
        {updateAndDelete}
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <p className="font-bold text-gray-900 mt-4 text-xl">
              Listing Information:
            </p>
            <hr className="border-orange-300" />
            <p className="font-medium text-gray-900 mt-3">Address:</p>
            <p>
              {props.address}, {props.city}, {props.zip} - {props.state},
              {props.country}
            </p>

            <div className="flex">
              <div>
                <p className="font-medium text-gray-900 mt-3">Room Type:</p>
                <p>
                  {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
                </p>
              </div>
              <div className="ml-8">
                <p className="font-medium text-gray-900 mt-3">Building Type:</p>
                <p>
                  {props.buildingType.charAt(0).toUpperCase() +
                    props.buildingType.slice(1)}
                </p>
              </div>
            </div>

            <p className="font-medium text-gray-900 mt-3">Rent:</p>
            <p>${props.rent}/month</p>

            <div className="flex">
              <div>
                <p className="mt-3">
                  {props.utilitiesIncl ? (
                    <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      Utilities Included
                    </span>
                  ) : (
                    <span className="bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      Utilities not included
                    </span>
                  )}
                </p>
              </div>
              <div className="ml-4">
                <p className="mt-3 bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {props.petAllowed ? 'Pet Allowed' : ' Pet Not Allowed'}
                </p>
              </div>
            </div>

            <p className="font-medium text-gray-900 mt-3">Description:</p>
            <p className="mt-2 bg-white p-4 shadow-xl">{props.description}</p>
          </div>
          <div className="lg:w-1/2">
            <p className="font-bold text-gray-900 mt-4 text-xl">Contact:</p>
            <hr className="border-orange-300" />

            <div className="flex">
              <div>
                <p className="font-medium text-gray-900 mt-3">Phone:</p>
                <p>{props.contactPhone}</p>
              </div>
              <div className="ml-8">
                <p className="font-medium text-gray-900 mt-3">E-mail:</p>
                <p>{props.contactEmail}</p>
              </div>
            </div>

            <p className="mt-3">
              {typeof ownerData === 'object' ? (
                <Link
                  to={`/users/${ownerData[0].id}`}
                  className="text-blue-500"
                >
                  Posted by {ownerData[0].name}
                </Link>
              ) : (
                `Owner: ""`
              )}
            </p>
            <p className="font-medium text-gray-900 mt-3">
              Listing Created on:
            </p>
            <p>{ddmmyyyy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Listing({ match }) {
  const [data, setData] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/listings/${match.params.id}`,
        });

        setData(response.data.data.listings);
      } catch (error) {
        return setAlert(
          <SweetAlert
            danger
            title="Woot!"
            customButtons={
              <React.Fragment>
                <input
                  onClick={() => setAlert(null)}
                  value="Ok"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Problems to retrieve the information. Please, try again later.
          </SweetAlert>
        );
      }
    };
    fetchListings();
    // eslint-disable-next-line
  }, []);

  const headerCity = data === '' ? '' : `${data.city}, ${data.state}`;
  const headerTitle = data === '' ? '' : data.title;
  const result = data === '' ? '' : <ListingInfo {...data} />;
  return (
    <div>
      {alert}
      <div className="px-6 py-3 bg-themeGreen">
        <p className="font-light text-gray-900">{headerCity}</p>
        <h1 className="font-bold text-2xl text-gray-900">{headerTitle}</h1>
      </div>
      <div className="bg-gray-100">{result}</div>
    </div>
  );
}

export default Listing;
