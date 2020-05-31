import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import ListingCard from './ListingCard';
import MyMap from './Map.js';

function Listings(props) {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState('');

  let queryCityURL = '';
  let selectedCity = 'Everywhere! 🌎';
  if (
    props.location.state === undefined ||
    props.location.state.response === ''
  ) {
    queryCityURL = '/api/listings';
  } else {
    queryCityURL = `/api/listings/?city=${
      props.location.state.response.split(',')[0]
    }`;
    selectedCity = props.location.state.response;
  }

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: queryCityURL,
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
                  onClick={() => window.location.reload(false)}
                  value="Try Again"
                  type="submit"
                  className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                />
              </React.Fragment>
            }
          >
            Problems to retrieve the listings. Please, try again later.
          </SweetAlert>
        );
      }
    };
    fetchListings();
  }, [queryCityURL]);

  let results;
  if (data.length > 0) {
    results = data.map((el, index) => <ListingCard key={el._id} {...el} />);
  } else {
    results = (
      <div className="flex items-center flex-col justify-center w-full h-full flex-grow bg-gray-100 text-gray-800">
        <h2 className="font-bold text-6xl">Sorry,</h2>
        <h3 className="font-base"> No listings available yet.</h3>
      </div>
    );
  }

  return (
    <div className="bg-red-300 flex flex-col lg:max-h-screen">
      {alert}
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
