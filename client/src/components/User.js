import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import ListingCard from './ListingCard';

function UserProfile(props) {
  let imageProfile;
  if (
    props.profilePicture === 'undefined' ||
    typeof props.profilePicture === 'undefined'
  ) {
    imageProfile = '';
  } else {
    imageProfile = (
      <img
        className="rounded-full h-40 w-40 shadow-sm"
        src={`https://roomie-profile-pictures.s3.amazonaws.com/${props.profilePicture}`}
        alt="User Profile"
      />
    );
  }

  return (
    <div>
      <div className="text-gray-800 text-center">
        <div className="flex items-center justify-center">{imageProfile}</div>
        <div className="leading-snug">
          <p className="font-bold mb-2">{props.name}</p>
          <p className="font-medium">{props.email}</p>
          <p>{props.age === null ? '' : `Age: ${props.age}`}</p>
          <p>{props.college === '' ? '' : `College: ${props.college}`}</p>
          <p>{props.about === '' ? '' : `About Me: ${props.about}`}</p>
        </div>
      </div>
    </div>
  );
}

function User({ match }) {
  const [data, setData] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/users/${match.params.id}`,
        });
        setData(response.data.data.user);
      } catch (error) {
        if (error.response.status === 401) {
          return setAlert(
            <SweetAlert
              danger
              title="Woot!"
              customButtons={
                <React.Fragment>
                  <input
                    onClick={() => setAlert(<Redirect to={`/login`} />)}
                    value="Ok"
                    type="submit"
                    className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                  />
                </React.Fragment>
              }
            >
              Please, sign in.
            </SweetAlert>
          );
        } else {
          return setAlert(
            <SweetAlert
              danger
              title="Woot!"
              customButtons={
                <React.Fragment>
                  <input
                    onClick={() => setAlert(<Redirect to={`/listings`} />)}
                    value="Ok"
                    type="submit"
                    className="block md:inline bg-themeGreen mx-1 px-3 py-1 lg:text-2xl rounded-lg text-xl text-gray-800 focus:outline-none focus:shadow-outline shadow"
                  />
                </React.Fragment>
              }
            >
              Problems to retrieve this user's information.
            </SweetAlert>
          );
        }
      }
    };
    fetchUserProfile();
  }, [match.params.id]);

  const userName = data.name ? `${data.name}'s Listings` : '';
  const resultInfo = data === '' ? '' : <UserProfile {...data} />;
  const resultListings =
    data === ''
      ? ''
      : data.myListings.map((el) => <ListingCard key={el._id} {...el} />);

  return (
    <div className="flex flex-col items-center bg-gray-100 sm:flex-row sm:items-start">
      {alert}
      <div className="sm:p-6 md:w-1/4">
        <h3 className="font-bold text-2xl text-gray-800 justify-center text-center">
          Profile:
        </h3>
        <div className="flex items-center my-4">{resultInfo}</div>
      </div>
      <div className="sm:p-6 md:w-3/4">
        <h3 className="font-bold text-2xl text-gray-800">{userName}</h3>
        <div className="w-64 md:flex md:w-auto md:flex-wrap">
          {resultListings}
        </div>
      </div>
    </div>
  );
}

export default User;
